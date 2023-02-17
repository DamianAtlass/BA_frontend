import React, {useState, useContext, useReducer, useEffect } from "react";

const UserDataContext = React.createContext()
const UserDataUpdateContext = React.createContext()
export const INITIAL_USER = "INITIAL_USER"

export function useUserData(){
    return useContext(UserDataContext)
}
export function useUserDataUpdate(){
    return useContext(UserDataUpdateContext)
}

export function UserContext({children}){

    function reducer(state, action) {
        switch(action.type){
            case "update":
                return {...state, ...action.payload}
        }

    }
    ////////////////////////////
    const default_state = {
        "username": INITIAL_USER,
        "dialog_style": undefined,

    }
    //const [userData, setUserData] = useState(default_state)
    const [state, dispatch] = useReducer(reducer, default_state);

    /*function changeUserData(newUserData){
        for (const [key, value] of Object.entries(newUserData)) {
            if (userData.hasOwnProperty(key)) {
                const updated_state = {...userData}
                updated_state[key] = value
                setUserData(updated_state)
            } else {
                console.log("No prop", key, "!")
            }
        }
    }*/


    return(
        <UserDataContext.Provider value={state}>
            <UserDataUpdateContext.Provider value={dispatch}>
                {children}
            </UserDataUpdateContext.Provider>
        </UserDataContext.Provider>
    )
}