import './App.css';
import WelcomePage from "./components/WelcomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import OverviewPage from "./components/OverviewPage";

function App() {
  return(
      <BrowserRouter>
          <Container className="">
              <Row className="justify-content-md-center ">
                  <Col md="auto">
                      <Routes>
                          <Route path="welcome" element={ <WelcomePage/> }/>
                          <Route path="overview" element={ <OverviewPage/> }/>
                          <Route index element={ <Navigate to={"/welcome"}/> }/>
                          <Route path="*"  element={<div> oh no, you're lost! 404 </div>} />
                      </Routes>
                  </Col>
              </Row>

          </Container>
      </BrowserRouter>


  )
}

export default App;
