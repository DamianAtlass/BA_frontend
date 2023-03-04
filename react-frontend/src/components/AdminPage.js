import React, {useEffect} from 'react';
import {INITIAL_USER} from "./contexts/UserDataContext";
import axios from "axios";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import {useNavigate, Link} from "react-router-dom";

import {ADMIN_USERNAME, BACKEND_API_URL} from "../env";

export default function AdminPage() {
    const navigate = useNavigate()
    const userData = useUserData()
    const setUserData = useUserDataUpdate()

    useEffect(()=>{
        if(userData.username !== ADMIN_USERNAME){
            //navigate("/login")
        }
    })

    async function fetchData(){
        try {
            console.log("fire get")
            await axios.get(BACKEND_API_URL +"accounts/").then((response) => {
                const username = response.data["username"]

                console.log(response.data)
                setUserData({"type": "update", "payload": {
                        "username": username,
                        "token": response.data["token"]
                    }})

            });
            console.log("success")
        } catch(err){
            console.log("error")
        }
        return userData
    }


    return (
            <>
                hey
                {fetchData().toString()}
            </>
        )


}