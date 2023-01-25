import React from "react"
import CreateUserModal from "./CreateUserModal";
import LoginModal from "./LoginModal";
import "./css/WelcomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


export default function WelcomePage(){
    return (
        <Card>
            <Container fluid className="WelcomePage" >
                <Row flex className="Row justify-content-center">
                    <Col className="justify-content-center" align="center">
                        <h1>Welcome</h1>
                    </Col>
                </Row>
                <Row className="Row justify-content-evenly">
                    <Col align="center">
                        <CreateUserModal/>

                    </Col><Col align="center">
                    <LoginModal/>
                </Col>
                </Row>
            </Container>
        </Card>
    )
}
