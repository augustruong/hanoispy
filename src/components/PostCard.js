import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import words from '../words';

import './PostCard.css'

export default function PostCard(props) {
    return(
        <div className='PostCardWrapper'>
            <div className='title'>{props.title}</div>
            <div className='thumbnail'>
                <img src={process.env.PUBLIC_URL + `${props.imgUrl}`}/>
            </div>
            <div className='ButtonWrapper'>
                <button>{words.button.challenge}</button>
                <NavLink to={`/${props.mapId}`}>
                    <button>{words.button.freeplay}</button>
                </NavLink>
            </div>
        </div>
    )
}