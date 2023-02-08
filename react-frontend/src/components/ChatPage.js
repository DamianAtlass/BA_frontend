import React, {useEffect, useState} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import ChoiceList from "./ChoiceList";
import {v4} from 'uuid';




export default function ChatPage(){
    const userData = useUserData()
    //const [currentMessage, setCurrentMessage] = useState(null)


    const [messages, setMessages] = useState([])
    const [choices, setChoices] = useState([])

    useEffect(()=>{
        getMessage()
    },[])

    useEffect(()=>{
        console.log("messages(State) changed:")
        console.log(messages)
    },[messages])

    useEffect(()=>{
        console.log("choices(State) changed:")
        console.log(choices)
    },[choices])

    function handleClick(user_response_pk){
        let user_response = choices.find(choice => {
            return choice["pk"] === user_response_pk
        })

        console.log("user_response", user_response)

        setMessages(messages.concat(user_response))
        setTimeout(()=>{
            return getMessage(user_response_pk)
        }, 5000)

    }

    async function getMessage(user_response_pk=null){
        console.log("call for response")
        const data = {
            "username": userData.username,
            "user_response_pk": user_response_pk
        }
        console.log("pre-setState messages(State):", messages)
        let res = await axios.post(API_URL +"getchatdata/", data).then((response) => {
            console.log("response data(bot responses): ", response.data["bot_responses"])
            setMessages(messages.concat(response.data["bot_responses"]))
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
