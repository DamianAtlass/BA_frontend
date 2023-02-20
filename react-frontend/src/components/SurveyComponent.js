import 'survey-core/defaultV2.min.css';
import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui';
import {useCallback} from 'react';
import {useUserData} from "./contexts/UserDataContext";
import { API_URL } from "../constants";
import axios from "axios";

const surveyJson = {
    title: "Give your opinion!",

    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    completedHtml: "<h4>Thank you very much for taking part in this study!</h4>",
    pages: [{
        elements: [{
            name: "nps-score1",
            isRequired: true,
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10
        },{
            name: "nps-score2",
            isRequired: true,
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10
        },{
            name: "nps-score3",
            isRequired: true,
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10
        },{
            name: "nps-score4",
            isRequired: true,
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10
        },],
    }]
};


export default function SurveyComponent() {

    const userData = useUserData()
    const user_pk_str_pad = userData.user_pk.toString().padStart(3, '0')
    console.log("user_pk_str_pad:", user_pk_str_pad)

    async function saveSurveyResults(url, json) {

        //////////////////////////////
        try {
            let res = await axios.post(url, json).then((response) => {
            });
        } catch (err) {

        }
    }

    const survey = new Model(surveyJson);
    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(
            API_URL + "surveydata/" + user_pk_str_pad+"/",
            sender.data
        )
    }, []);

    survey.onComplete.add(surveyComplete);

    return <Survey model={survey}/>;
}

