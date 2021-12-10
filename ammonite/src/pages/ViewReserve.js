// 코로나 API 시각화

import { Component } from "react";

import './ViewReserve.css';
import Header from './components/Header'
import Contents from './components/Contents'


class ViewReserve extends Component {
  render(){
    return(
      <div>
        <center>
        <Header />
        <Contents />
        

        </center>
      </div>
    )
  }
}

export default ViewReserve;