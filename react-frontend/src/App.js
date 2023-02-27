import './App.css';
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import OverviewPage from "./components/OverviewPage";
import {UserContext} from "./components/contexts/UserDataContext";
import RedirectToLogin from "./components/RedirectToLogin";
import ChatPage from "./components/ChatPage";
import SurveyComponent from "./components/SurveyComponent";
function App() {

  return(

      <UserContext>
          <Container fluid className="MainContainer">
              <Row className="justify-content-center">
                  <Col sx={12} sm={10} md={8}>
                      <BrowserRouter>
                          <RedirectToLogin>
                              <Routes>
                                  <Route path="login" element={ <LoginPage/> }/>
                                  <Route path="overview" element={ <OverviewPage/> }/>
                                  <Route path="survey" element={ <SurveyComponent/> }/>
                                  <Route path="chat" element={ <ChatPage/> }/>
                                  <Route index element={ <Navigate to={"/login"}/> }/>
                                  <Route path="*" element={<div> oh no, you're lost! 404  Go to <Link to="/login"> Login </Link></div>} />
                              </Routes>
                          </RedirectToLogin>
                      </BrowserRouter>
                  </Col>
              </Row>

          </Container>
      </UserContext>



  )
}

export default App;
