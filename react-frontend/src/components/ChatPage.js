import React, {useEffect, useState} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import axios from "axios";
import { API_URL } from "../constants";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ChatPage(){
    const userData = useUserData()
    //const [currentMessage, setCurrentMessage] = useState(null)


    const [messages, setMessages] = useState([])
    const [choises, setChoises] = useState([])

    useEffect(()=>{
        getMessage()
    },[])

    useEffect(()=>{
        console.log("messages(State) changed:")
        console.log(messages)
    },[messages])
    useEffect(()=>{
        console.log("choises(State) changed:")
        console.log(choises)
    },[choises])


    async function getMessage(){
        const data = {
            "username": userData.username,
        }
        let res = await axios.post(API_URL +"getchatdata/", data).then((response) => {
            console.log("response data(bot responses): ", response.data["bot_responses"])
            setMessages(response.data["bot_responses"])
            setChoises(response.data["choises"])
        });
    }



    return (
        <>
            chat:
            <Chat messages={messages}/>

        </>
    )

}
