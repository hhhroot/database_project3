import React, { Component } from 'react'
import { infoUser, updateUser } from "../actions/members";
import { connect } from "react-redux";

class UserUpdate extends Component {
  constructor(props){
    super(props);

    this.state = {
      name : "",
      phone1: "",
      phone2: "",
      phone3: "",
    }

    this.onChangePhone1 = this.onChangePhone1.bind(this);
    this.onChangePhone2 = this.onChangePhone2.bind(this);
    this.onChangePhone3 = this.onChangePhone3.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.updateButton = this.updateButton.bind(this);

  }

  componentDidMount(){
    this.props
      .infoUser()
      .then((data) => {
        const phones = data["phone"].split('-');
        this.setState(
          {
            name: data["name"],
            phone1: phones[0],
            phone2: phones[1],
            phone3: phones[2],
          })
      })
      .catch((e) => {
          console.log(e);
      });
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value,
    })
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

  updateButton() {
    const {name, phone1, phone2, phone3} = this.state;
    this.props
      .updateUser(name, phone1, phone2, phone3)
      .then((data) => {
        sessionStorage.setItem("token", data.token)
        window.location.href = "/info";
      })
  }

  render() {
    return (
      <div>
        <h2 className="page_title">정보 수정</h2>
        <div className="signup_container" style={{width: "500px", height: "250px"}}>
          <table className="signup_table">
            <tr>
              <th>이름</th>
              <td><input type="text" name="name" value={this.state.name} onChange={this.onChangeName}></input></td>
            </tr>
            <tr>
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
          <button className="signup_btn" style={{margin: "20px 0 20px 175px"}} onClick={this.updateButton}>수정하기</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {infoUser, updateUser})(UserUpdate);