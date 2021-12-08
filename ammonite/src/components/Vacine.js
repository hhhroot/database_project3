import { Component } from "react";
import { connect } from "react-redux";
import { selectVacine } from "../actions/reserve"

class Vacine extends Component {
  constructor(props){
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem(){
    this.props.setSelectedVacine(this.props.index)
  }

  render() {
    const className = this.props.selected ? "reserve_time reserve_time_selected" : "reserve_time";
    return (
      <div className={className} onClick={this.onClickItem}>{this.props.time}<br></br><span style={{fontSize: "12px"}}>{this.props.name}</span></div>
    )
  }
}

const mapStateToProps = (state) => ({
  // storeDay: state.reserve.day,
  // storeMonth: state.reserve.month,
  // storeYear: state.reserve.year,
})

const mapDispatchToProps = (dispatch) => ({
  // setSelectedHospital: (index) => dispatch(selectHospital(index)),
  // getHospitalVacineList: (h_id, date) => dispatch(getHospitalVacine(h_id, date)),
  // index 바꾸는거 하나
  setSelectedVacine: (index) => dispatch(selectVacine(index)),
})

export default connect(null, mapDispatchToProps)(Vacine);