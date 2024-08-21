import React, { useEffect, useRef } from 'react';
import PostCard from '../PostCard';
import words from '../../words';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);



export default function First() {
  return (
    <div className='h-screen center'>
      <div className="ItemWrapper hoguom" >
        <PostCard mapId='hoguom' title={words.mapTitle.hoguom} imgUrl={`/thumbnail/hoguom.png`} infoBtnColor={"white"} infoContent={words.info.hoguom} />
      </div>
    </div>
  )
}