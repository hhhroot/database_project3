import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser, loginUser } from "../actions/members";
import "./SignUp.css";
import { Link } from "react-router-dom";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRRN1 = this.onChangeRRN1.bind(this);
        this.onChangeRRN2 = this.onChangeRRN2.bind(this);
        this.onChangeForeigner = this.onChangeForeigner.bind(this);
        this.onChangeBdate = this.onChangeBdate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePhone1 = this.onChangePhone1.bind(this);
        this.onChangePhone2 = this.onChangePhone2.bind(this);
        this.onChangePhone3 = this.onChangePhone3.bind(this);

        this.saveUser = this.saveUser.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.loginUserBtn = this.loginUserBtn.bind(this);

        this.state = {
            name: "",
            RRN1: "",
            RRN2: "",
            foreigner: false,
            Bdate: new Date(),
            gender: "",
            phone1: "010",
            phone2: "",
            phone3: "",

            success: false,
            retry: false,
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

    onChangeForeigner(e) {
        if (e.target.value === "korean"){
            this.setState({
                foreigner: false,
            })
        }else {
            this.setState({
                foreigner: true,
            })
        }
    }

    onChangeBdate(e) {
        this.setState({
            Bdate: e.target.value,
        })
    }

    onChangeGender(e) {
        if (e.target.value === "male"){
            this.setState({
                gender: "M",
            })
        }else {
            this.setState({
                gender: "F",
            })
        }
    }

    onChangePhone1(e) {
        this.setState({
          phone1: e.target.value,
        })
    }

    onChangePhone2(e) {
        this.setState({
          phone2: e.target.value,
        })
    }

    onChangePhone3(e) {
        this.setState({
          phone3: e.target.value,
        })
    }


    saveUser(){
        const { name, RRN1, RRN2, foreigner, Bdate, gender, phone1, phone2, phone3 } = this.state;

        this.props
            .createUser(name, RRN1, RRN2, foreigner, Bdate, gender, phone1, phone2, phone3)
            .then((data) => {
                const  result = data["message"];

                if (result === "success"){
                    this.setState({
                        success : true,
                    })
                }
                else {
                    this.setState({
                        retry : true,
                    })
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    clearInput(){
      this.setState({
        name: "",
        RRN1: "",
        RRN2: "",
        foreigner: false,
        Bdate: new Date(),
        gender: "",
        phone1: "010",
        phone2: "",
        phone3: "",

        success: false,
        retry: false,
      })
    }

    loginUserBtn(){
      const name = this.state.name;
      const RRN1 = this.state.RRN1;
      const RRN2 = this.state.RRN2;
  
      this.props
        .loginUser(name, RRN1, RRN2)
        .then((data) => {
          // 성공시 토큰을 sessionStorage 저장
          if (data.token){
            sessionStorage.setItem("token", data.token);
            window.location.href = "/reserve";
          }
          else {
            this.setState({error: true});
          }
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
          <div>
            <h2 className="page_title">회원가입</h2>
            <div className="signup_container">
              {
                // 가입 완료한 경우
                this.state.success ? (
                <div className="popup_box">
                  <div className="signup_success_box">
                    <p className="signup_message">가입이 완료되었습니다.</p>
                    
                    {/* 로그인 처리 */}
                    <button className="signup_btn" onClick={this.loginUserBtn} style={{margin: "50px 0 0 150px"}}>백신 예약하기</button>
                  </div>
                </div>) : 

                // 가입 실패한 경우
                
                this.state.retry ?
                (
                <div className="popup_box">
                  <div className="signup_success_box">
                    <p className="signup_message">이미 존재하는 회원입니다.</p>
                    <div style={{margin: "50px 0 0 60px"}}>
                      <button className="signup_btn" onClick={this.clearInput} style={{margin: "0 40px 0 0"}}>다시 입력하기</button>
                    
                      <Link to="/login" className="signup_btn link_btn">백신 예약하기</Link>

                    </div>
                  </div>
                </div>) : ''
              }
                <div>
                  <table className="signup_table">
                    <tr>
                      <th>이름</th>
                      <td><input type="text" name="name" value={this.state.name} onChange={this.onChangeName}></input></td>
                      </tr>
                      <tr>
                      <th>주민등록번호</th>
                      <td>
                        <input type="text" name="RRN1" maxLength="6" style={{width:"80px"}} value={this.state.RRN1} onChange={this.onChangeRRN1}></input>
                        &nbsp;-&nbsp;<input type="password" name="RRN2" maxLength="7" style={{width:"90px"}} value={this.state.RRN2} onChange={this.onChangeRRN2}></input>
                      </td>
                    </tr>
                    <tr>
                      <th>내외국인</th>
                      <td onChange={this.onChangeForeigner}>
                      <input type="radio" name="foreign" id="korean" value="korean" style={{width:"25px"}}></input>
                      <label htmlFor="korean" style={{width:"100px"}}>내국인</label>
                      <input type="radio" name="foreign" id="foreign" value="foreign" style={{width:"25px"}}></input>
                      <label htmlFor="foreign" style={{width:"100px"}}>외국인</label>
                      </td>
                    </tr>
                    <tr>
                      <th>생일</th>
                      <td><input type="date" name="name" onChange={this.onChangeBdate} value={this.state.Bdate}></input></td>
                    </tr>
                    <tr>
                      <th>성별</th>
                      <td onChange={this.onChangeGender}>
                      <input type="radio" name="gender" id="male" value="male" style={{width:"25px"}}></input>
                      <label htmlFor="male" style={{width:"100px"}}>남</label>
                      <input type="radio" name="gender" id="female" value="female" style={{width:"25px"}}></input> 
                      <label htmlFor="female" style={{width:"100px"}}>여</label>
                      </td>
                    </tr>
                    <tr className="phone_table">
                      <th>휴대전화</th>
                      <td>
                        <select name="phone_number1" style={{height:30}} onChange={this.onChangePhone1}>
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                        </select>
                        &nbsp;-&nbsp;<input className="phone_numbers" name="phone_number2" type="text" maxLength="4" value={this.state.phone2} onChange={this.onChangePhone2}></input>
                        &nbsp;-&nbsp;<input className="phone_numbers" name="phone_number3" type="text" maxLength="4" value={this.state.phone3} onChange={this.onChangePhone3}></input>
                      </td>
                    </tr>
                  </table>
                  <button className="signup_btn" onClick={this.saveUser}>가입하기</button>
                </div>
            </div>
          </div>
        )
    }
}

export default connect(null, {createUser, loginUser})(SignUp);