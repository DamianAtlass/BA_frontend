import React, {useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatMessage from "./ChatMessage";
import {v4} from 'uuid';

export default function ChoiceList({choices, handleClick}) {
    return choices.map(choice => {
        return (<Button key={v4()} onClick={()=>{handleClick(choice["pk"])}} >{choice["content"]}</Button>)
    })
}