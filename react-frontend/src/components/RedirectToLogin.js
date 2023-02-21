import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import {INITIAL_USER} from "./contexts/UserDataContext";

export default function RedirectToLogin({children}){
    const navigate = useNavigate()
    const setUserData = useUserDataUpdate()
    const userData = useUserData()

    useEffect(()=>{
        if(userData.username === INITIAL_USER){
            console.log("[Redirect]userData.username:", userData.username)
            navigate("login")
        }
    }, [])

    return <>{children}</>
}
