import React, {useState, useEffect} from "react";
import ChatMessage from "./ChatMessage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {v4} from 'uuid';
import "./css/ChatMessagesList.css"
import UserMessage from "./MessageTypes/UserMessage";
import BotMessage from "./MessageTypes/BotMessage";
import MessageBubble from "./MessageTypes/MessageBubble";
import {useUserData} from "./contexts/UserDataContext";
import MessageClassic from "./MessageTypes/MessageClassic";
import PictureMessage from "./MessageTypes/PictureMessage";
import {useNavigate} from "react-router-dom";
import {sleep} from "./ChatPage";
import {useUserDataUpdate} from "./contexts/UserDataContext";


const DIALOG_STYLE_ONE_ON_ONE = "ONE_ON_ONE"
const DIALOG_STYLE_COLORED_BUBBLES = "COLORED_BUBBLES"
const DIALOG_STYLE_CLASSIC_GROUP = "CLASSIC_GROUP"
const DIALOG_STYLE_PICTURE = "PROFILE_PICTURES"
const BOT_TYPE_MOSES = "MOSES"
const BOT_TYPE_ISIS = "ISIS"
const BOT_TYPE_STUDIERENDEN_SEK = "STUDIERENDEN-SEKRÄTARIAT"

export function setStyling(author){
    switch (author){
        case BOT_TYPE_MOSES:
            return BOT_TYPE_MOSES
        case BOT_TYPE_ISIS:
            return BOT_TYPE_ISIS
        case BOT_TYPE_STUDIERENDEN_SEK:
            return "SEK"
    }
}

export default function ChatMessagesList({messages}) {
    const navigate = useNavigate()
    const userData = useUserData()
    const updateUserData = useUserDataUpdate()

    useEffect(()=>{

    })

    async function onDialogComplete(isComplete){
        //leave if isComplete is false or undefined (when message is loaded from history, or it's a user message)
        if(!isComplete){
            return null
        }

        await sleep(1000)
        updateUserData({type: "update", payload: {completed_dialog: isComplete}})
        navigate("/survey")

    }

    let dialog_style = userData.dialog_style

    function calculateMessageType(message){
        let author = message["author"]

        //extremely important, blocks circular rendering
        if (!userData.completed_dialog) {
            onDialogComplete(message["dialogIsComplete"])
        }

        switch(author){

            case "USER":
                return <UserMessage message={message}/>
            default:
                switch (dialog_style){
                    case DIALOG_STYLE_ONE_ON_ONE:
                        return <BotMessage message={message}/>
                    case DIALOG_STYLE_COLORED_BUBBLES:
                        return <MessageBubble message={message}/>
                    case DIALOG_STYLE_CLASSIC_GROUP:
                        return <MessageClassic message={message}/>
                    case DIALOG_STYLE_PICTURE:
                        return <PictureMessage message={message}/>
                }

        }

    }

    function createMessages() {
        return messages.map(msg => {
            return (
                    <Row key={v4()} className="justify-content-center">
                        <Col className="nopadding ChatMessagesList-container">
                            {calculateMessageType(msg)}
                        </Col>
                    </Row>
            )
        })
    }

    return (
        <div>
        <Container className="" fluid>
            {createMessages()}
        </Container>
        </div>


    )
}
