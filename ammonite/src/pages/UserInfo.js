import { Component } from "react";
import { connect } from "react-redux";
import { infoUser } from "../actions/members";
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      name : "",
      phone: "",
      first: "",
      second: "",
    }
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
  
  render(){
    return(
      <div>
        <h2 className="page_title">내 정보</h2>
        <div className="signup_container" style={{width: "800px", height: "500px"}}>
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
              <th>1차 예약 정보</th>
              <td className="reserve_table">{this.state.first ? "정보 가져오기" : "-"}</td>
            </tr>
            <tr>
              <th>2차 예약 정보</th>
              <td className="reserve_table">{this.state.second ? "정보 가져오기" : "-"}</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(null, {infoUser})(UserInfo);
