import React, { useEffect, useState, useRef } from "react";
import "aos/dist/aos.css";

import './HomePage.css';

import {gsap} from 'gsap/all'
import AnimationContext from '../contexts/AnimationContext';
import First from "../components/First";
import Second from "../components/Second";
import Third from "../components/Third";
import Nhatuhoalo from "../components/Nhatuhoalo";

export default function Playlist(){
    const [currentBg, setCurrentBg] = useState('#72bcc9')
    let appRef = useRef(null);

    useEffect(() => {
        gsap.to(appRef.current, {
            duration: 1,
            background: currentBg,
          })
    }, [currentBg]);

    return(
        <AnimationContext.Provider id="home" value={{ setCurrentBg }}>
            <div ref={appRef} className="App y mandatory-scroll-snapping" dir="ltr">
                <First />
                <Second />
                <Third />
                <Nhatuhoalo />
            </div>
        </AnimationContext.Provider>
    )
}