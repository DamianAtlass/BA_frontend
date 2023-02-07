import React, { useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import {API_URL} from "../constants";
import {useUserData} from "./contexts/UserDataContext";


export default function Chat(){
    const userData = useUserData()
    const [currentMessage, setCurrentMessage] = useState(null)

    async function getMessage(){
        const data = {
            "test": "test",
            "username": "ben@mail.com"
        }
        let res = await axios.get(API_URL +"getchatdata/", data).then((response) => {
            console.log(response.data)
        });
    }

    useEffect(()=>{

        getMessage()

    },[])

    return(
        <>
        Chat:
        </>
    )
}