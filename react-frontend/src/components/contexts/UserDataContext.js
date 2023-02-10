import React, {useState, useContext} from "react";

const UserDataContext = React.createContext()
const UserDataUpdateContext = React.createContext()

export function useUserData(){
    return useContext(UserDataContext)
}
export function useUserDataUpdate(){
    return useContext(UserDataUpdateContext)
}

export function UserContext({children}){

    const default_state = {
        "username": "defaultDebuggingUsername",
        "current_node": -1,

    }
    const [userData, setUserData] = useState(default_state)

    function changeUserData(newUserData){
        for (const [key, value] of Object.entries(newUserData)) {
            if (userData.hasOwnProperty(key)){
                const updated_state = {...userData}
                updated_state[key] = value
                setUserData(updated_state)
            } else {
                console.log("No prop", key, "!")
            }
        }


    }


    return(
        <UserDataContext.Provider value={userData}>
            <UserDataUpdateContext.Provider value={changeUserData}>
                {children}
            </UserDataUpdateContext.Provider>
        </UserDataContext.Provider>
    )
}