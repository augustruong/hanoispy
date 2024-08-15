import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import '@pixi/events';
import { TextStyle } from 'pixi.js';
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
    const [canvasHeight, setHeight] = useState(window.innerHeight);
    const [canvasWidth, setWidth] = useState(window.innerWidth);

    // update object
    const [objectWrapper, setObjectWrapper] = useState(objectInfo.hoguom[0]);
    const [visited, setVisited] = useState([0])
    const updateObject = () => {
        if (visited.length === 30) {
            console.log('finish');
        } else {
            setCount(count + 1); 
            let random = (Math.random() * 29).toFixed();
            random = Number(random);
            
            while (visited.includes(random)) {
                random = (Math.random() * 29).toFixed();
                random = Number(random);
            }
            
            visited.push(random);
            setVisited(visited);
            console.log('Debugging', visited);
            
            setObjectWrapper(objectInfo.hoguom[random]);
            console.log(objectInfo.hoguom[random])
        }   
        
    };
    console.log(objectWrapper.objectCol)

    return(
        <div className="MapContainer" {...events} ref={ref}>
            <div className={`bg ${id}`} >
                <div className='count'>{count}</div>
                {id === "hoguom" &&
                    <Stage width={4020} height={1080} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/>
                    </Stage>
                }
                {id === "hanoimoi" &&
                    <Stage width={2680} height={1432} options={{ backgroundAlpha: 0, antialias: true }}>
                        {/* <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={objectWrapper.objectWidth} height={objectWrapper.objectHeight} x={objectWrapper.objectRow} y={objectWrapper.objectCol} interactive={true} cursor={"pointer"} pointerdown={() => {updateObject()}}/> */}
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={60} y={1054} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={56} height={40} x={222} y={1198} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={412} y={1240} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={556} y={980} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={758} y={1030} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={34} height={38} x={954} y={1034} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={1038} y={1146} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={56} height={40} x={1192} y={1176} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={1322} y={1104} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={1624} y={1132} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={1662} y={1046} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={56} height={40} x={1838} y={1036} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={2078} y={1034} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={2252} y={1044} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={2602} y={884} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={2360} y={598} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={2188} y={740} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={2188} y={684} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={2072} y={534} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={2048} y={624} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={1854} y={588} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={1858} y={726} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={56} height={40} x={1484} y={830} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={766} y={740} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={454} y={742} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={370} y={654} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={56} height={40} x={530} y={632} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={786} y={574} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={682} y={184} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={1944} y={178} />
                    </Stage>
                }
                {id === "vuonhoalythaito" &&
                    <Stage width={1800} height={2000} options={{ backgroundAlpha: 0, antialias: true }}>
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={328} y={368} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={616} y={346} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={608} y={446} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={1384} y={366} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={1192} y={608} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={1310} y={620} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={238} y={688} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={1104} y={708} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={614} y={764} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={642} y={822} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={190} y={1054} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={342} y={1070} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={406} y={1000} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={276} y={1298} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={518} y={1528} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={630} y={1436} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={602} y={1310} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={816} y={1482} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={904} y={1498} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={34} height={38} x={1128} y={1440} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={1098} y={1208} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={20} height={30} x={942} y={1076} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={1232} y={1014} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={1494} y={962} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={40} x={1276} y={1212} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={30} height={64} x={1532} y={1416} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={1142} y={1684} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={36} height={38} x={1438} y={1686} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={26} x={1244} y={1746} />
                        <Sprite image={process.env.PUBLIC_URL + `/wrapper/wrapper_red.png`} width={54} height={36} x={534} y={1826} />
                    </Stage>
                }
            </div>
        </div>
    )
}

