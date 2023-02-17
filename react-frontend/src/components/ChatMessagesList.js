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

    const userData = useUserData()
    let dialog_style = userData.dialog_style === undefined ? localStorage.getItem("dialog_style") : userData.dialog_style

    function calculateMessageType(message){
        let author = message["author"]
        switch (dialog_style){
            case DIALOG_STYLE_ONE_ON_ONE:
                switch (author){
                    case "USER":
                        return <UserMessage content={message["content"]} author={message["author"]}/>
                    default:
                        return <BotMessage content={message["content"]} author={message["author"]}/>
                }
            case DIALOG_STYLE_COLORED_BUBBLES:
                switch (author){
                    case "USER":
                        return <UserMessage content={message["content"]} author={message["author"]}/>
                    default:
                        return <MessageBubble content={message["content"]} author={message["author"]}/>
                }
            case DIALOG_STYLE_CLASSIC_GROUP:
                switch (author){
                    case "USER":
                        return <UserMessage content={message["content"]} author={message["author"]}/>
                    default:
                        return <MessageBubble content={message["content"]} author={message["author"]}/>
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
