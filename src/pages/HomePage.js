import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import words from '../words';

import PostCard from "../components/PostCard";
import './HomePage.css';


export default function HomePage(){
    useEffect(() => {
        // window.scrollTo(0, 0);
        document.title = "Hanoi Spy"

        Aos.init({duration: 2000});
    }, []);
    return(
        <div id="home">
            <div className="GalleryWrapper">
                <div className="ItemWrapper" data-aos="slide-up">
                    <PostCard mapId='hoguom' title={words.mapTitle.hoguom} imgUrl={`/thumbnail/hoguom.png`} />
                </div>
                <div className="ItemWrapper" data-aos="slide-up" >
                    <PostCard mapId='hanoimoi' title={words.mapTitle.hanoimoi} imgUrl={`/thumbnail/hanoimoi.png`} />
                </div>
                <div className="ItemWrapper" data-aos="slide-up" >
                    <PostCard mapId='vuonhoalythaito' title={words.mapTitle.vuonhoalythaito} imgUrl={`/thumbnail/vuonhoalythaito.png`} />
                </div>
            </div>
        </div>
    )
}