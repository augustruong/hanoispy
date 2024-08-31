import React, { useContext, useEffect, useRef } from 'react';
import PostCard from '../PostCard';
import words from '../../words';
import { gsap, ScrollTrigger } from "gsap/all";
import AnimationContext from '../../contexts/AnimationContext';

export default function Nhatuhoalo() {
  let thisRef = useRef(null);
  let animationContext = useContext(AnimationContext);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: thisRef.current,
        start: "+=200 70%",
        end: "+=200 60%",
        scrub: true,
        // markers: true,
        pinSpacing: false,
        onEnter: () => {
          console.log('entered');
          animationContext.setCurrentBg('#fae884');
        },
        onLeaveBack: () => {
          animationContext.setCurrentBg('#bb806d');
        }
      }
    })
  }, [])
  return (
    <div ref={thisRef} className='h-screen center' >
        <div className="ItemWrapper nhatuhoalo" >
            <PostCard mapId='nhatuhoalo' title={words.mapTitle.nhatuhoalo} imgUrl={`/thumbnail/nhatuhoalo.png`} infoBtnColor={"white"} infoContent={words.info.nhatuhoalo} />
        </div>
    </div>
  )
}