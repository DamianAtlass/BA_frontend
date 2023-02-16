import React, {useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";
import "./css/ChatMessage.css"


export default function ChatMessage({author, content}) {


    return (
        <div className="ChatMessage-container">
            <div id="test" className="message">
                <div className="author"><b>{author}:</b></div>
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}