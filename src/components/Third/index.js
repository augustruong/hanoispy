import React, { useContext, useEffect, useRef } from 'react';
import PostCard from '../PostCard';
import words from '../../words';
import { gsap, ScrollTrigger } from "gsap/all";
import AnimationContext from '../../contexts/AnimationContext';

export default function Third() {

  let thirdRef = useRef(null);
  let animationContext = useContext(AnimationContext);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: thirdRef.current,
        start: "+=200 70%",
        end: "+=200 60%",
        scrub: true,
        // markers: true,
        pinSpacing: false,
        onEnter: () => {
          console.log('entered');
          animationContext.setCurrentBg('#bb806d');
        },
        onLeaveBack: () => {
          animationContext.setCurrentBg('#dad99d');
        }
      }
    })
  }, [])
  return (
    <div ref={thirdRef} className='h-screen center' >
        <div className="ItemWrapper vuonhoalythaito" >
            <PostCard mapId='vuonhoalythaito' title={words.mapTitle.vuonhoalythaito} imgUrl={`/thumbnail/vuonhoalythaito.png`} infoBtnColor={"white"} infoContent={words.info.vuonhoalythaito} />
        </div>
    </div>
  )
}