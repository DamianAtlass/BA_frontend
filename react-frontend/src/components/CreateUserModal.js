import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {findFormErrorsCreateUser} from "../validateInput";
import {BACKEND_API_URL} from "../env";
import "./css/CreateUserModal.css"

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
        let invited_pk = queryParams.get("h")

        const fetchData_check_inviting_user = async () => {
            const res = await axios.get(BACKEND_API_URL + `invite/${invited_pk}/`);
            setInvitedBy(res.data["inviting_user"])
            return res
        }

        // call the function
        if(invited_pk){
            fetchData_check_inviting_user()
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

    /*send credentials to server to create new user, checks input beforehand*/
    async function sendUserCredentials(){

        //validate input data
        if(!checkForErrors()){
            console.log("correct errors first!")
            return null
        }

        const data = {
            "username": formState.username,
            "email": formState.email,
            "invitedBy": invitedBy,
        }

        try {
            let res = await axios.post(BACKEND_API_URL +"accounts/", data).then((response) => {
            setInfoMessage(response.data["success-message"])
            });

        } catch (err) {
            const err_msg = err.response.data["error"]
            console.log(err_msg)
            setInfoMessage(err.response.data["error-message"])
        }
    }

    /*updates formState fields*/
    const updateField = (field, value) => {
        console.log("setField()")
        setFormState({
            ...formState,
            [field]: value
        })
        // remove old errors
        setErrorsState({})

    }

    /*can be used to check input in real time*/
    useEffect(()=>{
        //checkForErrors()
    },[formState])

    /* handels result of user input check and sets error messages
    * returns TRUE or FALSE of input is OK or not*/
    function checkForErrors(){
        const newErrors = findFormErrorsCreateUser(formState)

        if ( Object.keys(newErrors).length > 0 ) {
            setErrorsState(newErrors)
            return false
        } else {
            return true
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Account erstellen
            </Button>

            <Modal
                className="CreateUserModal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Account erstellen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*additional info here*/}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Emailadresse</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="name@beispiel-uni.de"
                                autoFocus
                                onChange={ e => updateField('email', e.target.value) }
                                isInvalid={ !!errorsState.email }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.email }
                            </Form.Control.Feedback>
                            <p className="form-description">Nutze deine universitäre Emailadresse umd dich zu verifizieren.
                                Sie wird nicht mit anderen geteilt und nur zu diesem Zweck verwendet, und um dich gegebenenfalls zu kontaktieren.</p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Benutzername"
                                          onChange={ e => updateField('username', e.target.value) }
                                          isInvalid={ !!errorsState.username }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errorsState.username }
                            </Form.Control.Feedback>
                            <p className="form-description">Nutzer die du einlädst können deinen Benutzernamen sehen, nicht änderbar!</p>
                        </Form.Group>
                    </Form>

                        {invitedBy && `Du wurdest eingeladen von ${invitedBy}!`}
                    <p>{infoMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Schließen
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} >Account erstellen</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
