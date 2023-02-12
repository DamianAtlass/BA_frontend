import './App.css';
import WelcomePage from "./components/WelcomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import OverviewPage from "./components/OverviewPage";
import {UserContext} from "./components/contexts/UserDataContext";
import RedirectToLogin from "./components/RedirectToLogin";
import ChatPage from "./components/ChatPage";
function App() {
  return(

      <UserContext>
          <Container fluid className="MainContainer">
              <Row className="justify-content-center" >
                  <Col sx={12} sm={10} md={8}>
                      <BrowserRouter>
                          <RedirectToLogin>
                              <Routes>
                                  <Route path="welcome" element={ <WelcomePage/> }/>
                                  <Route path="overview" element={ <OverviewPage/> }/>
                                  <Route path="chat" element={ <ChatPage/> }/>
                                  <Route index element={ <Navigate to={"/welcome"}/> }/>
                                  <Route path="*"  element={<div> oh no, you're lost! 404 </div>} />
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
