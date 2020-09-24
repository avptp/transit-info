import DateTime from 'components/DateTime/DateTime';
import logo from 'images/metrovalencia/isologo.svg';
import React, {Component} from 'react';
import './Header.scss';

class Header extends Component {

  render() {
    return (
      <header>
        <div className="logo">
          <img src={logo} alt="Logo"/>
        </div>
        <div className="title">{this.props.station.name}</div>
        <DateTime/>
      </header>
    );
  }

}

export default Header;
