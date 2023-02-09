import React, {useEffect, useState, useReducer} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import ChoiceList from "./ChoiceList";

const sleep = ms => new Promise(r => setTimeout(r, ms));

function reducer (state, action){
    switch (action.type) {
        case "update_messages":
            return [...state, ...action.payload]
        default:
            throw Error('Unknown action.');
    }
}

export default function ChatPage(){
    const userData = useUserData()
    const [messages, dispatch] = useReducer(reducer, []); //underline is 'ok'
    const [choices, setChoices] = useState([])


    useEffect(()=>{
        getMessage()
    },[])

    async function handleClick(user_response_pk){

        const user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })
        console.log(`USER response: ${user_response}(${user_response_pk})`)
        dispatch({type:"update_messages", payload: [user_response]})

        //await sleep(3000)
        getMessage(user_response_pk)
    }

    function getMessage(user_response_pk=null){
        console.log("REQUEST response")
        const request_data = {
            "username": userData.username,
            "user_response_pk": user_response_pk
        }
        console.log("messages(State):", messages)
        axios.post(API_URL +"getchatdata/", request_data).then((response) => {
            console.log("BOT responses: ", response.data["bot_responses"])

            dispatch({type: "update_messages", payload: response.data["bot_responses"]})
            setChoices(response.data["choices"])
        });
    }

    return (
        <>
            chat:
            <Chat messages={messages}/>
            <ChoiceList choices={choices} handleClick={handleClick}/>

        </>
    )

}
