import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";

export default function NewModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const email = useRef()
    const password = useRef()

    const what = "WHAT"

    function foo(){
        axios.post(API_URL+"ok/")
        console.log(password.current.value)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={foo}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
