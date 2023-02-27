import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL } from "../constants";

export default function CreateUserModal() {
    const [show, setShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("")
    const [invitedBy, setInvitedBy] = useState(null)

    const [ formState, setFormState ] = useState({})
    const [ errorsState, setErrorsState ] = useState({})


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

    function handleSubmit(e){
        e.preventDefault()
        sendUserCredentials()
    }

    async function sendUserCredentials(){

        //validate input data
        if(!checkForErrors()){
            console.log("correct errors first!")
            return null
        }

        const data = {
            "username": formState.username,
            "email": formState.email,
            "password": formState.password,
            "invitedBy": invitedBy,
        }

        try {
            let res = await axios.post(API_URL +"accounts/", data).then((response) => {
            setInfoMessage(response.data["success-message"])
            });

        } catch (err) {
            const err_msg = err.response.data["error"]
            console.log(err_msg)
            setInfoMessage(err.response.data["error-message"])
        }
    }

    const setField = (field, value) => {
        console.log("setField()")
        setFormState({
            ...formState,
            [field]: value
        })
        // remove old errors
        setErrorsState({})

    }

    useEffect(()=>{
        checkForErrors()
    },[formState])


    function checkForErrors(){
        const newErrors = findFormErrors()

        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {

            setErrorsState(newErrors)
            console.log("INPUT BAD")
            return false
        } else {
            console.log("INPUT FINE")
            return true
        }
    }


    const findFormErrors = () => {
        console.log("findFormErrors()")
        const { username,password, email } = formState
        console.log("form:", formState)
        const newErrors = {}

        // name errors
        if ( !username || username === '' ) newErrors.username = 'cannot be blank!'
        else if ( username.length > 30 ) newErrors.username = 'username is too long!'

        // email errors
        if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
        else if ( email.length > 30 ) newErrors.email = 'email is too long!'

        // password errors
        if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
        else if ( password.length > 30 ) newErrors.password = 'password is too long!'



        console.log("newErrors:", newErrors)
        return newErrors
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
                                onChange={ e => setField('email', e.target.value) }
                                isInvalid={ !!errorsState.email }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.email }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="username"
                                          onChange={ e => setField('username', e.target.value) }
                                          isInvalid={ !!errorsState.username }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.username }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="***********"
                                          onChange={ e => setField('password', e.target.value) }
                                          isInvalid={ !!errorsState.password }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.password }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>

                        {invitedBy && `You've been invited by ${invitedBy}!`}
                    <p>{infoMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} >Create Account</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
