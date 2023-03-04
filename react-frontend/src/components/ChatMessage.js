import React, {useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";
import "./css/MessageStyles/MessageBasic.css"
import "./css/MessageStyles/MessageOneOnOne.css"
import "./css/MessageStyles/MessageUser.css"
import robot from '../img/robot.png'



export default function ChatMessage({message}) {

    let author = message["author"]
    let content = message["content"]

    return (
        <div className={"ChatMessage-container "}>
            <div className="message">


                { author!=="USER" && <div className="author"><b>{author}:</b></div>}
                <div className="content">{content}</div>
                <div className="date">date</div>
            </div>
        </div>
    )
}