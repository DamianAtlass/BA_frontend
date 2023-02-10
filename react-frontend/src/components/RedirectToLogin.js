import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";

export default function RedirectToLogin({children}){
    const navigate = useNavigate()
    const setUserData = useUserDataUpdate()

    useEffect(()=>{
        localStorage.removeItem("user")


        /*let local_username = localStorage.getItem("user")
        console.log("UserContext",local_username)

        if (local_username && !(local_username === "")){
            console.log("local_username existend:", local_username)
            setUserData({"type": "update", "payload": {"username": local_username})
            navigate("/overview")
        }

         */
    }, [])

    return <>{children}</>
}
