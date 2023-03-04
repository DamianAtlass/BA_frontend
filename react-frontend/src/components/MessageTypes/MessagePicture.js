import React, {useState, useEffect} from "react";
import "../css/MessageStyles/MessageBasic.css"
import "../css/MessageStyles/MessagePicture.css"
import secretary from '../../img/secretary.png'

import {setStyling} from "../ChatMessagesList";



export default function MessagePicture({message}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className={"ChatMessage-container MessagePicture " + setStyling(author)}>
            <div className="img-bg">
                <img className="profil-picture" src={secretary}/>
            </div>

            <div className="message">
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}