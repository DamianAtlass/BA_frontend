import 'survey-core/defaultV2.min.css';
import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui';
import {useCallback, useState} from 'react';
import {useUserData} from "./contexts/UserDataContext";
import React, {useEffect} from "react";
import { API_URL } from "../constants";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./css/CompleteCard.css"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";

const surveyJson = {
    title: "Give your opinion!",
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    pages: [{
        elements: [{
            name: "nps-score1",
            isRequired: true,
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10
        },],
    }]
};

function CompleteCard(){
    const userData = useUserData(false)
    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')

    const url = window.location.href
    console.log("currentUrl:",url)
    //slice last word
    const customLink = `${url.slice(0, url.length-6)}login?invitedby=${user_pk_str_pad}`

    console.log("customLink: ", customLink)


    return (
        <Card className="CompleteCard">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="justify-content-center" align="center">
                        <h1>Thx for your partaking</h1>
                    </Col>
                </Row>
                <Row className="justify-content-evenly">
                    <Col align="center">
                        {customLink}
                    </Col>
                </Row>
                <Row>
                    <Col align="center">
                        <Button onClick={() => {navigator.clipboard.writeText(customLink)}}>Copy</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}


export default function SurveyComponent() {
    const userData = useUserData()
    const navigate = useNavigate()


    const [complete, setComplete] = useState(false)

    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')

    async function saveSurveyResults(url, json) {
        try {
            let res = await axios.post(url, json).then((response) => {
            });
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const survey = new Model(surveyJson);
    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(
            API_URL + "surveydata/" + user_pk_str_pad+"/",
            sender.data
        )
        setComplete(true)
    }, []);

    survey.onComplete.add(surveyComplete);


    return complete ? <CompleteCard/> : <Survey model={survey}/>;
}

