import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {v4} from 'uuid';
import "./css/ChatMessagesList.css"
import MessageUser from "./MessageTypes/MessageUser";
import MessageOneOnOne from "./MessageTypes/MessageOneOnOne";
import MessageBubble from "./MessageTypes/MessageBubble";
import {useUserData} from "./contexts/UserDataContext";
import MessageClassic from "./MessageTypes/MessageClassic";
import MessagePicture from "./MessageTypes/MessagePicture";
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

    function calculateMessageType(message, same_author){
        let author = message["author"]

        //extremely important, blocks circular rendering
        if (!userData.completed_dialog) {
            onDialogComplete(message["dialogIsComplete"])
        }

        switch(author){

            case "USER":
                return <MessageUser message={message}/>
            default:
                switch (dialog_style){
                    case DIALOG_STYLE_ONE_ON_ONE:
                        return <MessageOneOnOne message={message} same_author={same_author}/>
                    case DIALOG_STYLE_COLORED_BUBBLES:
                        return <MessageBubble message={message} same_author={same_author}/>
                    case DIALOG_STYLE_CLASSIC_GROUP:
                        return <MessageClassic message={message} same_author={same_author}/>
                    case DIALOG_STYLE_PICTURE:
                        return <MessagePicture message={message} same_author={same_author}/>
                }

        }

    }

    function createMessages() {
        return messages.map((msg, index) => {
            // check if previous message (exists and) was from same author, don't display author again of so

            let same_author = index-1 >= 0 && messages[index-1]["author"] === msg["author"]
            return (
                    <Row key={v4()} className="justify-content-center">
                        <Col className="nopadding ChatMessagesList-container">
                            {calculateMessageType(msg, same_author)}
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
