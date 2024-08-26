import React, { useEffect, useState, useRef } from "react";
import ReactPageScroller from 'react-page-scroller';
import Aos from "aos";
import "aos/dist/aos.css";
import words from '../words';

import PostCard from "../components/PostCard";
import './HomePage.css';

import {gsap} from 'gsap/all'
import AnimationContext from '../contexts/AnimationContext';
import First from "../components/First";
import Second from "../components/Second";
import Third from "../components/Third";

export default function HomePage(){
    const [isLoading, setIsLoading] = useState(true);
    const [currentBg, setCurrentBg] = useState('#72bcc9')
    const audio = new Audio(process.env.PUBLIC_URL + '/audio/super-cute-cats.mp3');
    let appRef = useRef(null);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            console.log("Currently loading");
            setIsLoading(false);
        }, 3000);

        // window.scrollTo(0, 0);
        document.title = "Hanoi Spy"
        audio.play();

        gsap.to(appRef.current, {
            duration: 1,
            background: currentBg,
          })

    }, [currentBg]);


    return(
        <AnimationContext.Provider id="home" value={{ setCurrentBg }}>
            {isLoading ? (
                <div className="loading">
                    <img src={process.env.PUBLIC_URL + `/spinners/cat-walking.gif`}/>
                </div>
            ) : (
            <>
            <div ref={appRef} className="App y mandatory-scroll-snapping" dir="ltr">
                <First />
                <Second />
                <Third />
            </div>
            <audio loop autoplay="true"> 
                <source src={process.env.PUBLIC_URL + '/audio/super-cute-cats.mp3'} type="audio/mpeg"/>
            </audio>
            </>
            
        )}
        </AnimationContext.Provider>
    )
}