import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserDataUpdate} from "../contexts/UserDataContext";
import {findFormErrorsLogin} from "../../validateInput";
import {BACKEND_API_URL, ADMIN_USERNAME} from "../../env";
import "../../css/LoginModal.css"

export default function LoginModal() {
    const [show, setShow] = useState(false);
    const [verificationNeeded, setVerificationNeeded] = useState(false);
    const [responseMessage, setResponseMessage] = useState("")
    const navigate = useNavigate()

    const [ formState, setFormState ] = useState({})
    const [ errorsState, setErrorsState ] = useState({})

    const [adminLogin, setAdminLogin] = useState(false)

    const setUserData = useUserDataUpdate()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /*updates formState fields*/
    const setField = (field, value) => {
        setFormState({
            ...formState,
            [field]: value
        })
        // remove old errors
        setErrorsState({})
    }
    /*can be used to check input in real time*/
    useEffect(()=>{
        setAdminLogin(formState.username===ADMIN_USERNAME)
        checkForErrors()
    },[formState])

    /* handels result of user input check and sets error messages
    * returns TRUE or FALSE of input is OK or not*/
    function checkForErrors(){
        const newErrors = findFormErrorsLogin(formState, verificationNeeded, adminLogin)

        if ( Object.keys(newErrors).length > 0 ) {
            setErrorsState(newErrors)
            return false
        } else {
            return true
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log("foo")
        if(adminLogin){
            sendAdminLoginCredentials()
        } else {
            sendLoginCredentials()
        }
    }

    async function sendAdminLoginCredentials(){

        if(!checkForErrors()){
            console.log("BAD INPUT")
            return null
        }

        setResponseMessage("")
        const data = {
            "username": formState.username,
            "admin_password": formState.admin_password,
        }

        try {
            let res = await axios.post(BACKEND_API_URL +"adminlogin/", data).then((response) => {
                setResponseMessage(response.data["success-message"])
                const username = response.data["username"]

                console.log(response.data)
                setUserData({"type": "update", "payload": {
                        "username": username,
                        "dialog_style": undefined,
                        "completed_dialog": undefined,
                        "completed_survey_part1": undefined,
                        "user_pk": undefined,
                        "token": response.data["token"]
                    }})

                navigate("/admin")
            });

        } catch (err) {
            let status = err.response.status
            let error_specific = err.response.data.error
            let response_message = err.response.data["error-message"]

            console.log("status code :", status)
            console.log("error_specific :", error_specific)
            switch (error_specific){
                case "USER_NOT_FOUND":
                    setResponseMessage(response_message)
                    break
                case "WRONG_CREDENTIALS":
                    setResponseMessage(response_message)
                    break
            }

        }
    }

    /*send credentials to server to log in, checks input beforehand*/
    async function sendLoginCredentials(){

        if(!checkForErrors()){
            console.log("BAD INPUT")
            return null
        }

        setResponseMessage("")
        const data = {
            "username": formState.username,
            "verification_code": verificationNeeded ? formState.verification_code : undefined,
        }

        try {
            let res = await axios.post(BACKEND_API_URL +"login/", data).then((response) => {
                console.log("here")
                setResponseMessage(response.data["success-message"])
                const username = response.data["username"]

                console.log(response.data)
                setVerificationNeeded(false)
                setUserData({"type": "update", "payload": {
                        "username": username,
                        "dialog_style": response.data["dialog_style"],
                        "completed_dialog": response.data["completed_dialog"],
                        "completed_survey_part1": response.data["completed_survey_part1"],
                        "completed_survey_part2": response.data["completed_survey_part2"],
                        "user_pk": response.data["user_pk"],
                    }})


                navigate("/overview")
            });

        } catch (err) {
            let status = err.response.status
            let error_specific = err.response.data.error
            let response_message = err.response.data["error-message"]

            console.log("status code :", status)
            console.log("error_specific :", error_specific)
            switch (error_specific){
                case "USER_NOT_FOUND":
                    setResponseMessage(response_message)
                    break
                case "VERIFICATION_NECESSARY":
                    setVerificationNeeded(true)
                    setResponseMessage(response_message)
                    break
                case "WRONG_VERIFICATION_CODE":
                    setResponseMessage(response_message)
                    break
                case "WRONG_CREDENTIALS":
                    setResponseMessage(response_message)
                    break
            }

        }
    }

    return (
        <>
            <Button id="LoginModalButton" onClick={handleShow}>
                Login
            </Button>

            <Modal
                className="LoginModal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Benutzername:</Form.Label>
                            <Form.Control type="username"
                                          placeholder="Benutzername"
                                          autoFocus
                                          onChange={ e => setField('username', e.target.value) }
                                          isInvalid={ !!errorsState.username }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.username }
                            </Form.Control.Feedback>
                        </Form.Group>

                        {adminLogin &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Admin password:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="..."
                                              onChange={ e => setField('admin_password', e.target.value) }
                                              isInvalid={ !!errorsState.admin_password }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errorsState.admin_password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        }

                        {verificationNeeded &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>6-digit Authentication Code:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="123456"
                                              onChange={ e => setField('verification_code', e.target.value) }
                                              isInvalid={ !!errorsState.verification_code }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errorsState.verification_code}
                                </Form.Control.Feedback>
                            </Form.Group>
                        }

                    </Form>
                    <p>{responseMessage}</p>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Schlie??en
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>Login</Button>


                </Modal.Footer>
            </Modal>
        </>
    );
}
