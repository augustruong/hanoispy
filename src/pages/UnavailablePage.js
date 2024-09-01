import React, { useEffect } from 'react';

export default function UnavailablePage() {
    useEffect(() => {
        document.title = "Meo not found"
    }, [])
    return(
        <div id='unavailable'>
            <div className='title'>Ui ( ˶°ㅁ°) !!</div>
            <p>
                Tụi tớ chưa có bản mobile <br/>Các bạn lên PC chơi nha
            </p>
            <div className='gif-wrapper'>
                <img src={process.env.PUBLIC_URL + `/gif/cat-cry.gif`}/>
            </div>   
        </div>
    )
}