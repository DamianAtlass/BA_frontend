import React, {useEffect, useState} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import ChoiceList from "./ChoiceList";



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

    function handleClick(pk){
        console.log("button clicked", pk)
    }

    async function getMessage(){
        const data = {
            "username": userData.username,
        }
        let res = await axios.post(API_URL +"getchatdata/", data).then((response) => {
            console.log("response data(bot responses): ", response.data["bot_responses"])
            setMessages(response.data["bot_responses"])
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
