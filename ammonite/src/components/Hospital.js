import { Component } from "react";
import { connect } from "react-redux";
import { selectHospital, getHospitalVacine, selectVacine } from "../actions/reserve"

class Hospital extends Component {
  constructor(props){
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem(){
    // API 요청(date, h_id)
    const date = `${this.props.storeYear}-${this.props.storeMonth + 1}-${this.props.storeDay}`
    this.props.setSelectedHospital(this.props.id)

    this.props.getHospitalVacineList(this.props.id, date);
    this.props.setSelectedVacine(-1);
  }

  render() {
    const className = this.props.selected ? "hospital hospital_selected" : "hospital";
    return (
      <div className={className} onClick={this.onClickItem}>
        <span className="detail_page">+</span>
        <div className="hospital_name">{this.props.name}</div>
        <div className="hospital_address">{this.props.address}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  storeDay: state.reserve.day,
  storeMonth: state.reserve.month,
  storeYear: state.reserve.year,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedHospital: (index) => dispatch(selectHospital(index)),
  getHospitalVacineList: (h_id, date) => dispatch(getHospitalVacine(h_id, date)),
  setSelectedVacine: (index) => dispatch(selectVacine(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);