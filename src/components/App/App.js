import Error from 'components/Error/Error';
import Header from 'components/Header/Header';
import Schedules from 'components/Schedules/Schedules';
import stations from 'data/stations';
import React, {Component} from 'react';
import 'typeface-titillium-web';
import './App.scss'

class App extends Component {

  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    let stationId = parseInt(urlParams.get('station'));

    this.state = {
      station: stations.find((station) => station.id === stationId)
    };
  }

  render() {
    const {station} = this.state;

    if (!station) {
      return <Error/>
    }

    return (
      <>
        <Header station={station}/>
        <Schedules station={station}/>
      </>
    );
  }

}

export default App;
