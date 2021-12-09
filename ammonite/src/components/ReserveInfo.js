import React, { Component } from 'react'
import { cancleReserve } from "../actions/reserve";
import { connect } from "react-redux";

class ReserveInfo extends Component {
  constructor(props){
    super(props);

    this.updateButton = this.updateButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  updateButton() {
    window.location.href = `/reserve/${this.props.data.reserve_id}`
  }

  deleteButton() {
    this.props
      .cancleReserve(this.props.data.reserve_id)
      .then(() => {
        window.location.href = "/info";
      });
  }
  
  render() {
    const date = new Date(this.props.data.date);
    const timeString_KR = date.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
    const time = ("" + this.props.data.time).slice(0,5)
    return (
      <div style={{display: "flex"}}>
        <div style={{width: "365px"}}>
          <div className="bold" style={{fontSize: "18px"}}>{this.props.data.v_name}</div>
          <table className="reserve_info_table">
            <tr>
              <td className="bold" style={{width: "50px"}}>병원</td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td className="bold">일시</td>
              <td>{timeString_KR.slice(0, 13)} {time}</td>
            </tr>
            <tr>
              <td className="bold">주소</td>
              <td>{this.props.data.address}</td>
            </tr>
          </table>
        </div>
        <div>
          <button className="vacine_btn update" onClick={this.updateButton}>변경하기</button>
          <button className="vacine_btn cancel" onClick={this.deleteButton}>취소하기</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {cancleReserve})(ReserveInfo);
