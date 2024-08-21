import React, { useContext, useEffect, useRef } from 'react';
import PostCard from '../PostCard';
import words from '../../words';
import { gsap, ScrollTrigger} from "gsap/all";
import AnimationContext from '../../contexts/AnimationContext';

export default function Second() {

  let secondRef = useRef(null);
  let textRef = useRef(null);

  let animationContext = useContext(AnimationContext);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: secondRef.current,
        start: "+=200 70%",
        end: "+=200 60%",
        scrub: true,
        // markers: true,
        pinSpacing: false,
        onEnter: () => {
          animationContext.setCurrentBg('#dad99d');
          gsap.to(textRef.current, {
            color: '#000',
            duration: 1
          })
        },
        onLeaveBack: () => {
          animationContext.setCurrentBg('#72bcc9');
          gsap.to(textRef.current, {
            color: '#000',
            duration: 1
          })
        }
      }
    })
  }, [])

  return (
    <div ref={secondRef} className='h-screen center' >
      <div className="ItemWrapper hanoimoi" >
        <PostCard mapId='hanoimoi' title={words.mapTitle.hanoimoi} imgUrl={`/thumbnail/hanoimoi.png`} infoBtnColor={"black"} infoContent={words.info.hanoimoi}/>
      </div>
    </div>
  )
}