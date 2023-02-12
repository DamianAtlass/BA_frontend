import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/InputField.css"


export default function InputField({handleSubmit, defaultInput}) {

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="nopadding">
                    <form>
                        <input type="text" required readOnly placeholder="Select a message" value={defaultInput}/>
                    </form>
                </Col>
                <Col className="nopadding">
                    <button onClick={handleSubmit}>Button</button>
                </Col>
            </Row>

        </Container>
    );
}