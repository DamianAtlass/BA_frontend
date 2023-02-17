import React, {useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";
import "./css/MessageStyles/ChatMessage.css"
import "./css/MessageStyles/bot.css"
import "./css/MessageStyles/user.css"


export default function ChatMessage({author, content}) {
    function calculateStyle(){
        switch (author){
            case "USER":
                return "user"
            case "BOT":
                return "bot"
        }
    }

    return (
        <div className={"ChatMessage-container " + calculateStyle()}>
            <div id="test" className="message">
                <div className="author"><b>{author}:</b></div>
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}