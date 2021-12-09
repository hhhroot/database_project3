import React, { Component } from 'react'

export default class ReserveInfo extends Component {
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
          <button className="vacine_btn update">변경하기</button>
          <button className="vacine_btn cancel">취소하기</button>
        </div>
      </div>
    )
  }
}
