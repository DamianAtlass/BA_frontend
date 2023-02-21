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

export const sleep = ms => new Promise(r => setTimeout(r, ms));
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
        if (userData.username === INITIAL_USER) {
            navigate("/login")
        }
        getMessage()

    }, [])

    useEffect(() => {
    }, [selectedChoice])

    function handelChoiceSelection(user_response_pk) {
        console.log("button pressed")
        console.log("handelChoiceSelection", user_response_pk)
        const user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })
        setSelectedChoice(user_response)
        setDefaultInput(user_response.content)
    }

    function handleSubmit() {
        if (selectedChoice !== null) {
            console.log("selectedChoice:", selectedChoice)

            dispatch({type: "append", payload: [selectedChoice]})
            console.log("selectedChoice[\"pk\"]:", selectedChoice["pk"])

            setSelectedChoice(null)
            setDefaultInput("")

            getMessage(selectedChoice["pk"])
        } else {
            console.log("nothing selected")
        }

    }

    function getMessage(user_response_pk = null) {

        const request_data = {
            "username": userData.username,
            "user_response_pk": user_response_pk
        }
        axios.post(API_URL + "getchatdata/", request_data).then(async (response) => {

            dispatch({type: "append", payload: [...response.data["history"], ...response.data["bot_responses"]]})
            setChoices({type: "replace", payload: response.data["choices"]})

            await sleep(100);

            let elem = document.getElementById('scroll');
            elem.scrollTop = elem.scrollHeight;
        });
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="nopadding ChatMessagesList-bg" sx={12} sm={8}>
                    <div className="ChatPage-grid-container-1">
                        <Container fluid id="scroll">
                            <Row className="justify-content-center topbar">
                                <Col className="nopadding">
                                    <Navbar className="nav-color" expand="lg">
                                        <Container fluid>
                                            <Navbar.Brand className="nav-text">[ChatbotName]</Navbar.Brand>
                                        </Container>
                                    </Navbar>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col className="nopadding">
                                    <ChatMessagesList messages={messages}/>
                                </Col>
                            </Row>

                        </Container>
                        <Container fluid className="ChatPage-input-bg ChatPage-grid-item-1-2">
                            <Row className="justify-content-center">
                                <Col className="nopadding">
                                    <InputField handleSubmit={handleSubmit} defaultInput={defaultInput}/>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col className="nopadding">
                                    <ChoiceList choices={choices} handelChoiceSelection={handelChoiceSelection}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>

    )

}
