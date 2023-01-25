import React from "react"
import {useUserData} from "./contexts/UserDataContext";

export default function OverviewPage(){
    const userData = useUserData()

    return (
        <>
            <h1>OverviewPage {userData.username} </h1>
        </>
    )
}
