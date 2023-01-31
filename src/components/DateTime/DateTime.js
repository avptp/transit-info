import React, { Component } from "react";
import "./DateTime.scss";

class DateTime extends Component {
  state = {};

  componentDidMount() {
    this.timeInterval = setInterval(() => {
      this.forceUpdate();
    }, 1000);

    this.dateInterval = setInterval(() => {
      this.setState({
        lang: this.state.lang === "ca" ? "es" : "ca",
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    clearInterval(this.dateInterval);
  }

  render() {
    const date = new Date();

    return (
      <div className="datetime">
        <div>
          <div className="time">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            <small>
              :
              {date
                .getSeconds()
                .toLocaleString([], { minimumIntegerDigits: 2 })}
            </small>
          </div>
          <div className="date">
            {date.toLocaleDateString(this.state.lang, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DateTime;
