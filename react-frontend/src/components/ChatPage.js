import React, {useEffect, useState, useReducer} from "react"
import {useUserData} from "./contexts/UserDataContext";
import ChatMessagesList from "./ChatMessagesList";
import axios from "axios";
import {API_URL} from "../constants";
import ChoiceList from "./ChoiceList";
import {INITIAL_USER} from "./contexts/UserDataContext";
import {useNavigate} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import "./css/ChatPage.css"
import InputField from "./InputField";

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
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [defaultInput, setDefaultInput] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.username === INITIAL_USER && !localStorage.getItem("user")) {
            navigate("/login")
        }
        getMessage()
    }, [])

    useEffect(() => {
        console.log("selectedChoice changed to:", selectedChoice)
    }, [selectedChoice])

    function handelChoiceSelection(user_response_pk) {
        console.log("buttzon pressed")
        console.log("handelChoiceSelection", user_response_pk)
        const user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })
        setSelectedChoice(user_response)
        setDefaultInput(user_response.content)
    }

    function handleSubmit() {
        let elem = document.getElementById('scroll');
        elem.scrollTop = elem.scrollHeight;
        if (selectedChoice !== null) {
            console.log("selectedChoice:", selectedChoice)

            dispatch({type: "append", payload: [selectedChoice]})
            console.log("selectedChoice[\"pk\"]:", selectedChoice["pk"])

            setSelectedChoice(null)
            setDefaultInput("")

            getMessage(selectedChoice["pk"])
        } else {
            console.log("is null")
        }

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
        <div className="ChatPage-grid-container">
            <Container fluid id="scroll" className="ChatPage-grid-item-1">
                <Row className="justify-content-center">
                    <Col className="nopadding" sx={12} sm={8}>
                        <Navbar className="nav-color" expand="lg">
                            <Container fluid>
                                <Navbar.Brand className="nav-text">[ChatbotName]</Navbar.Brand>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sx={12} sm={8}>
                        <ChatMessagesList messages={messages}/>
                    </Col>
                </Row>

            </Container>
            <Container fluid className="ChatPage-grid-item-3">
                <div className="ChatPage-grid-container-2">

                    <Row className="justify-content-center ChatPage-grid-item-2-1">
                        <Col sx={12} sm={8}>
                            <ChoiceList choices={choices} handelChoiceSelection={handelChoiceSelection}/>
                        </Col>
                    </Row>

                    <Row className="justify-content-center ChatPage-grid-item-1">
                        <Col sx={12} sm={8} className="ChatPage-input-bg">
                            <InputField handleSubmit={handleSubmit} defaultInput={defaultInput}/>
                        </Col>
                    </Row>
                </div>
            </Container>

        </div>

    )

}
