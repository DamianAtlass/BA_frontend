import React, {useEffect, useState} from "react"
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import Button from 'react-bootstrap/Button';
import ChatPage from "./ChatPage";
import {useNavigate} from "react-router-dom";


export default function OverviewPage(){
    const userData = useUserData()
    const updateUserData = useUserDataUpdate()

    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem('user')

        updateUserData({"type": "update", "payload": {"username": ""}})
        navigate("/welcome")
    }

    useEffect(()=>{
        console.log("OverviewPage",localStorage.getItem("user"))
    }, [])

    return (
        <>
            <h1>OverviewPage {userData.username} </h1>
            <Button onClick={logout}>Logout</Button>
            <ChatPage/>

        </>
    )
}
