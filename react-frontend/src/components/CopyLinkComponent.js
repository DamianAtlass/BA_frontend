import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useUserData} from "./contexts/UserDataContext";
import Button from 'react-bootstrap/Button';
import {FRONTEND_API_URL} from "../env";


export default function CopyLinkComponent() {
    const userData = useUserData()

    let user_pk = userData.user_pk
    const user_pk_str_pad = user_pk.toString().padStart(3, '0')
    const customLink = `${FRONTEND_API_URL}login?h=${user_pk_str_pad}`

    return (
        <>
            <Row className="justify-content-evenly">
                <Col align="center">
                    {customLink}
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Button variant="success" onClick={() => {navigator.clipboard.writeText(customLink)}}>Copy Link</Button>
                </Col>
            </Row>
        </>
    )

}