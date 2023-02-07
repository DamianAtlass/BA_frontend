import React, { useState, useEffect} from "react";
import axios from "axios";
import {API_URL} from "../constants";
import {useUserData} from "./contexts/UserDataContext";


export default function TestComponent(){

    async function getMessage(){
        const data = {
            "test": "test",
            "username": "ben@mail.com",
        }
        let res = await axios.post(API_URL +"ok/", data).then((response) => {
            console.log(response.data)
        });
    }

    useEffect(()=>{

        getMessage()

    },[])

    return(
        <>
            Test:
        </>
    )
}