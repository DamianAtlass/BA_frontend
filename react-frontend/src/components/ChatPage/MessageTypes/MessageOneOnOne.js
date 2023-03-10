import React, {useState, useEffect} from "react";
import "../../../css/MessageStyles/MessageBasic.css"
import "../../../css/MessageStyles/MessageOneOnOne.css"
import robot from '../../../img/robot.png'


export default function MessageOneOnOne({message, same_author}) {
    let author = message["author"]
    let content = message["content"]
    let date = message["date"]

    return (
        <div className="ChatMessage-container MessageOneOnOne ">

            {same_author ?
                <div></div> :
                <div className="img-bg">
                    <img src={robot}/>
                </div>
            }

            <div className="message">
                {!same_author && <b>CHATU:</b>}
                <div className="content">{content}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}