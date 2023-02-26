import React, {useEffect, useState} from "react"
import {useUserData, useUserDataUpdate} from "./contexts/UserDataContext";
import Button from 'react-bootstrap/Button';
import {useNavigate, Navigate,  Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import CopyLinkComponent from "./CopyLinkComponent";


export default function OverviewPage(){
    const userData = useUserData()
    const updateUserData = useUserDataUpdate()

    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem('user')

        updateUserData({"type": "delete", "payload": { } })
        navigate("/login")
    }



    useEffect(()=>{
        console.log(userData.username)
    }, [])


    return (
    <Card className="LoginPageCard align-content-center">
        <Container fluid >
            <Row className="justify-content-center">
                <Col className="justify-content-center" align="center">
                    <h1>Hallo {userData.username}</h1>
                </Col>
            </Row>

            {userData.completed_survey &&
                <CopyLinkComponent/>
            }

            <Row className="justify-content-evenly">
                <Col align="center">
                    <Button onClick={() => {navigate("/chat")}}>
                        {userData.completed_dialog ? "View Interaction" : "Start Interaction"}
                    </Button>
                </Col>

                {(!userData.completed_survey && userData.completed_dialog) &&
                    <Col align="center">
                        <Button variant="success" onClick={()=>{navigate("/survey")}}> Survey </Button>
                    </Col>
                }
            </Row>

            {/*ACCORDION PART*/}
            <Row>
                <Col>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="secondary" onClick={logout}>Logout</Button>
                </Col>
            </Row>

        </Container>
    </Card>
    )
}
