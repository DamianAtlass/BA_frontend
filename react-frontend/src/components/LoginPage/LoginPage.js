import React, {useEffect} from "react"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";
import "../../css/LoginPage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import MainContainer from "../MainContainer";
import {useUserDataUpdate} from "../contexts/UserDataContext";
import {FRONTEND_API_URL, BACKEND_API_URL, ALLOWED_EMAIL_SUFFIXES, ADMIN_USERNAME} from "../../env";


export default function LoginPage(){
    const setUserData = useUserDataUpdate()

    useEffect(()=>{
        setUserData({type: "update", payload: {token: undefined}})
        console.log("FRONTEND_API_URL", FRONTEND_API_URL)
        console.log("BACKEND_API_URL", BACKEND_API_URL)
        console.log("ALLOWED_EMAIL_SUFFIXES", ALLOWED_EMAIL_SUFFIXES)
        console.log("ADMIN_USERNAME", ADMIN_USERNAME)
    },[])

    return (
        <MainContainer>
            <Card className="LoginPageCard align-content-center">
                <Container fluid >
                    <Row>
                        <Col className="justify-content-center" align="center">
                            <h1>Willkommen</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-evenly">
                        <Col align="center">
                            <CreateUserModal/>
                        </Col>
                        <Col align="center">
                            <LoginModal/>
                        </Col>
                    </Row>
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

                </Container>
            </Card>
        </MainContainer>
    )
}
