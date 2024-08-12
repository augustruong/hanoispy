import React, { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import '@pixi/events';
import { TextStyle } from 'pixi.js';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { objectInfo } from '../utils/hoguom_coordinate'; 
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
    const [objectWrapper, setObjectWrapper] = useState(objectInfo[0]);
    const [visited, setVisited] = useState([0])
    const div = useCallback(node => {
        if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
        }
    }, []);


    const updateObject = () => {
        if (visited.length === 6) {
            console.log('finish');
        } else {
            setCount(count + 1); 
            let random = (Math.random() * 5).toFixed();
            random = Number(random);
            
            while (visited.length > 0 && visited.includes(random)) {
                random = (Math.random() * 5).toFixed();
                random = Number(random);
            }
            
            visited.push(random);
            setVisited(visited);
            console.log('Debugging', visited);
            
            setObjectWrapper(objectInfo[random]);
        }   
    };

    return(
        <div className="MapContainer" {...events} ref={ref}>
            {/* <img src={require()}/> */}
            <div className={`bg ${id}`}>
                <div className='count'>{count}</div>
                <img src={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} style={{position: 'fixed', top: 0, left: 0 }}/>
                {id === "hoguom" &&
                    <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "hanoimoi" &&
                    <Stage width={2785} height={1433} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                        </Stage>
                }
            </div>
        </div>
    )
}

