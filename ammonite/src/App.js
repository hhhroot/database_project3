import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link , Routes} from "react-router-dom";

import Nav from './components/Nav';
import Footer from './components/Footer';

import { Main, Login, Reserve, SignUp, TransitionInfo, UserInfo, VacineInfo, ViewReserve, UserUpdate, ReserveUpdate} from './pages/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Nav/>
        <Routes>
          <Route exact path="/" element ={<Main/>}/> 
          <Route exact path="/signup" element ={<SignUp/>}/> 
          <Route exact path="/login" element ={<Login/>}/> 
          <Route exact path="/reserve" element ={<Reserve/>}/> 
          <Route exact path="/reserve/:reserve_num" element ={<ReserveUpdate/>}/> 
          <Route exact path="/transition" element ={<TransitionInfo/>}/> 
          <Route exact path="/info" element ={<UserInfo/>}/> 
          <Route exact path="/vacine" element ={<VacineInfo/>}/> 
          <Route exact path="/transition_info" element ={<ViewReserve/>}/> 
          <Route exact path="/update" element = {<UserUpdate/>}/>
        </Routes>
        <Footer/>
      </Router>
    )
  }
}

export default App;
