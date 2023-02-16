import React, {useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import {v4} from 'uuid';
import "./css/ChoiceList.css"

export default function ChoiceList({choices, handelChoiceSelection}) {
    function createChoiceButtons(){
        return choices.map(choice => {
            return (<button key={v4()} onClick={()=>{handelChoiceSelection(choice["pk"])}} >{choice["content"]}</button>)
        })
    }
    return (
        <Container className="" fluid>
            <Row  className="justify-content-center">
                <Col className="ChoiceList-container nopadding">
                    {createChoiceButtons()}
                </Col>
            </Row>
        </Container>
    )
}