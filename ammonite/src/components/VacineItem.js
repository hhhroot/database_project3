import React, { Component } from 'react';
import Vacine from './Vacine';

export default class VacineItem extends Component {
  render() {
    return (
      <div id="reserve_time_container" style={{display: "block"}}>
        {this.props.vacineList.map((vacine, index) => <Vacine
                                                  index={index}
                                                  name={vacine.v_name}
                                                  time={vacine.time.slice(0,5)}
                                                  selected={this.props.selectedIndex == index}
                                                  />)
                                                  }
      </div>
    )
  }
}