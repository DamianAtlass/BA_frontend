import React, {useState, useEffect} from "react";
import ChatMessage from "./ChatMessage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {v4} from 'uuid';
import "./css/ChatMessagesList.css"

export default function ChatMessagesList({messages}) {

    function createMessages() {
        return messages.map(msg => {
            return (
                    <Row key={v4()} className="justify-content-center">
                        <Col className="nopadding ChatMessagesList-container">
                            <ChatMessage content={msg["content"]} author={msg["author"]}/>
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
