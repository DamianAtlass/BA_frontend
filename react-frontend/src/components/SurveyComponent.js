import 'survey-core/defaultV2.min.css';
import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui';
import {useCallback, useState} from 'react';
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import React, {useEffect} from "react";
import {useNavigate, Navigate} from "react-router-dom";
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


const survey_part1_Json = {
    title: "Part 1",
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
const survey_part2_Json = {
    title: "Part 2",
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
        if(!userData.completed_survey_part1){
            //setUserdata({type: "update", payload: {completed_survey_part1: true}})
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

function SurveyPart1() {
    const userData = useUserData()
    const setUserData = useUserDataUpdate()
    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')


    useState(()=>{
        console.log("SurveyPart1Component")
    },[])

    async function saveSurveyResults(url, json) {
        try {
            let res = await axios.post(url, json)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const survey = new Model(survey_part1_Json);
    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(BACKEND_API_URL + "surveydata/" + user_pk_str_pad+"/",sender.data)
        setUserData({type: "update", payload: {completed_survey_part1: true}})
    }, []);

    survey.onComplete.add(surveyComplete);

    return <Survey model={survey}/>
}

function SurveyPart2() {
    const userData = useUserData()
    const setUserData = useUserDataUpdate()
    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')
    const survey_part2 = new Model(survey_part2_Json);


    useState(()=>{
        console.log("SurveyPart2Component")
    },[])

    async function saveSurveyResults(url, json) {
        try {
            let res = await axios.post(url, json)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(BACKEND_API_URL + "surveydata/" + user_pk_str_pad+"/",sender.data)
        setUserData({type: "update", payload: {completed_survey_part2: true}})
    }, []);

    survey_part2.onComplete.add(surveyComplete);

    return <Survey model={survey_part2}/>
}

export default function SurveyComponent() {
    const userData = useUserData()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("SurveyComponent")

        console.log("userData.completed_survey_part1", userData.completed_survey_part1)
        if(userData.completed_survey_part1){
            console.log("completed_survey_part1 == true")
        }
        if(userData.completed_survey_part2){
            console.log("completed_survey_part2 == true")
        }
    },[])


    //return userData.completed_survey_part1 ? <CompleteCard/> : <SurveyPart1Component/>;

    if (userData.completed_survey_part2){
        return <CompleteCard/>
    } else if (userData.completed_dialog){
        return <SurveyPart2/>
    } else if (userData.completed_survey_part1){
        return <Navigate to={"/chat"}/>
    } else {
        return <SurveyPart1/>
    }
}

