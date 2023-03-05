import React, {useState, useEffect} from "react";
import "../css/MessageStyles/MessageBasic.css"
import "../css/MessageStyles/MessagePicture.css"
import secretary from '../../img/secretary_red.png'
import secretary_woman from "../../img/secretary_woman_red.png"
import hackerman from "../../img/hacker_red.png"
import {BOT_TYPE_MOSES, BOT_TYPE_ISIS, BOT_TYPE_STUDIERENDEN_SEK} from "../ChatMessagesList";

import {setStyling} from "../ChatMessagesList";



export default function MessagePicture({message, same_author}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    function chooseImage(author){
        switch (author){
            case BOT_TYPE_MOSES:
                return <img src={secretary_woman}/>
            case BOT_TYPE_ISIS:
                return <img src={hackerman}/>
            case BOT_TYPE_STUDIERENDEN_SEK:
                return <img  src={secretary}/>
        }
    }

    return (
        <div className={"ChatMessage-container MessagePicture " + setStyling(author)}>
            <div className="img-bg">
                {chooseImage(author)}
            </div>

            <div className="message">
                {!same_author && <b>{author}:</b>}
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}