import { Component } from "react";
import { connect } from "react-redux";
import { infoUser, authUser, deleteUser } from "../actions/members";
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      name : "",
      phone: "",
      first: "",
      second: "",

      RRN1: "",
      RRN2: "",
      error: false,
    }

    this.onChangeRRN1 = this.onChangeRRN1.bind(this);
    this.onChangeRRN2 = this.onChangeRRN2.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  componentDidMount(){
    this.props
      .infoUser()
      .then((data) => {
        this.setState(
          {
            name: data["name"],
            phone: data["phone"],
            first: data["first"],
            second: data["second"],
          })
      })
      .catch((e) => {
          console.log(e);
      });
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

  updateButton() {
    this.props
      .authUser(this.state.RRN1, this.state.RRN2, this.state.name)
      .then((data) => {
        window.location.href = "/update";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteButton() {
    this.props
      .authUser(this.state.RRN1, this.state.RRN2, this.state.name)
      .then((data) => {
        if(data.code == 1){
          this.props.deleteUser();
          sessionStorage.removeItem("token")
          window.location.href = "/";
        }
        else this.setState({error: true});
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  clearInput() {
    this.setState({
      RRN1: "",
      RRN2: "",
    })
  }
  
  render(){
    return(
      <div>
        <h2 className="page_title">내 정보</h2>
        <div className="signup_container" style={{width: "800px", height: "580px"}}>
          <table className="signup_table">
            <tr>
              <th>이름</th>
              <td>{this.state.name}</td>
            </tr>
            <tr>
              <th>휴대전화</th>
              <td>{this.state.phone}</td>
            </tr>
            <tr>
              <th>주민등록번호</th>
              <td>
                <input type="text" name="RRN1" maxLength="6" style={{width:"80px"}} value={this.state.RRN1} onChange={this.onChangeRRN1}></input>
                &nbsp;-&nbsp;<input type="password" name="RRN2" maxLength="7" style={{width:"90px"}} value={this.state.RRN2} onChange={this.onChangeRRN2}></input>
              </td>
            </tr>
            <tr>
              <th>1차 예약 정보</th>
              <td className="reserve_table">{this.state.first ? "정보 가져오기" : "예약정보가 없습니다."}</td>
            </tr>
            <tr>
              <th>2차 예약 정보</th>
              <td className="reserve_table">{this.state.second ? "정보 가져오기" : "예약정보가 없습니다."}</td>
            </tr>
          </table>
          <button className="signup_btn" style={{margin: "0 0 20px 190px"}} onClick={this.updateButton}>정보 수정</button>
          <button className="signup_btn" style={{margin: "0 0 20px 130px"}} onClick={this.deleteButton}>회원 탈퇴</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {infoUser, authUser, deleteUser})(UserInfo);
