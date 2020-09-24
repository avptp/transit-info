import {faFlushed} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {Component} from 'react';
import './Error.scss';

class Error extends Component {

  render() {
    return (
      <section className="error">
        <div className="icon">
          <FontAwesomeIcon icon={faFlushed}/>
        </div>
        <div className="title">
          <div>Les estimacions no estan disponibles</div>
          <div>Las estimaciones no están disponibles</div>
        </div>
      </section>
    );
  }

}

export default Error;
