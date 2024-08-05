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
    const [canvasHeight, setHeight] = useState(1080);
    const [canvasWidth, setWidth] = useState(4020);
    const [row, setRow] = useState(1405);
    const [col, setCol] = useState(290);
    const div = useCallback(node => {
        if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
        }
    }, []);

    return(
        <div className="MapContainer" {...events} ref={ref}>
            {/* <img src={require()}/> */}
            <div className={`bg ${id}`}>
                <div className='count'>{count}</div>
                {id === "hoguom" &&
                    <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={row} y={col} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1); setRow(780); setCol(820) }}/>
                        {/* <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={780} y={820} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                        <Sprite image={process.env.PUBLIC_URL + `/bunny.png`} width={26} height={37} x={1800} y={780} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/> */}
                    </Stage>
                }
                {id === "hanoimoi" &&
                    <Stage width={2785} height={1433} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={bunnyUrl} width={26} height={37} x={1470} y={400} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                        <Sprite image={bunnyUrl} width={26} height={37} x={840} y={930} interactive={true} cursor={"pointer"} pointerdown={() => {setCount(count + 1) }}/>
                    </Stage>
                }
            </div>
        </div>
    )
}

