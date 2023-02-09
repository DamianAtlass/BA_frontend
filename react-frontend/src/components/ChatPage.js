import React, {useEffect, useState, useReducer} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import ChoiceList from "./ChoiceList";
import Button from 'react-bootstrap/Button';

const sleep = ms => new Promise(r => setTimeout(r, ms));

function reducer (state, action){
    if (action.type==="update_messages"){
        return [...state, ...action.payload]
    }
    throw Error('Unknown action.');
}




export default function ChatPage(){
    const userData = useUserData()
    //const [currentMessage, setCurrentMessage] = useState(null)


    //const [messages, setMessages] = useState([])
    const [messages, dispatch] = useReducer(reducer, []);
    const [choices, setChoices] = useState([])

    let tmp = null

    useEffect(()=>{
        getMessage()
    },[])

    useEffect(()=>{
        console.log("[useEffect] messages changed:", messages)
    },[messages])

    useEffect(()=>{
        console.log("[useEffect] choices changed:", choices)
    },[choices])

    function foo(){
        console.log("messages: ", messages)
    }

    async function handleClick(user_response_pk){
        const user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })
        console.log("type:", typeof(messages))
        console.log("pre user_response", messages)

        console.log("dispatch", user_response)
        dispatch({"type":"update_messages", "payload": [user_response]})

        console.log("post user_response", messages)


        console.log("getMessage(user_response_pk)", user_response_pk)
        await sleep(3000)
        getMessage(user_response_pk)
    }

    function getMessage(user_response_pk=null){
        console.log("call for response")
        const data = {
            "username": userData.username,
            "user_response_pk": user_response_pk
        }
        console.log("messages(State):", messages)
        let res =  axios.post(API_URL +"getchatdata/", data).then((response) => {
            console.log("response data(bot responses): ", response.data["bot_responses"])

            //setMessages([...messages,...response.data["bot_responses"]])
            console.log("dispatch")
            dispatch({"type":"update_messages", "payload": response.data["bot_responses"] })


            setChoices(response.data["choices"])
        });
        console.log("messages(State):", messages)
    }

    return (
        <>
            chat:
            <Chat messages={messages}/>
            <Button onClick={foo}>click me</Button>
            <Button onClick={()=>{getMessage(2)}}>fire</Button>
            <ChoiceList choices={choices} handleClick={handleClick}/>

        </>
    )

}
