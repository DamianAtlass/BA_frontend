import React, { useState, useEffect} from "react";
import {useUserData} from "./contexts/UserDataContext";



export default function ChatMessage({author, content}){


    return(
        <>
            ChatMessage: {author}: {content}
        </>
    )
}