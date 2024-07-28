import React, { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import '@pixi/events';
import { TextStyle } from 'pixi.js';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import words from '../words';

export default function InGamePage() {
    const [showManual, setShowManual] = useState(false)
    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
    const [count,setCount] = useState(0)

    const {id} = useParams();

    //draggable
    const ref = useRef();
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true, // activate rubber band effect
        decayRate: 0.96, // specify the decay rate
        safeDisplacement: 11, // specify the drag sensitivity
    });

    //get canvas size
    const [canvasHeight, setHeight] = useState(null);
    const [canvasWidth, setWidth] = useState(null);
    const div = useCallback(node => {
        if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
        }
    }, []);

    return(
        <div className="MapContainer" {...events} ref={ref}>
            <div className='count'>{count}</div>
            <div className={`bg ${id}`}>
                <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundAlpha: 0, antialias: true }}>
                    <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={1470} y={400} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                    <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={840} y={930} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                    <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={1860} y={880} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                </Stage>
            </div>
        </div>
    )
}

