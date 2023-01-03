import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";

export default function LoginModal() {
    const [show, set_show] = useState(false);
    const [show_button, set_show_button] = useState(false)
    const [error_message, set_error_message] = useState("")


    const handleClose = () => set_show(false);
    const handleShow = () => set_show(true);

    const email = useRef()
    const password = useRef()


    async function sendLoginCredentials(){
        set_error_message("")
        const data = {
            "username": email.current.value,
            "password": password.current.value,
        }
        try {
            let res = await axios.post(API_URL +"accounts/", data);

        } catch (err) {
            //TODO: check for verification

            const err_msg = err.response.data["error"]
            console.log(err_msg)
            set_error_message(err.response.data["error-message"])

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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={email}
                                          type="email"
                                          placeholder="name@example.com"
                                          autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={password}
                                          type="password"
                                          placeholder="***********"
                            />
                        </Form.Group>

                    </Form>
                    <p>{error_message}</p>
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
