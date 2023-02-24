import React, {useEffect, useState} from "react"
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import Button from 'react-bootstrap/Button';
import {useNavigate, Link} from "react-router-dom";


export default function OverviewPage(){
    const userData = useUserData()
    const updateUserData = useUserDataUpdate()

    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem('user')

        updateUserData({"type": "delete", "payload": { } })
        navigate("/login")
    }

    useEffect(()=>{
        console.log(userData.username)
    }, [])

    return (
        <>
            <h1>OverviewPage {userData.username} </h1>
            <Button onClick={logout}>Logout</Button>

            <Link to="/chat"> LINK </Link>

        </>
    )
}
