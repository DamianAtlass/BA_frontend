import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";
import {useNavigate} from "react-router-dom";
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";

export default function LoginModal() {
    const [show, set_show] = useState(false);
    const [show_button, set_show_button] = useState(false)
    const [response_message, set_response_message] = useState("")
    const navigate = useNavigate()

    const UserData = useUserData()
    const setUserData = useUserDataUpdate()


    const handleClose = () => set_show(false);
    const handleShow = () => set_show(true);

    const username = useRef()
    const password = useRef()



    async function sendLoginCredentials(){
        set_response_message("")
        const data = {
            "username": username.current.value,
            "password": password.current.value,
        }
        try {
            let res = await axios.post(API_URL +"login/", data).then((response) => {
                set_response_message(response.data["success-message"])
                const username = response.data["username"]

                setUserData({"type": "update", "payload": {
                        "username": username,
                        "dialog_style": response.data["dialog_style"],
                        "user_pk": response.data["user_pk"]
                    }})


                navigate("/overview")
            });

        } catch (err) {
            //TODO: check for verification

            const err_msg = err.response.data["error"]
            console.log(err_msg)
            set_response_message(err.response.data["error-message"])

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

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control ref={password}
                                          type="password"
                                          placeholder="***********"
                            />
                        </Form.Group>

                    </Form>
                    <p>{response_message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    { show_button ?
                        <Button variant="primary" >Understood1</Button>
                        : null }

                    <Button variant="primary" onClick={sendLoginCredentials}>Understood</Button>


                </Modal.Footer>
            </Modal>
        </>
    );
}
