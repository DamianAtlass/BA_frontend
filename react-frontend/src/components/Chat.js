import React, { useState, useEffect} from "react";
import ChatMessage from "./ChatMessage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {v4} from 'uuid';

export default function Chat({messages}) {
    function createMessages(){
        return messages.map(msg => {
            return (
                <Row key={v4()}>
                    <Col>
                        <ChatMessage  content={msg["content"]} author={msg["author"]}/>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <Container>
            {createMessages()}
        </Container>

    )
}