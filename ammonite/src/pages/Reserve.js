import { Component } from "react";

class Reserve extends Component {
  render(){
    return(
      <div>
        <h2 className="page_title">백신 예약</h2>
        <div className="main_container" style={{display: "block"}}>
          <div className="sub_container margin-center" style={{backgroundColor: "gray", height: "70px"}}>
            이름
          </div>
          <div className="sub_container margin-center" style={{backgroundColor: "skyblue", height: "70px"}}>
            주민등록번호
          </div>
          <div  className="sub_container margin-center" style={{backgroundColor: "green", height: "70px"}}>
            휴대폰 번호
          </div>
          <div className="sub_container margin-center" style={{backgroundColor: "purple", height: "70px"}}>
            백신 및 의료기관, 예약일시 선택
          </div>
          <div className="margin-center" style={{display: "flex", justifyContent:"center"}}>
            <button style={{margin: "0 100px"}}>예약</button>
            <button style={{margin: "0 100px"}}>취소</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Reserve;
