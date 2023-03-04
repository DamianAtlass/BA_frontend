import React, {useState, useEffect} from "react";
import "../css/MessageStyles/MessageBasic.css"
import "../css/MessageStyles/MessageBubble.css"

import {setStyling} from "../ChatMessagesList";


export default function MessageBubble({message, same_author}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        //TODO ISIS NEED TO BE EXCHANGED WITH 'MENTOR'
        <div className={"ChatMessage-container MessageBubble " + setStyling(author)}>
            <div className="message">
                {!same_author && <b>{author}:</b>}
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}