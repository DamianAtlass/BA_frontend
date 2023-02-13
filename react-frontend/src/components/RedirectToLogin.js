import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import {INITIAL_USER} from "./contexts/UserDataContext";

export default function RedirectToLogin({children}){
    const navigate = useNavigate()
    const setUserData = useUserDataUpdate()
    const userData = useUserData()

    useEffect(()=>{
        let local_username = localStorage.getItem("user")
        if(local_username && userData.username === INITIAL_USER){
            setUserData({"type": "update", "payload": {"username": local_username}})
        } else {
            navigate("login")
        }
    }, [])

    return <>{children}</>
}
