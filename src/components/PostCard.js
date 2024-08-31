import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import words from '../words';

import './PostCard.css'

export default function PostCard(props) {
    const clicked_audio = new Audio(process.env.PUBLIC_URL + '/audio/clicked.mp3');

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
                <NavLink to={`challenge/${props.mapId}`}>
                    <button className='challenge white' onClick={() => clicked_audio.play() }>{words.button.challenge}</button>
                </NavLink>
                <NavLink to={`freeplay/${props.mapId}`}>
                    <button className='freeplay yellow' onClick={() => clicked_audio.play() }>{words.button.freeplay}</button>
                </NavLink>
            </div>
        </div>
    )
}