import React, { useEffect, useState, useRef } from "react";
import Playlist from "./Playlist";

export default function HomePage(){
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(true)
    const [showAboutModal, setShowAboutModal] = useState(false)

    const [bgm, setBgm] = useState( new Audio(process.env.PUBLIC_URL + '/audio/super-cute-cats.mp3') )

    const clicked_audio = new Audio(process.env.PUBLIC_URL + '/audio/clicked.mp3');
    const [sound,setSound] = useState(false)

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        document.title = "Meo in Hanoi"
          
        return () => {
            bgm.pause();
        };
    }, [])

    return(
        <div id="home">
        {isLoading ? (
            <div className="loading">
                <img src={process.env.PUBLIC_URL + `/spinners/cat-walking.gif`}/>
            </div>
        ) : (
        <>
            <button className={sound ? `sound on` : `sound off`} 
                    onClick={() => { 
                        if (!sound) {bgm.play()} else {bgm.pause()}
                        setSound(!sound); 
                    }}
                    title="Bật/Tắt BGM"
            >
            </button>
            <button className='about' title="Web gì đây??" onClick={() => setShowAboutModal(true)}></button>
            <Playlist/>
            {showConfirmModal &&
                <div className='overlay'>
                    <div className='confirm modal'>
                        <div className='text-wrapper'>Bạn có muốn để nhạc nền hem?</div>
                        <div className='gif-wrapper'>
                            <img src={process.env.PUBLIC_URL + `/gif/cat-listen-to-music.gif`}/>
                         </div>   
                        <div className='cta-wrapper'>
                            <button className='yellow' 
                                    onClick={() => { 
                                        clicked_audio.play();  
                                        setSound(true);
                                        bgm.play(); 
                                        setShowConfirmModal(false); 
                            }}>Cũng được</button>
                            <button className='white' 
                                    onClick={() => { 
                                        clicked_audio.play(); 
                                        setSound(false); 
                                        setShowConfirmModal(false) 
                            }}>Hem</button>
                        </div>
                    </div>
                </div>
            }
            {showAboutModal &&
                <div className='overlay'>
                    <div className='about modal'>
                        <div className='title-wrapper'>
                            <div className="logo"></div>
                            <div className="title">Meo in Hanoi</div>
                        </div>
                        <div className='gif-wrapper'>
                            <img src={process.env.PUBLIC_URL + `/gif/intro.png`}/>
                         </div>  
                        <p className='text-wrapper'>
                            Đây là một web game vô tri.<br/>
                            Chọn một map bất kì, tìm đủ <span className="color-green">30 chú mèo</span> theo chỉ thị là bạn thắng :3
                        </p>
                         
                        <div className='cta-wrapper'>
                            <button className='white' 
                                    onClick={() => { 
                                        clicked_audio.play(); 
                                        setShowAboutModal(false) 
                            }}>Đóng</button>
                        </div>
                    </div>
                </div>
            }
        </>
        )}
        </div>
    )
}