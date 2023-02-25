import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";

export default function CreateUserModal() {
    const [show, setShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("")

    const [invitedBy, setInvitedBy] = useState(null)

    let username = useRef("")
    let email = useRef("")
    let password= useRef("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search)
        let invited_pk = queryParams.get("invitedby")

        const fetchData = async () => {
            const res = await axios.get(API_URL + `invite/${invited_pk}/`);
            setInvitedBy(res.data["inviting_user"])
            return res
        }

        // call the function
        if(invited_pk){
            fetchData()
                // make sure to catch any error
                .catch((err)=>{
                    console.log(err)
                    console.log("ERROR:", err.response.data.error)
                    setInfoMessage(err.response.data["error-message"])
                });
        }

    },[])



    async function sendusercredentials(){
        //TODO: validate input data here
        const data = {
            "username": username.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "invitedBy": invitedBy,
        }
        try {
            let res = await axios.post(API_URL +"accounts/", data).then((response) => {
            setInfoMessage(response.data["success-message"])
            });

        } catch (err) {
            //TODO: check for verification

            const err_msg = err.response.data["error"]
            console.log(err_msg)
            setInfoMessage(err.response.data["error-message"])
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
                        {invitedBy && `You've been invited by ${invitedBy}!`}
                    <p>{infoMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendusercredentials} >Create Account</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
