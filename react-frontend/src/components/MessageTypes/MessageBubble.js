import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/MessageBubble.css"

import {setStyling} from "../ChatMessagesList";


export default function MessageBubble({message}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className={"ChatMessage-container MessageBubble " + setStyling(author)}>
            <div className="message">
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}