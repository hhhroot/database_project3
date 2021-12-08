import { Component } from "react";
import "./Reserve.css";
import Calender from "../components/Calender";
import HospitalItem from "../components/HospitalItem"
import VacineItem from "../components/VacineItem";
import hangjungdong from "../datas/hangjungdong"
import { connect } from "react-redux";
import { setLocation3, setYearMonth, selectHospital, setDay, getHospitalList, reserve } from '../actions/reserve';


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
    }

    this.calendarNextButton = this.calendarNextButton.bind(this);
    this.calendarPrevButton = this.calendarPrevButton.bind(this);
    this.getOneWeekDays = this.getOneWeekDays.bind(this);
    this.onChangeLocation1 = this.onChangeLocation1.bind(this);
    this.onChangeLocation2 = this.onChangeLocation2.bind(this);
    this.onChangeLocation3 = this.onChangeLocation3.bind(this);

    this.onClickHospital = this.onClickHospital.bind(this);

    this.Reserve = this.Reserve.bind(this);
  }

  componentDidMount() {
    const today = this.state.date;
    
    this.props.setStoreYearMonth(today.getFullYear(), today.getMonth())

    // 1차 예약되있는지 확인
    
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

  Reserve(){
    const date = `${this.props.storeYear}-${this.props.storeMonth + 1}-${this.props.storeDay}`;

    const hospitalID = this.props.storeSelectedHospital;

    // 모든 조건이 충족하지 않는다면 error
    if (this.props.storeDay != 0 && hospitalID != 0 && this.props.storeSeletedVacine != -1 && this.props.storeLocation3 != ""){
      const vacineName = this.props.storeVacineList[this.props.storeSeletedVacine].v_name;
      const vacineTime = this.props.storeVacineList[this.props.storeSeletedVacine].time;

      // 1차인지 2차인지 적어주기..
      this.props
        .reserve(hospitalID, vacineName, vacineTime, date, 1)
        .then((data) => {
          this.setState({
            success: true,
          })
        })
        .catch((e) => {
          console.log(e);
        })
    } else {
      this.setState({error: true});
    }
  }

  render(){
    return(
      <div>
        <h2 className="page_title">백신 예약</h2>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
