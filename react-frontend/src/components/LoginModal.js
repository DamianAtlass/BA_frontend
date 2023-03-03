import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserDataUpdate} from "./contexts/UserDataContext";
import {findFormErrorsLogin} from "../validateInput";
import {BACKEND_API_URL, ADMIN_USERNAME} from "../env";

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
        sendLoginCredentials()
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
                setResponseMessage(response.data["success-message"])
                const username = response.data["username"]

                console.log(response.data)
                setVerificationNeeded(false)
                setUserData({"type": "update", "payload": {
                        "username": username,
                        "dialog_style": response.data["dialog_style"],
                        "completed_dialog": response.data["completed_dialog"],
                        "completed_survey": response.data["completed_survey"],
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
            <Button variant="primary" onClick={handleShow}>
                Log in
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="username"
                                          placeholder="Your username"
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
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>Log in</Button>


                </Modal.Footer>
            </Modal>
        </>
    );
}
