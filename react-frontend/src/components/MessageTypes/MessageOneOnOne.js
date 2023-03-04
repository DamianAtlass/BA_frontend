import React, {useState, useEffect} from "react";
import "../css/MessageStyles/MessageBasic.css"
import "../css/MessageStyles/MessageOneOnOne.css"
import robot from '../../img/robot.png'


export default function MessageOneOnOne({message}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className={"ChatMessage-container bot"}>
            <div className="img-bg">
                <img className="profil-picture" src={robot}/>
            </div>

            <div className="message">
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}