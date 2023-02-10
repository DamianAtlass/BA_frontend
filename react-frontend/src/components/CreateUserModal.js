import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";

export default function CreateUserModal() {
    const [show, setShow] = useState(false);
    const [response_message, set_response_message] = useState("")

    let username = useRef("")
    let email = useRef("")
    let password= useRef("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function foo(){
        console.log(username.current.value, email.current.value, password.current.value)
    }


    async function sendusercredentials(){
        set_response_message("")
        //TODO: validate input data here
        const data = {
            "alias": username.current.value,
            "email": email.current.value,
            "password": password.current.value,
        }
        try {
            let res = await axios.post(API_URL +"accounts/", data).then((response) => {
            set_response_message(response.data["success-message"])
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
                Create User
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*additional info here*/}
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                ref={email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="username"
                                          ref={username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="***********"
                                          ref={password}
                            />
                        </Form.Group>

                    </Form>
                    <p>{response_message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={foo} >Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
