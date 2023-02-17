import React, {useState, useEffect} from "react";
import "../css/MessageStyles/ChatMessage.css"
import "../css/MessageStyles/bot.css"
import robot from '../../img/robot.png'


export default function BotMessage({author, content}) {

    return (
        <div className={"ChatMessage-container bot"}>
            <div className="img-bg">
                <img className="profil-picture" src={robot}/>
            </div>

            <div id="test" className="message">
                <div className="content">{content} asdklfjasd f sadlkf sadfsd asdfasdf </div>
                <div className="date">date</div>
            </div>
        </div>
    )
}