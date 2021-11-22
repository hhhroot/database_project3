import { Component } from "react";

class VacineInfo extends Component {
  render(){
    return(
      <div>
        <h2 className="page_title">백신 정보</h2>
        <div className="main_container" style={{display: "block"}}>
          <div className="sub_container margin-center" style={{backgroundColor: "gray", height: "70px"}}>
            모더나
          </div>
          <div className="sub_container margin-center" style={{backgroundColor: "skyblue", height: "70px"}}>
            화이자
          </div>
          <div  className="sub_container margin-center" style={{backgroundColor: "green", height: "70px"}}>
            얀센
          </div>
        </div>
      </div>
    )
  }
}

export default VacineInfo;
