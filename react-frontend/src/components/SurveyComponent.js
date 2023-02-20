import 'survey-core/defaultV2.min.css';
import {Model} from 'survey-core';
import {Survey} from 'survey-react-ui';
import {useCallback} from 'react';

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

const SURVEY_ID = 1;

export default function SurveyComponent() {
    const survey = new Model(surveyJson);
    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(
            "http://localhost:8000/api/ok/" + SURVEY_ID,
            sender.data
        )
    }, []);

    survey.onComplete.add(surveyComplete);

    return <Survey model={survey}/>;
}

function saveSurveyResults(url, json) {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.addEventListener('load', () => {
        // Handle "load"
    });
    request.addEventListener('error', () => {
        // Handle "error"
    });
    request.send(JSON.stringify(json));
}