import { Component } from "react";
import "./Reserve.css";
import Calender from "../components/Calender";
import HospitalItem from "../components/HospitalItem"
import VacineItem from "../components/VacineItem";
import hangjungdong from "../datas/hangjungdong"
import { connect } from "react-redux";
import { setLocation3, setYearMonth, selectHospital, setDay, getHospitalList, reserve } from '../actions/reserve';
import { infoUser } from "../actions/members"
import { Link } from "react-router-dom";

class Reserve extends Component {
  constructor(props){
    super(props);

    this.state = {
      date: new Date(),
      
      location1:"",
      location2:"",

      locationCode1:0,
      locationCode2:0,

      detailPage: false,
      error: false,
      success: false,

      first: true,
      second: false,

      login: true,
    }

    this.calendarNextButton = this.calendarNextButton.bind(this);
    this.calendarPrevButton = this.calendarPrevButton.bind(this);
    this.getOneWeekDays = this.getOneWeekDays.bind(this);
    this.onChangeLocation1 = this.onChangeLocation1.bind(this);
    this.onChangeLocation2 = this.onChangeLocation2.bind(this);
    this.onChangeLocation3 = this.onChangeLocation3.bind(this);
    this.errorClear = this.errorClear.bind(this);

    this.onClickHospital = this.onClickHospital.bind(this);

    this.Reserve = this.Reserve.bind(this);
  }

  componentDidMount() {
    const today = this.state.date;
    
    this.props.setStoreYearMonth(today.getFullYear(), today.getMonth())

    // 1차 예약되있는지 확인
    this.props
      .infoUser()
      // 1차만 했을 때
      .then((data) => {
        if (data["first"]){
          this.setState({
            first: false,
          })
        }
        // 2차까지 예약 다 했을 때
        if (data["second"]){
          this.setState({
            second: true,
          })
        }
      })
      .catch((e) => {
        //login 안했을 때
        this.setState({
          login: false,
        })
        console.log(e)
      });
  }

  getLastDateOfMonth(year, month) {
    const lastDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let lastDate = lastDateArray[month];

    if (year % 4 === 0 && month === 1) lastDate = 29;
    return lastDate;
  }

  getOneWeekDays() {
    const date = new Date(this.props.storeYear, this.props.storeMonth);
    const startDay = date.getDay();
    const lastDate = this.getLastDateOfMonth(this.props.storeYear, this.props.storeMonth);

    const days = [], month = [];

    for (let i = 0, j = 1; i < 42; i++){
      let tempDict = {}

      if (i >= startDay && j <= lastDate){
        tempDict["value"] = j;
        if (j == this.props.storeDay) tempDict["selected"] = true;
        
        j++;
      }
      days[i] = tempDict;
    }

    month.push(days.slice(0, 7));
    month.push(days.slice(7, 14));
    month.push(days.slice(14, 21));
    month.push(days.slice(21, 28));
    month.push(days.slice(28, 35));
    month.push(days.slice(35));

    return(month);
  }

  calendarNextButton() {
    let year, month;

    if (this.props.storeMonth == 11){
      year = this.props.storeYear + 1;
      month = 0;
    }
    else {
      year = this.props.storeYear;
      month = this.props.storeMonth + 1;
    }

    this.props.setStoreYearMonth(year, month)
  }

  calendarPrevButton() {
    let year, month;

    if (this.props.storeMonth == 0){
      year = this.props.storeYear - 1;
      month = 11;
    }
    else {
      year = this.props.storeYear;
      month = this.props.storeMonth - 1;
    }

    this.props.setStoreYearMonth(year, month)
  }

  onChangeLocation1(e) {
    const selectedIndex = e.target.selectedIndex;

    this.setState({
      location1: e.target.options[selectedIndex].innerText,
      locationCode1: e.target.value,
    })

    this.clearDatas()
  }

  onChangeLocation2(e) {
    const selectedIndex = e.target.selectedIndex;

    this.setState({
      location2: e.target.options[selectedIndex].innerText,
      locationCode2: e.target.value,
    })

    this.clearDatas()
  }

  onChangeLocation3(e) {
    const selectedIndex = e.target.selectedIndex;

    this.props.setStoreLocation3(e.target.options[selectedIndex].innerText)
  }

  onClickHospital(index) {
    this.props.selectHospital(index)
  }

  clearDatas() {
    this.props.setStoreDay(0);
    this.props.setStoreHospitalList("", "1999-11-11");
    this.props.setSelectedHospital(0);
    this.props.setStoreLocation3("");
  }

  errorClear() {
    this.setState({
      error: false,
    })
  }

  Reserve(){
    const date = `${this.props.storeYear}-${this.props.storeMonth + 1}-${this.props.storeDay}`;

    const hospitalID = this.props.storeSelectedHospital;

    // 모든 조건이 충족하지 않는다면 error
    if (this.props.storeDay != 0 && hospitalID != 0 && this.props.storeSeletedVacine != -1 && this.props.storeLocation3 != ""){
      const vacineName = this.props.storeVacineList[this.props.storeSeletedVacine].v_name;
      const vacineTime = this.props.storeVacineList[this.props.storeSeletedVacine].time;

      const number = this.state.first ? 1 : 2;

      this.props
        .reserve(hospitalID, vacineName, vacineTime, date, number)
        .then((data) => {
          this.setState({
            success: true,
          })
        })
        .catch((e) => {
          console.log(e);
        })

      this.clearDatas();
      window.location.href = "/";
    } else {
      this.setState({error: true});
    }
  }

  render(){
    return(
      <div>
        {this.state.second ? (
          <div className="popup_box">
          <div className="signup_success_box">
            <p className="signup_message">이미 2차 백신까지 예약을 완료 하셨습니다.</p>
            <div style={{margin: "50px 0 0 60px"}}>
              <Link to="/" className="signup_btn link_btn" style={{margin: "0 40px 0 0"}}>홈으로</Link>
              <Link to="/info" className="signup_btn link_btn">내 정보</Link>

            </div>
          </div>
        </div>
        ) : ""}

        {this.state.error ? (
          <div className="popup_box">
          <div className="signup_success_box">
            <p className="signup_message">모든 값을 제대로 선택 해 주세요.</p>
            <div style={{margin: "50px 0 0 60px"}}>
            <button className="signup_btn" onClick={this.errorClear} style={{margin: "0 0 0 90px"}}>확인</button>
            </div>
          </div>
        </div>
        ) : ""}

        {this.state.login ? "" : (
            <div className="popup_box">
            <div className="signup_success_box">
              <p className="signup_message">로그인되어 있지 않습니다.</p>
              <div style={{margin: "50px 0 0 60px"}}>
              <Link to="/login" className="signup_btn link_btn" style={{margin: "0 40px 0 90px"}}>로그인</Link>
              </div>
            </div>
          </div>
        )}
        
        <h2 className="page_title">백신 예약{this.state.first ? " (1차)" : " (2차)"}</h2>
        <div className="main_container" style={{display: "block", paddingTop: "10px", paddingBottom: "30px"}}>
          <div id="area">
            <div>
              <span>광역시 / 도 : </span>
              <select id="sido" onChange={this.onChangeLocation1}>
                <option value="">선택</option>
                {
                  hangjungdong.sido.map((dict) => {
                    return <option value={dict.sido}>{dict.codeNm}</option>
                  })
                }
              </select>
            </div>
            <div>
              <span>시 / 군 / 구 : </span>
              <select id="sigungu" onChange={this.onChangeLocation2}>
                <option value="">선택</option>
                {
                  hangjungdong.sigugun.map((dict) => {
                    if(this.state.locationCode1 == dict.sido)
                      return <option value={dict.sigugun}>{dict.codeNm}</option>
                  })
                }
              </select>
            </div>
            <div>
              <span>읍 / 면 / 동 : </span>
              <select id="dong" onChange={this.onChangeLocation3}>
                <option value="">선택</option>
                {
                  hangjungdong.dong.map((dict) => {
                    if(this.state.locationCode1 == dict.sido && this.state.locationCode2 == dict.sigugun)
                      return <option value={dict.dong}>{dict.codeNm}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div id="calendar">
              <div id="calendar_date">
                <button id="prev" onClick={this.calendarPrevButton}>&lt;</button>
                <span>{this.props.storeYear}년 {this.props.storeMonth + 1}월</span>
                <button id="next" onClick={this.calendarNextButton}>&gt;</button>
              </div>
              <Calender month={this.getOneWeekDays()}/>
            </div>

            <div>
              <div id="hospital_date">
                {this.props.storeDay == 0 ? "-" : `${this.props.storeYear}년 ${this.props.storeMonth + 1}월 ${this.props.storeDay}일`}
              </div>
              <div id="hospital_cotainer">
                <div>
                  <div className="reserver_hospital_title">병원</div>
                  {this.props.storeHospitalList.length == 0 ? 
                    (<div id="hospital_list" style={{textAlign: "center"}}><div style={{marginTop: "110px"}}></div>행정구역과<br></br>날짜를 다시<br></br>선택 해 주세요.</div>) : 
                    <HospitalItem hospitalList={this.props.storeHospitalList}      
                                  selectedIndex={this.props.storeSelectedHospital}/>
                  }
                </div>
                <div>
                  <div className="reserver_hospital_title">시간 & 백신</div>
                  {this.props.storeSelectedHospital == 0 ? <div id="reserve_time_container" style={{display: "block", textAlign: "center"}}><div style={{marginTop: "140px"}}></div>병원을 선택 해 주세요.</div> : 
                  <VacineItem vacineList={this.props.storeVacineList}
                              selectedIndex={this.props.storeSeletedVacine}/>
                  }
                </div>
              </div>
            </div>
          </div>
          <button className="signup_btn" onClick={this.Reserve} style={{margin: "50px 0 0 535px"}}>예약하기</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  storeDay: state.reserve.day,
  storeMonth: state.reserve.month,
  storeYear: state.reserve.year,
  storeHospitalList: state.reserve.hospitalList,
  storeSelectedHospital: state.reserve.selectedHospital,
  storeVacineList: state.reserve.vacineList,
  storeSeletedVacine: state.reserve.seletedVacine,
  storeLocation3: state.reserve.location3,
})

const mapDispatchToProps = (dispatch) => ({
  setStoreYearMonth: (year, month) => dispatch(setYearMonth(year, month)),
  setStoreLocation3: (name) => dispatch(setLocation3(name)),
  setSelectedHospital: (index) => dispatch(selectHospital(index)),
  setStoreDay: (value) => dispatch(setDay(value)),
  setStoreHospitalList: (name, date) => dispatch(getHospitalList(name, date)),
  reserve: (hospitalID, vacineName, vacineTime, date, number) => dispatch(reserve(hospitalID, vacineName, vacineTime, date, number)),
  infoUser: () => dispatch(infoUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
