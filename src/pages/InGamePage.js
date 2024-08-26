import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from "react-router-dom";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import '@pixi/events';
import { TextStyle } from 'pixi.js';
import { useDraggable } from "react-use-draggable-scroll";
import { MapObject } from '../utils/hoguom_coordinate'; 
import '../utils/cat_sprite.css';
import words from '../words';

export default function InGamePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [showManual, setShowManual] = useState(false)
    const [showEndGameModal, setShowEndGameModal] = useState(false)

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            console.log("Currently loading");
            setIsLoading(false);
        }, 3000);
    }, []);

    const [count,setCount] = useState(0)
    const {id} = useParams();
    const objectInMap = MapObject[id];

    //draggable
    const ref = useRef();
    const { events } = useDraggable(ref, {
        // applyRubberBandEffect: true, // activate rubber band effect
        decayRate: 0.96, // specify the decay rate
        safeDisplacement: 11, // specify the drag sensitivity
    });

    // update object
    const [objectWrapper, setObjectWrapper] = useState(objectInMap[0]);
    const [visited, setVisited] = useState([0])
    const updateObject = () => {
        if (visited.length === 30) {
            setShowEndGameModal(true);
            console.log('finish');
        } else {
            console.log("debugging", visited);
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
    }
    
    return(
        <div className="map-container" {...events} ref={ref}>
            {isLoading ? (
                <img src={process.env.PUBLIC_URL + `/spinners/cat-walking.gif`}/>
            ) : (
            <div className={`bg ${id}`} >
                <div className='count'>
                    {count}
                    <div id='goal'>
                        <div id='cat' class="cat0"></div>
                    </div>
                </div>
                <div className='close' onClick={() => setShowEndGameModal(true)}></div>
                {id === "hoguom" &&
                    <Stage width={2320} height={1080} options={{ backgroundAlpha: 0, antialias: true }}>                        
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "hanoimoi" &&
                    <Stage width={2680} height={1432} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "vuonhoalythaito" &&
                    <Stage width={1920} height={1240} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_trans.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
            </div>)}
            {showEndGameModal &&
                <div className='overlay'>
                    <div className='endgame modal'>
                        <div className='top-wrapper'>
                            <div className='score-report-wrapper'>
                                <div className='label'>Số điểm</div>
                                <div className='score'>{count}</div>
                            </div>
                            <div className='cta-wrapper'>
                                <button className='replay yellow' onClick={() => reset()}>Chơi lại</button>
                                <Link to={words.routes.home}>
                                    <button className='out white'>Đổi Map</button>
                                </Link>
                            </div>
                        </div>
                        <div className='bottom-wrapper'>
                            <div className='title'>Bia hơi Hà Nội</div>
                            <p>Hay còn được gọi là “Sinh tố lúa mạch”. Bia là món đồ uống tinh thần của hội thanh niên, trung niên Hà Nội, Việt Nam.</p>
                            <div className='gif-wrapper'>
                                <img src={process.env.PUBLIC_URL + `/facts/biahanoix2.gif`}/>
                            </div>

                            {/* TODO: Style the button to the center */}
                            <button onClick={() => {setShowEndGameModal(false)}}>Chơi Tiếp</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

