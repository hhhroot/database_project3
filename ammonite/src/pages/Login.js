/* eslint no-restricted-globals: ["off"] */

import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/members";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";

class Login extends Component{
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRRN1 = this.onChangeRRN1.bind(this);
    this.onChangeRRN2 = this.onChangeRRN2.bind(this);
    this.loginUserBtn = this.loginUserBtn.bind(this);
    this.clearInput = this.clearInput.bind(this);

    this.state = {
      name : "",
      RRN1 : "",
      RRN2 : "",
      error : false,
    };
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value,
    })
  }

  onChangeRRN1(e) {
      this.setState({
          RRN1: e.target.value,
      })
  }

  onChangeRRN2(e) {
      this.setState({
          RRN2: e.target.value,
      })
  }

  clearInput(){
    this.setState({
      name : "",
      RRN1 : "",
      RRN2 : "",

      error : false,
    });
  }

  loginUserBtn(){
    const {name, RRN1, RRN2} = this.state;

    this.props
      .loginUser(name, RRN1, RRN2)
      .then((data) => {
        // 성공시 토큰을 sessionStorage 저장
        if (data.token){
          sessionStorage.setItem("token", data.token);
          window.location.href = "/";
        }
        else {
          this.setState({error: true});
        }
      })
      .catch((e) => {
          console.log(e);
      });
  }

  render(){
    return(
      <div>
        <h2 className="page_title">로그인</h2>
        {
          this.state.error ? 
          (
            <div className="popup_box">
              <div className="signup_success_box">
                <p className="signup_message">일치하는 정보가 존재하지 않습니다.</p>
                
                <button className="signup_btn" onClick={this.clearInput} style={{margin: "50px 0 0 150px"}}>다시 입력하기</button>
              </div>
            </div>
          ):''
        }
        
        <div className="login_container">
          <div className="login_box">
            <div style={{display: "flex"}}>
              <div className="user_input">
                <input type="text" name="name" placeholder="이름" style={{width:"225px", marginBottom: "10px"}} value={this.state.name} onChange={this.onChangeName}></input>
                <input type="text" name="RRN1" placeholder="911002" maxLength="6" style={{width:"100px"}} value={this.state.RRN1} onChange={this.onChangeRRN1}></input>
                &nbsp;-&nbsp;<input type="password" placeholder="1234567" name="RRN2" maxLength="7" style={{width:"110px"}} value={this.state.RRN2} onChange={this.onChangeRRN2}></input>
              </div>
              <button onClick={this.loginUserBtn}>로그인</button>
            </div>
            <div className="login_search">
              <a href="#">아이디 찾기</a>&nbsp;/&nbsp;
              <a href="#">비밀번호 찾기</a>
            </div>
          </div>
          <div className="login_signup">
            <p>회원가입을 하시면 다양하고 특별한<br/>혜택이 준비되어 있습니다.</p>
            <Link to="/signup" className="link_btn">회원가입</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {loginUser})(Login);