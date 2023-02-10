import React, {useEffect, useState} from "react"
import {useUserData} from "./contexts/UserDataContext";
import Chat from "./Chat";
import TestComponent from "./TestComponent";
import ChatPage from "./ChatPage";

export default function OverviewPage(){
    const userData = useUserData()

    useEffect(()=>{
        console.log("OverviewPage",localStorage.getItem("user"))
        console.log("OverviewPage",localStorage.getItem("password"))
    }, [])

    return (
        <>
            <h1>OverviewPage {userData.username} </h1>
            <ChatPage/>

        </>
    )
}
