import React, {useEffect, useState, useReducer} from "react"
import {useUserData} from "./contexts/UserDataContext";
import ChatMessagesList from "./ChatMessagesList";
import axios from "axios";
import {API_URL} from "../constants";
import ChoiceList from "./ChoiceList";
import {INITIAL_USER} from "./contexts/UserDataContext";
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/ChatPage.css"

const sleep = ms => new Promise(r => setTimeout(r, ms));

function reducer(state, action) {
    switch (action.type) {
        case "append":
            return [...state, ...action.payload]
        case "replace":
            return [...action.payload]
        default:
            throw Error('Unknown action.');
    }
}

export default function ChatPage() {
    const userData = useUserData()
    const [messages, dispatch] = useReducer(reducer, []); //underline is 'ok'
    const [choices, setChoices] = useReducer(reducer, []);
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.username === INITIAL_USER && !localStorage.getItem("user")) {
            navigate("/welcome")
        }
        getMessage()
    }, [])

    async function handleClick(user_response_pk) {

        const user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })
        dispatch({type: "append", payload: [user_response]})

        //await sleep(3000)
        getMessage(user_response_pk)
    }

    function getMessage(user_response_pk = null) {
        console.log("REQUEST response")

        const request_data = {
            "username": userData.username === INITIAL_USER ? localStorage.getItem("user") : userData.username,
            "user_response_pk": user_response_pk
        }
        axios.post(API_URL + "getchatdata/", request_data).then((response) => {

            dispatch({type: "append", payload: [...response.data["history"], ...response.data["bot_responses"]]})
            setChoices({type: "replace", payload: response.data["choices"]})
        });
    }

    return (
        <Container fluid id="chatwindow">
            <Row className="justify-content-center">
                <Col sx={12} sm={8}>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand>[ChatbotName]</Navbar.Brand>
                        </Container>
                    </Navbar>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col sx={12} sm={8}>
                    <ChatMessagesList messages={messages}/>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col sx={12} sm={8}>
                    <ChoiceList choices={choices} handleClick={handleClick}/>
                </Col>
            </Row>

        </Container>

    )

}
