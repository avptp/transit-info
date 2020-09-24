import l1 from 'images/metrovalencia/lines/1.svg';
import l2 from 'images/metrovalencia/lines/2.svg';
import l3 from 'images/metrovalencia/lines/3.svg';
import l4 from 'images/metrovalencia/lines/4.svg';
import l5 from 'images/metrovalencia/lines/5.svg';
import l6 from 'images/metrovalencia/lines/6.svg';
import l7 from 'images/metrovalencia/lines/7.svg';
import l8 from 'images/metrovalencia/lines/8.svg';
import l9 from 'images/metrovalencia/lines/9.svg';
import React, {Component} from 'react';

class Line extends Component {

  map = {
    1: l1,
    2: l2,
    3: l3,
    4: l4,
    5: l5,
    6: l6,
    7: l7,
    8: l8,
    9: l9,
  }

  render() {
    return (
      <img src={this.map[this.props.id]} alt={`Line ${this.props.id}`}/>
    );
  }

}

export default Line;
