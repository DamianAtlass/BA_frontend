import React, {useState, useEffect} from "react";
import "../../../css/MessageStyles/MessageBasic.css"
import "../../../css/MessageStyles/MessageUser.css"


export default function MessageUser({message}) {
    function getTime(){
        let current_date = new Date();
        let hours_str = String(current_date.getHours()).padStart(2, '0')
        let min_str = String(current_date.getMinutes()).padStart(2, '0')
        return hours_str + ":" + min_str
    }

    let author = message["author"]
    let content = message["content"]


    let date = message["date"] === undefined ? getTime() : message["date"]

    return (
        <div className={"ChatMessage-container user"}>
            <div className="message">
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}