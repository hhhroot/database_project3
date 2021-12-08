import React, { Component } from 'react';
import Hospital from './Hospital';

export default class HospitalItem extends Component {
  render() {
    return (
      <div id="hospital_list">
        {this.props.hospitalList.map((hospital) => <Hospital
                                                  name={hospital.name}
                                                  address={hospital.address}
                                                  id={hospital.h_id}
                                                  selected={this.props.selectedIndex == hospital.h_id}
                                                  />)
                                                  }
        {this.props.hospitalList.length > 5 ? (
          <div id="hospital_button_container">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
          ) : ""}

      </div>
    )
  }
}