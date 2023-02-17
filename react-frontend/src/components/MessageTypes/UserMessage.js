import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/user.css"


export default function UserMessage({author, content}) {

    return (
        <div className={"ChatMessage-container user"}>
            <div id="test" className="message">
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}