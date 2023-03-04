import React, {useEffect, useState} from 'react';
import {INITIAL_USER} from "./contexts/UserDataContext";
import axios from "axios";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import {useNavigate, Link} from "react-router-dom";

import {ADMIN_USERNAME, BACKEND_API_URL} from "../env";

export default function AdminPage() {
    const navigate = useNavigate()
    const userData = useUserData()
    const setUserData = useUserDataUpdate()
    const [fetchedDate, setFetchedDate] = useState(null)

    useEffect(()=>{
        console.log("userData. username: ", userData.username)
    }, [])

    async function fetchData(){
        try {
            console.log("fire get")
            await axios.post(BACKEND_API_URL +"admin/getuserdata/", {"token": JSON.parse(localStorage.getItem('state')).token}).then((response) => {

                console.log("response.data: ",response.data)

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