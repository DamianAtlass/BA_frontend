import React, {useState, useEffect} from "react";
import ChatMessage from "./ChatMessage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {v4} from 'uuid';

export default function ChatMessagesList({messages}) {
    function createMessages() {
        return messages.map(msg => {
            return (
                <Container fluid key={v4()}>
                    <Row>
                        <Col>
                            <ChatMessage content={msg["content"]} author={msg["author"]}/>
                        </Col>
                    </Row>
                </Container>
            )
        })
    }

    return (
        <>
            {createMessages()}
        </>

    )
}
