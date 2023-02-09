import React, {useEffect, useState} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import ChoiceList from "./ChoiceList";
import Button from 'react-bootstrap/Button';

const sleep = ms => new Promise(r => setTimeout(r, ms));




export default function ChatPage(){
    const userData = useUserData()
    //const [currentMessage, setCurrentMessage] = useState(null)


    const [messages, setMessages] = useState([])
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
        getMessage(user_response_pk, true)
    }

    function getMessage(user_response_pk=null, do_stuff=false){
        if(do_stuff){
            const user_response = choices.find(choice => {
                return choice["pk"] === user_response_pk
            })
            console.log("type:", typeof(user_response))
            console.log("user_response", user_response)

            tmp = user_response

            console.log("sleep")
        }


        console.log("call for response")
        const data = {
            "username": userData.username,
            "user_response_pk": user_response_pk
        }
        console.log("messages(State):", messages)
        let res =  axios.post(API_URL +"getchatdata/", data).then((response) => {
            console.log("response data(bot responses): ", response.data["bot_responses"])

            if(!user_response_pk){
                setMessages([...messages, ...response.data["bot_responses"]])
            } else {
                setMessages([...messages, tmp,...response.data["bot_responses"]])
            }

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
