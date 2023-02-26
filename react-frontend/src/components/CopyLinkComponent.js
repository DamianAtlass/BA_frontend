import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import Button from 'react-bootstrap/Button';
//TODO export in .env
const FRONTEND_API = "http://localhost:3000/"


export default function CopyLinkComponent() {
    const userData = useUserData()

    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')
    const customLink = `${FRONTEND_API}login?invitedby=${user_pk_str_pad}`

    return (
        <>
            <Row className="justify-content-evenly">
                <Col align="center">
                    {customLink}
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Button variant="success" onClick={() => {navigator.clipboard.writeText(customLink)}}>Copy</Button>
                </Col>
            </Row>
        </>
    )

}