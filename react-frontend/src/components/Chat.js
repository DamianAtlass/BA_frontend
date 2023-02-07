import React, { useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ChatMessage from "./ChatMessage";
import axios from "axios";
import {API_URL} from "../constants";
import {useUserData} from "./contexts/UserDataContext";


export default function Chat(){
    const userData = useUserData()
    const [currentMessage, setCurrentMessage] = useState(null)
    const [messages, setMessages] = useState([])

    async function getMessage(){
        const data = {
            "username": userData.username,
        }
        let res = await axios.post(API_URL +"getchatdata/", data).then((response) => {
            setMessages(response.data["bot_responses"])
        });
    }

    

    useEffect(()=>{
        getMessage()
    },[])

    return(
        <>
            {renderMessages()}
        </>
    )
}