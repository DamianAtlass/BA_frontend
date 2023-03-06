import 'survey-core/defaultV2.min.css';
import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui';
import {useCallback, useState} from 'react';
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "./css/CompleteCard.css"
import MainContainer from "./MainContainer";

import CopyLinkComponent from "./CopyLinkComponent";
import {BACKEND_API_URL} from "../env";


const surveyJson = {
    title: "Deine Meinung zählt!",
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
    const userData = useUserData()
    const setUserdata = useUserDataUpdate()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!userData.completed_survey){
            setUserdata({type: "update", payload: {completed_survey: true}})
        }
    },[])


    return (
        <MainContainer>
            <Card className="CompleteCard">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col className="justify-content-center" align="center">
                            <h1>Vielen Dank für deine Teilnahme!</h1>
                        </Col>
                    </Row>
                    <CopyLinkComponent/>
                    <Row>
                        <Col align="center">
                            Andere Nutzer werden deine Emailadresse nicht sehen können, nur deinen Benutzername.
                        </Col>
                    </Row>
                    <Row>
                        <Col align="center">
                            <Button onClick={() => {navigate("/overview")}}>Zurück zur Übersicht</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </MainContainer>
    )
}


export default function SurveyComponent() {
    const userData = useUserData()
    const navigate = useNavigate()

    const [completeSurveyState, setCompleteSurveyState] = useState(false)


    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')


    useEffect(()=>{
        if(userData.completed_survey){
            setCompleteSurveyState(true)
        }
        if(!userData.completed_dialog){
            navigate("/overview")
        }
    },[])

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
        saveSurveyResults(BACKEND_API_URL + "surveydata/" + user_pk_str_pad+"/",sender.data)
        setCompleteSurveyState(true)
    }, []);

    survey.onComplete.add(surveyComplete);

    return completeSurveyState ? <CompleteCard/> : <MainContainer> <Survey model={survey}/> </MainContainer>;
}

