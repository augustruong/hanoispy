import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import words from '../words';

import './PostCard.css'

export default function PostCard(props) {
    const [showInfo, setShowInfo] = useState(false)
    return(
        <div className='PostCardWrapper'>
            <div className='title'>{props.title}</div>
            <div className='thumbnail'>
                <button className={`info ${props.infoBtnColor}`}></button>

                <div className='info-wrapper overlay'>
                        <p>{props.infoContent}</p>
                </div>
                <div className='img' style={{ background: `url('/thumbnail/${props.mapId}.png')`, backgroundSize:'cover', backgroundPosition:'center' }}></div>
            </div>
            <div className='ButtonWrapper'>
                <button className='challenge white'>{words.button.challenge}</button>
                <NavLink to={`/${props.mapId}`}>
                    <button className='freeplay yellow'>{words.button.freeplay}</button>
                </NavLink>
            </div>
        </div>
    )
}