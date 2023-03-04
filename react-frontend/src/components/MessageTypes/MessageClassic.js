import React, {useState, useEffect} from "react";
import "../css/MessageStyles/MessageBasic.css"
import "../css/MessageStyles/MessageClassic.css"
import robot from '../../img/robot.png'

import {setStyling} from "../ChatMessagesList";


export default function MessageClassic({message, same_author}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className={"ChatMessage-container MessageClassic " + setStyling(author)}>
            <div className="message">
                {!same_author && <b>{author}:</b>}
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}