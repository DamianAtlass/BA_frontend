import './App.css';
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import OverviewPage from "./components/OverviewPage";
import {UserContext} from "./components/contexts/UserDataContext";
import RedirectToLogin from "./components/RedirectToLogin";
import ChatPage from "./components/ChatPage";
import SurveyComponent from "./components/SurveyComponent";
import AdminPage from "./components/AdminPage";
import { HashRouter } from "react-router-dom";
function App() {

  return(

      <UserContext>

                      <BrowserRouter>
                          <RedirectToLogin>
                              <Routes>
                                  <Route path="login" element={ <LoginPage/> }/>
                                  <Route path="overview" element={ <OverviewPage/> }/>
                                  <Route path="survey" element={ <SurveyComponent/> }/>
                                  <Route path="chat" element={ <ChatPage/> }/>
                                  <Route path="admin" element={ <AdminPage/> }/>
                                  <Route index element={ <Navigate to={"/login"}/> }/>
                                  <Route path="*" element={<div> oh no, you're lost! 404  Go to <Link to="/login"> Login </Link></div>} />
                              </Routes>
                          </RedirectToLogin>
                      </BrowserRouter>

      </UserContext>



  )
}

export default App;
