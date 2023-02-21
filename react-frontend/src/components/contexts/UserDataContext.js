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
                let new_state = {...state, ...action.payload}
                localStorage.setItem('state', JSON.stringify(new_state));
                console.log("set state in storage", new_state)
                return new_state
        }

    }
    ////////////////////////////
    let local_state = JSON.parse(localStorage.getItem('state'))

    console.log("local_state: ",local_state)

    let default_state = {}

    if (local_state === null) {
        console.log("no state found")

        default_state = {
            "username": INITIAL_USER,
            "dialog_style": undefined,
            "user_pk": undefined,
        }
        console.log("set new state in storage", default_state)
        localStorage.setItem('state', JSON.stringify(default_state));
    } else {
        default_state = {
            "username": local_state.name === INITIAL_USER ? INITIAL_USER : local_state.username,
            "dialog_style": local_state.dialog_style === undefined ? undefined : local_state.dialog_style,
            "user_pk": local_state.dialog_style === undefined ? undefined : local_state.user_pk
        }
        console.log("state found", default_state)
    }

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