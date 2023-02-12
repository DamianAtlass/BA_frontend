import React, {useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import {v4} from 'uuid';

export default function ChoiceList({choices, handelChoiceSelection}) {
    function createChoiceButtons(){
        return choices.map(choice => {
            return (<Button key={v4()} onClick={()=>{handelChoiceSelection(choice["pk"])}} >{choice["content"]}</Button>)
        })
    }
    return (
        <Container fluid >
            <Row  className="justify-content-center">
                <Col className="nopadding">
                    {createChoiceButtons()}
                </Col>
            </Row>
        </Container>
    )
}