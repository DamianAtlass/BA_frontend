import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";
import {useNavigate} from "react-router-dom";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";

export default function LoginModal() {
    const [show, setShow] = useState(false);
    const [verificationNeeded, setVerificationNeeded] = useState(false);
    const [responseMessage, setResponseMessage] = useState("")
    const navigate = useNavigate()

    const UserData = useUserData()
    const setUserData = useUserDataUpdate()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const username = useRef()
    const password = useRef()
    const verification_code = useRef()





    async function sendLoginCredentials(){
        setResponseMessage("")
        const data = {
            "username": username.current.value,
            "password": password.current.value,
            "verification_code": verificationNeeded ? verification_code.current.value : undefined,
        }

        try {
            let res = await axios.post(API_URL +"login/", data).then((response) => {
                setResponseMessage(response.data["success-message"])
                const username = response.data["username"]

                setVerificationNeeded(false)
                setUserData({"type": "update", "payload": {
                        "username": username,
                        "dialog_style": response.data["dialog_style"],
                        "user_pk": response.data["user_pk"]
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
                    {/*additional info here*/}
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control ref={username}
                                          type="username"
                                          placeholder="Timmi1234"
                                          autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control ref={password}
                                          type="password"
                                          placeholder="***********"
                            />
                        </Form.Group>

                        {verificationNeeded &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>3-digit Authentication Code:</Form.Label>
                                <Form.Control ref={verification_code}
                                              type="text"
                                              placeholder="123456"
                                />
                            </Form.Group>
                        }

                    </Form>
                    <p>{responseMessage}</p>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={sendLoginCredentials}>Log in</Button>


                </Modal.Footer>
            </Modal>
        </>
    );
}
