import React, {useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";
import "./css/MessageStyles/ChatMessage.css"
import "./css/MessageStyles/bot.css"
import "./css/MessageStyles/user.css"
import robot from '../img/robot.png'

const DIALOG_STYLE_ONE_ON_ONE = "ONE_ON_ONE"
const DIALOG_STYLE_COLORED_BUBBLES = "COLORED_BUBBLES"
const DIALOG_STYLE_CLASSIC_GROUP = "CLASSIC_GROUP"
const DIALOG_STYLE_PICTURE = "PROFILE_PICTURES"

export default function ChatMessage({author, content}) {
    const userData = useUserData()
    let dialog_style = userData.dialog_style === undefined ? localStorage.getItem("dialog_style") : userData.dialog_style
    function calculateStyle(){
        switch (dialog_style){
            case DIALOG_STYLE_ONE_ON_ONE:
                switch (author){
                    case "USER":
                        return "user"
                    case "BOT":
                        return "bot"
                }
        }
    }

    return (
        <div className={"ChatMessage-container " + calculateStyle()}>
            {dialog_style === DIALOG_STYLE_ONE_ON_ONE && author!=="USER" && <img className="profil-picture" src={robot}/>}
            <div id="test" className="message">


                { author!=="USER" && <div className="author"><b>{author}:</b></div>}
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}