import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/user.css"


export default function UserMessage({message}) {
    let author = message["author"]
    let content = message["content"]

    let currentdate = new Date();
    let time_now = currentdate.getHours()+":"+currentdate.getMinutes()
    let date = message["date"] === undefined ? time_now : message["date"]

    return (
        <div className={"ChatMessage-container user"}>
            <div className="message">
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}