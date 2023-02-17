import React, {useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";
import "./css/MessageStyles/ChatMessage.css"
import "./css/MessageStyles/bot.css"
import "./css/MessageStyles/user.css"
import robot from '../img/robot.png'



export default function ChatMessage({message}) {

    let author = message["author"]
    let content = message["content"]

    return (
        <div className={"ChatMessage-container "}>
            <div className="message">


                { author!=="USER" && <div className="author"><b>{author}:</b></div>}
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}