import React, { useEffect, useState } from "react";
import ReactPageScroller from 'react-page-scroller';
import Aos from "aos";
import "aos/dist/aos.css";
import words from '../words';

import PostCard from "../components/PostCard";
import './HomePage.css';


export default function HomePage(){
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Hanoi Spy"

        Aos.init({duration: 2000});
    }, []);
    return(
        <div id="home">
            <ReactPageScroller renderAllPagesOnFirstRender={true} >
                <section className="ItemWrapper hoguom">
                    <PostCard mapId='hoguom' title={words.mapTitle.hoguom} imgUrl={`/thumbnail/hoguom.png`} />
                </section>
                <section className="ItemWrapper hanoimoi" >
                    <PostCard mapId='hanoimoi' title={words.mapTitle.hanoimoi} imgUrl={`/thumbnail/hanoimoi.png`} />
                </section>
                <section className="ItemWrapper vuonhoalythaito" >
                    <PostCard mapId='vuonhoalythaito' title={words.mapTitle.vuonhoalythaito} imgUrl={`/thumbnail/vuonhoalythaito.png`} />
                </section>

            </ReactPageScroller>
        </div>
    )
}