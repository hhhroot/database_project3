import { Component } from "react";

class TransitionInfo extends Component {
  render(){
    return(
      <div>
        <h2 className="page_title">추이 현황</h2>
        <div className="main_container">
          <div>
            <div className="sub_container" style={{backgroundColor: "gray"}}>
              백신 예약
            </div>
            <div className="sub_container" style={{backgroundColor: "skyblue"}}>
              백신 조회 / 변경 / 취소
            </div>
          </div>
          <div>
            <div  className="sub_container" style={{backgroundColor: "green", height: "260px"}}>
              각 백신 설명
            </div>
            <div className="sub_container" style={{backgroundColor: "purple", height: "260px"}}>
              추이 그래프
            </div>
            <div className="sub_container" style={{backgroundColor: "#ff9f9f", height: "260px"}}>
              추이 그래프
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TransitionInfo;
