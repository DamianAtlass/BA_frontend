import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/InputField.css"


export default function InputField({handleSubmit, defaultInput}) {

    return (
        <div class ="InputField-container">
            <form>
                <input type="text" required readOnly placeholder="Select a message" value={defaultInput}/>
            </form>

            <button onClick={handleSubmit}>Button</button>

        </div>
    )

}