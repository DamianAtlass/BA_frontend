import React from "react"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";


export default function WelcomePage(){
    return (
        <>
            <p>Welcome</p>
            <CreateUserModal/>
            <LoginModal/>
        </>
    )
}
