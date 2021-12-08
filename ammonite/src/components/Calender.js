import React, { Component } from 'react'
import Week from './Week'

class Calender extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const days = [{value: "일"}, {value: "월"}, {value: "화"}, {value: "수"},
                  {value: "목"}, {value: "금"}, {value: "토"}]
    return (
      <table id="calendar_table">
        <Week datas={days} ID="day_title"/>
        <Week datas={this.props.month[0]}/>
        <Week datas={this.props.month[1]}/>
        <Week datas={this.props.month[2]}/>
        <Week datas={this.props.month[3]}/>
        <Week datas={this.props.month[4]}/>
        <Week datas={this.props.month[5]}/>
      </table>
    )
  }
}

export default Calender;