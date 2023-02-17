import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/MessageClassic.css"
import robot from '../../img/robot.png'

import {setStyling} from "../ChatMessagesList";


export default function MessageClassic({message}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className={"ChatMessage-container MessageClassic " + setStyling(author)}>
            <div className="message">
                <b>{author}:</b>
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}