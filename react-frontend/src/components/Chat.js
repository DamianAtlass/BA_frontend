import React, { useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import {API_URL} from "../constants";


export default function Chat(){

    const [currentMessage, setCurrentMessage] = useState(null)

    async function getMessage(){

        let res = await axios.post(API_URL +"TODO/", data).then((response) => {

        });
    }

    useEffect(()=>{


    },[])

    return(
        <>
        Chat:
        </>
    )
}