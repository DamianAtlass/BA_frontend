import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sendImage from '../../img/sendButton.png'
import "../../css/InputField.css"


export default function InputField({handleSubmit, defaultInput}) {

    return (
        <div className="InputField-container ">
            <form>
                <input type="text" required readOnly placeholder="Select a message" value={defaultInput}/>
            </form>
            <img onClick={handleSubmit} src={sendImage} alt="send"/>
        </div>
    )

}