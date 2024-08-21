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
    const [currentBg, setCurrentBg] = useState('#72bcc9')
    let appRef = useRef(null);

    useEffect(() => {
        // window.scrollTo(0, 0);
        document.title = "Hanoi Spy"

        gsap.to(appRef.current, {
            duration: 1,
            background: currentBg,
          })

    }, [currentBg]);


    return(
        // <div id="home" className="home" style={{backgroundColor: `${bgColor}`}}>
        //     <ReactPageScroller renderAllPagesOnFirstRender={true}  >
        //         <section className="ItemWrapper hoguom" >
        //             <PostCard mapId='hoguom' title={words.mapTitle.hoguom} imgUrl={`/thumbnail/hoguom.png`} infoBtnColor={"white"} infoContent={words.info.hoguom} />
        //         </section>
        //         <section className="ItemWrapper hanoimoi" >
        //             <PostCard mapId='hanoimoi' title={words.mapTitle.hanoimoi} imgUrl={`/thumbnail/hanoimoi.png`} infoBtnColor={"black"} infoContent={words.info.hanoimoi}/>
        //         </section>
        //         <section className="ItemWrapper vuonhoalythaito" >
        //             <PostCard mapId='vuonhoalythaito' title={words.mapTitle.vuonhoalythaito} imgUrl={`/thumbnail/vuonhoalythaito.png`} infoBtnColor={"white"} infoContent={words.info.vuonhoalythaito} />
        //         </section>
        //     </ReactPageScroller>
        // </div>
        <AnimationContext.Provider id="home" value={{ setCurrentBg }}>
            <div ref={appRef} className="App y mandatory-scroll-snapping" dir="ltr">
                <First />
                <Second />
                <Third />
            </div>
        </AnimationContext.Provider>
    )
}