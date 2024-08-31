import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from "react-router-dom";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import '@pixi/events';
import { TextStyle } from 'pixi.js';
import { useDraggable } from "react-use-draggable-scroll";
import { MapObject } from '../utils/hoguom_coordinate'; 
import { RandomFacts } from '../utils/random_facts';
import '../utils/cat_sprite.css';
import words from '../words';

export default function InGamePage(props) {
    const [count,setCount] = useState(0)
    const {id} = useParams();
    const objectInMap = MapObject[id];

    const [isLoading, setIsLoading] = useState(true);

    //Modal
    const [showManualModal, setShowManualModal] = useState(false)
    const [showEndGameModal, setShowEndGameModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    //Audio
    const [bgmOn,setBgmOn] = useState(true)
    const [bgm, setBgm] = useState( new Audio(process.env.PUBLIC_URL + `/audio/${id}.wav`) )
    const cat_audio = new Audio(process.env.PUBLIC_URL + '/audio/cat-meow-sound.mp3');
    const clicked_audio = new Audio(process.env.PUBLIC_URL + '/audio/clicked.mp3');
    const congraz_audio = new Audio(process.env.PUBLIC_URL + '/audio/happy-happy-cat.mp3');
    const gameover_audio = new Audio(process.env.PUBLIC_URL + '/audio/banana-cat-crying.mp3');

    //Random facts
    const [factNum, setNum] = useState(0);
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
        * (max - min + 1)) + min;
    };
 
    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setIsLoading(false);
            bgm.play();
            setShowManualModal(true);
        }, 3000);

        return () => {
            bgm.pause();
        };
    }, []);

    //draggable
    const ref = useRef();
    const { events } = useDraggable(ref, {
        decayRate: 0.96, // specify the decay rate
        safeDisplacement: 11, // specify the drag sensitivity
    });

    // update object
    const [objectWrapper, setObjectWrapper] = useState(objectInMap[0]);
    const [visited, setVisited] = useState([0])
    const updateObject = () => {
        cat_audio.play();
        if (visited.length === 30) {
            setCount(30)
            setShowEndGameModal(true);
            congraz_audio.play()
            // console.log('finish');
        } else {
            // console.log("debugging", visited);
            setCount(count + 1); 
            let random = (Math.random() * 29).toFixed();
            random = Number(random);
            
            while (visited.includes(random)) {
                random = (Math.random() * 29).toFixed();
                random = Number(random);
            }
            
            visited.push(random);
            setVisited(visited);

            setObjectWrapper(objectInMap[random]);
            document.getElementById('cat').className = `cat${random}`
        }       
    };

    // restart game
    const reset = () => {
        setCount(0);
        let random = (Math.random() * 30).toFixed();
        random = Number(random);
        setObjectWrapper(objectInMap[random]);
        document.getElementById('cat').className = `cat${random}`;
        setVisited([random]);
        setShowEndGameModal(false)
        clearTimer(getDeadTime());
        setAlertTimer(false)
    }

    // The state for our timer
    const [timer, setTimer] = useState("03:00");
    const Ref = useRef(null);
    const [alertTimer,setAlertTimer] = useState(false);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        if (minutes === 0 && seconds === 10) setAlertTimer(true)
        if (minutes === 0 && seconds === 0) { setShowConfirmModal(false); setShowEndGameModal(true); gameover_audio.play()}
        return {
            total,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10, add '0' at the beginning of the variable
            setTimer(
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        // If you adjust it you should also need to adjust the Endtime formula we are about to code next
        setTimer("03:00");

        // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if you intend to add more time
        deadline.setSeconds(deadline.getSeconds() + 180);
        return deadline;
    };
    
    return(
        <div className="map-container" {...events} ref={ref}>
            {isLoading ? (
                <div className="loading">
                    <img src={process.env.PUBLIC_URL + `/spinners/cat-walking.gif`}/>
                </div>
            ) : (
            <div className={`bg ${id}`} >
                <audio loop> 
                    <source src={process.env.PUBLIC_URL + `/audio/${id}.wav`}/>
                </audio>
                <div className='count'>
                    {count}
                    <div id='goal' title="Tìm con mèo như này nhé">
                        <div id='cat' class="cat0"></div>
                    </div>
                </div>
                    
                {!showEndGameModal && 
                    <div>
                        {props.challenge && <div className={alertTimer ? 'timer alert' : 'timer'}>{timer}</div>}
                        <div className='close' title="Thoát game" onClick={() => { clicked_audio.play(); setShowConfirmModal(true)}}></div>
                    </div>
                }

                <button className={bgmOn ? `sound on` : `sound off`} 
                        onClick={() => { 
                            if (!bgmOn) {bgm.play()} else {bgm.pause()}
                            setBgmOn(!bgmOn); 
                        }}
                        title="Bật/Tắt BGM"
                >
                </button>

                {id === "hoguom" &&
                    <Stage width={2320} height={1080} options={{ backgroundAlpha: 0, antialias: true }}>                        
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"default"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "hanoimoi" &&
                    <Stage width={2680} height={1432} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"default"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "vuonhoalythaito" &&
                    <Stage width={1920} height={1240} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"default"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "nhatuhoalo" &&
                    <Stage width={2560} height={960} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"default"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
            </div>)}
            {showManualModal &&
                <div className='overlay'>
                    <div className='manual modal'>
                        <div className='text-wrapper'>
                            Giữ-thả chuột trái để di chuyển bản đồ.<br/>
                            Chuột trái để chọn mèo.
                            Bạn cầm tìm đủ <span className='color-green'>30 chú mèo</span> theo chỉ định.
                            {props.challenge && 
                            <div>Bạn có tổng thời gian là <span className='color-orange'>3 phút</span>.</div>
                            }
                        </div>
                        <div className='gif-wrapper'>
                            <img src={process.env.PUBLIC_URL + `/paw-drag.png`}/>
                         </div>   
                        <div className='cta-wrapper'>
                            <button className='yellow' onClick={() => { clicked_audio.play(); setShowManualModal(false); if (props.challenge) {clearTimer(getDeadTime());} }}>OK</button>
                        </div>
                    </div>
                </div>
            }
            {showConfirmModal &&
                <div className='overlay confirm'>
                    <div className='confirm modal'>
                        <div className='text-wrapper'>Ơ, bạn hong chơi nữa hở?</div>
                        <div className='gif-wrapper'>
                            <img src={process.env.PUBLIC_URL + `/gif/cat-cry.gif`}/>
                         </div>   
                        <div className='cta-wrapper'>
                            <button className='yellow' onClick={() => { clicked_audio.play(); setNum(randomNumberInRange(0, 9)); setShowEndGameModal(true); gameover_audio.play(); setShowConfirmModal(false) }}>Ò</button>
                            <button className='white' onClick={() => { clicked_audio.play(); setShowConfirmModal(false) }}>Chơi tiếp</button>
                        </div>
                    </div>
                </div>
            }
            {showEndGameModal &&
                <div className='overlay endgame'>
                    <div className='endgame modal'>
                        {count === 30 && <div className='intro'>Yê! Bạn đã tìm đủ 30 mèo ^ ^</div>}
                        {count < 30 && <div className='intro'>Huhu, bạn chưa tìm đủ 30 mèo rùi T T</div>}

                        <div className='top-wrapper'>
                            <div className='score-report-wrapper'>
                                <div className='label'>Số điểm</div>
                                <div className='score'>{count}</div>
                            </div>
                            <div className='cta-wrapper'>
                                <button className='replay yellow' onClick={() => {clicked_audio.play(); reset()}}>Chơi lại</button>
                                <Link to={words.routes.home}>
                                    <button className='out white' onClick={() => clicked_audio.play()}>Đổi Map</button>
                                </Link>
                            </div>
                        </div>
                        <div className='bottom-wrapper'>
                            <div className='title'>{RandomFacts[factNum].title}</div>
                            <p>{RandomFacts[factNum].content}</p>
                            <div className='gif-wrapper'>
                                <img src={process.env.PUBLIC_URL + `/facts/${RandomFacts[factNum].image}`}/>
                            </div>

                            {/* TODO: Style the button to the center */}
                            {/* <button onClick={() => {setShowEndGameModal(false)}}>Chơi Tiếp</button> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

