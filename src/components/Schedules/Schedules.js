import {faMale} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Error from 'components/Error/Error';
import Line from 'components/Line/Line';
import React, {Component} from 'react';
import './Schedules.scss'

class Schedules extends Component {

  state = {};

  componentDidMount() {
    this.fetch();

    this.interval = setInterval(() => {
      this.fetch();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetch() {
    // Since Metrovalencia API blocks all CORS requests, we need to bypass them, 🙃.
    // Moreover, this should not be hardcoded and will be generalized in future versions.
    axios
      .get(`http://localhost:8000/https://www.metrovalencia.es/ap18/api/public/es/api/v1/V/horarios-prevision/${this.props.station.id}`)
      .then(({data}) => {
        let arrivals = [];
        data.forEach((line) => {
          line.trains.forEach((arrival) => {
            arrivals.push({
              line: line.line,
              destination: arrival.destino,
              time: arrival.seconds,
              occupancy: arrival.capacity,
            });
          });
        });

        arrivals = arrivals.sort((a, b) => {
          return a.time > b.time ? 1 : -1;
        });

        this.setState({arrivals})
      })
      .catch(() => this.setState({arrivals: []}));
  }

  getArrivalTime(total) {
    var hours = Math.floor(total / 3600);
    var minutes = Math.floor((total % 3600) / 60);

    if (!hours && !minutes) {
      return (
        <div className="next">
          <div>immediata</div>
          <div>inmediata</div>
        </div>
      );
    }

    return (
      <>
        {hours > 0 && <>{hours} <small>h</small> </>}
        {minutes} <small>min</small>
      </>
    );
  }

  getOccupancyColor(occupancy) {
    if (occupancy >= 75) {
      return '#ec5564';
    }

    if (occupancy >= 50) {
      return '#ffb75e';
    }

    return '#9ed36a'
  }

  render() {
    const {arrivals} = this.state;

    if (!arrivals) {
      return null;
    }

    if (!arrivals.length) {
      return <Error/>;
    }

    return (
      <section className="schedules">

        <div className="header">
          <div className="destination">
            <div>Destinació</div>
            <div>Destino</div>
          </div>
          <div className="time">
            <div>Pròxima eixida</div>
            <div>Próxima salida</div>
          </div>
          <div className="occupancy">
            <div>Ocupació</div>
            <div>Ocupación</div>
          </div>
        </div>

        {
          arrivals.map((arrival) => {
            const occupancyColor = this.getOccupancyColor(arrival.occupancy);

            return (
              <div key={`${arrival.line}-${arrival.destination}`} className="arrival">
                <div className="destination">
                  <Line id={arrival.line}/>
                  <div>{arrival.destination}</div>
                </div>
                <div className="time">
                  {this.getArrivalTime(arrival.time)}
                </div>
                <div className="occupancy">
                  <div className="visual">
                    {
                      [...Array(10).keys()].map((key) => {
                        const limitKey = Math.round(arrival.occupancy / 10);

                        return (
                          <FontAwesomeIcon icon={faMale} color={key < limitKey ? occupancyColor : '#cbd0d8'}/>
                        );
                      })
                    }
                  </div>
                  <div className="text">{arrival.occupancy} <small>%</small></div>
                </div>
              </div>
            );
          })
        }

      </section>
    );
  }

}

export default Schedules;
