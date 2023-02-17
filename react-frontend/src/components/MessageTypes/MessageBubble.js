import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/MessageBubble.css"

import {setStyling} from "../ChatMessagesList";


export default function MessageBubble({author, content}) {


    return (
        <div className={"ChatMessage-container MessageBubble " + setStyling(author)}>
            <div className="message">
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}