import {Component} from "react";
import { setDay, getHospitalList, selectHospital } from '../actions/reserve';
import {connect} from "react-redux";

class Week extends Component {
  constructor(props){
    super(props);

    this.setStoreDay = this.setStoreDay.bind(this);
  }

  setStoreDay(e) {
    this.props.setStoreDay(e.target.innerText);
    this.props.setSelectedHospital(0);

    if (this.props.storeLocation3){
      const date = new Date(this.props.storeYear, this.props.storeMonth, Number(e.target.innerText) + 1)
      const sql_date = date.toISOString().slice(0, 10);
      this.props.setStoreHospitalList(this.props.storeLocation3, sql_date);
    }
  }
  
  render() {
    return (
      <tr id={this.props.ID}>
        <td>{typeof this.props.datas[0].value == "string"
          ? <div>{this.props.datas[0].value}</div>
          : this.props.datas[0].value == undefined
          ? ""
          : <div className={this.props.datas[0].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[0].value}</div>}
        </td>
        <td>{typeof this.props.datas[1].value == "string"
          ? <div>{this.props.datas[1].value}</div>
          : this.props.datas[1].value == undefined
          ? ""
          : <div className={this.props.datas[1].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[1].value}</div>}
        </td>
        <td>{typeof this.props.datas[2].value == "string"
          ? <div>{this.props.datas[2].value}</div>
          : this.props.datas[2].value == undefined
          ? ""
          : <div className={this.props.datas[2].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[2].value}</div>}
        </td>
        <td>{typeof this.props.datas[3].value == "string"
          ? <div>{this.props.datas[3].value}</div>
          : this.props.datas[3].value == undefined
          ? ""
          : <div className={this.props.datas[3].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[3].value}</div>}
        </td>
        <td>{typeof this.props.datas[4].value == "string"
          ? <div>{this.props.datas[4].value}</div>
          : this.props.datas[4].value == undefined
          ? ""
          : <div className={this.props.datas[4].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[4].value}</div>}
        </td>
        <td>{typeof this.props.datas[5].value == "string"
          ? <div>{this.props.datas[5].value}</div>
          : this.props.datas[5].value == undefined
          ? ""
          : <div className={this.props.datas[5].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[5].value}</div>}
        </td>
        <td>{typeof this.props.datas[6].value == "string"
          ? <div>{this.props.datas[6].value}</div>
          : this.props.datas[6].value == undefined
          ? ""
          : <div className={this.props.datas[6].selected ? "day_box day_box_selected" : "day_box"}
                 onClick={this.setStoreDay}>{this.props.datas[6].value}</div>}
        </td>

      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  storeDay: state.reserve.day,
  storeMonth: state.reserve.month,
  storeYear: state.reserve.year,
  storeLocation3: state.reserve.location3,
})

const mapDispatchToProps = (dispatch) => ({
  setStoreDay: (value) => dispatch(setDay(value)),
  setStoreHospitalList: (name, date) => dispatch(getHospitalList(name, date)),
  setSelectedHospital: (index) => dispatch(selectHospital(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Week);