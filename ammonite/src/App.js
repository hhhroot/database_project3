import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link , Routes} from "react-router-dom";

import Nav from './components/Nav';
import Footer from './components/Footer';

import { Main, Login, Reserve, SignUp, TransitionInfo, UserInfo, VacineInfo, ViewReserve} from './pages/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Nav/>
        <Link to="/reserve">Reserve</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/transition">TransitionInfo</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/info">UserInfo</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/vacine">VacineInfo</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/transition_info">ViewReserve</Link>&nbsp;&nbsp;&nbsp;

        <Routes>
          <Route exact path="/" element ={<Main/>}/> 
          <Route exact path="/signup" element ={<SignUp/>}/> 
          <Route exact path="/login" element ={<Login/>}/> 
          <Route exact path="/reserve" element ={<Reserve/>}/> 
          <Route exact path="/transition" element ={<TransitionInfo/>}/> 
          <Route exact path="/info" element ={<UserInfo/>}/> 
          <Route exact path="/vacine" element ={<VacineInfo/>}/> 
          <Route exact path="/transition_info" element ={<ViewReserve/>}/> 
        </Routes>
        <Footer/>
      </Router>
    )
  }
}

export default App;
