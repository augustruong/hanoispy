import React, { useEffect, useState, useRef } from "react";
import Playlist from "./Playlist";

export default function HomePage(){
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(true)
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
        <>
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
            <button className='about' title="Web gì đây??"></button>
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
        </>
        )}
        </>
    )
}