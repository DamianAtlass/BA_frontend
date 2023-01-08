import React from "react"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";



export default function WelcomePage(){
    return (
        <>
            <h1>Welcome</h1>
            <CreateUserModal/>
            <LoginModal/>
        </>
    )
}
