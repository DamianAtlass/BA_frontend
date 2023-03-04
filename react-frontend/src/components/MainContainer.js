import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/MainContainer.css"

export default function MainContainer({children}) {

    return (
        <Container fluid className="MainContainer">
            <Row className="justify-content-center">
                <Col sx={12} sm={10} md={8}>
                    {children}
                </Col>
            </Row>

        </Container>
    )

}