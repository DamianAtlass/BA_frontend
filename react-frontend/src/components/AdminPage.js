import React, {useEffect, useState} from 'react';
import {INITIAL_USER} from "./contexts/UserDataContext";
import axios from "axios";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import {useNavigate, Link} from "react-router-dom";
import {v4} from 'uuid';
import {ADMIN_USERNAME, BACKEND_API_URL} from "../env";
import "./css/AdminPage.css"

export default function AdminPage() {
    const navigate = useNavigate()
    const userData = useUserData()
    const setUserData = useUserDataUpdate()
    const [fetchedDate, setFetchedDate] = useState(null)
    const [userInfos, setUserInfos] = useState([])

    useEffect(()=>{
        if(!(userData.username===ADMIN_USERNAME)){
            navigate("/login")
        }
        fetchData()
    }, [])

    async function fetchData(){
        try {
            console.log("fire get")
            await axios.post(BACKEND_API_URL +"admin/getuserdata/", {"token": JSON.parse(localStorage.getItem('state')).token}).then((response) => {

                console.log("handle response, data: ",response.data)

                console.log("setUserinfo as ", response.data["all_userinfos"])
                setUserInfos(response.data["all_userinfos"])
            });
        } catch(err){
            console.log("error")
        }
    }
    function create_td_bool(parameter){
        if(parameter){
            return (<td className="true">true</td>)
        } else {
            return (<td className="false">false</td>)
        }
    }
    function build_table(){
        console.log("enter table")
        return userInfos.map((entry, index) => {
            return (
                <tr key={v4()}>
                    <td>{entry.username}</td>
                    <td>{entry.email}</td>
                    {create_td_bool(entry.verified)}
                    {create_td_bool(entry.completed_dialog)}
                    {create_td_bool(entry.completed_survey)}
                    <td>{entry.dialog_style}</td>
                    <td>{entry.user_pk}</td>
                    <td>{entry.invited_by}</td>
                    <td>{entry.recruited_len}</td>
                    <td>{entry.indirectly_recruited_len}</td>
                    <td>{entry.user_score}</td>
                </tr>
            )
        })
    }


    return (
            <div className="AdminPage">
                <h1>Admin Page</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>username</th>
                            <th>email</th>
                            <th>verified</th>
                            <th>completed dialog</th>
                            <th>completed survey</th>
                            <th>dialog_style</th>
                            <th>user_pk</th>
                            <th>invited by</th>
                            <th>recruited</th>
                            <th>indirectly recruited</th>
                            <th>user score</th>
                        </tr>
                        {build_table()}
                    </tbody>
                </table>
            </div>
        )


}