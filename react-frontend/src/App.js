import './App.css';
import WelcomePage from "./components/WelcomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return(
      <Container className="">
          <Row className="justify-content-md-center ">
              <Col md="auto">
                  <WelcomePage/>
              </Col>
          </Row>
      </Container>

  )
}

export default App;
