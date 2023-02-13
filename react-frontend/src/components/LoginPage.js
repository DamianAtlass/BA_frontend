import React from "react"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";
import "./css/LoginPage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


export default function LoginPage(){
    return (
        <Card>
            <Container fluid className="WelcomePage" >
                <Row className="justify-content-center">
                    <Col className="justify-content-center" align="center">
                        <h1>Welcome</h1>
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
            </Container>
        </Card>
    )
}
