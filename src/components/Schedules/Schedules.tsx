import { faMale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "components/Error/Error";
import Line from "components/Line/Line";
import { getDepartures } from "data/backend";
import { useEffect, useState } from "react";
import { Departure } from "types/departure";
import { Station } from "types/station";
import "./Schedules.scss";

type Props = {
  station: Station;
};

function Schedules(props: Props) {
  const [departures, setDepartures] = useState<Departure[]>();

  useEffect(() => {
    getDepartures(props.station.id).then((departures) => setDepartures(departures));

    const interval = setInterval(() => {
      getDepartures(props.station.id).then((departures) => setDepartures(departures));
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [props.station]);

  if (!departures) {
    return <></>;
  }

  if (!departures.length) {
    return <Error />;
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

      {departures.map((departure) => {
        const occupancyColor = getOccupancyColor(departure.occupancy);

        return (
          <div
            key={`${departure.line}-${departure.destination}`}
            className="departure"
          >
            <div className="destination">
              <Line id={departure.line} />
              <div>{departure.destination}</div>
            </div>
            <div className="time">{getDepartureTime(departure.time)}</div>
            <div className="occupancy">
              <div className="visual">
                {[...Array(10).keys()].map((key) => {
                  const limitKey = Math.round(departure.occupancy / 10);

                  return (
                    <FontAwesomeIcon
                      key={key}
                      icon={faMale}
                      color={key < limitKey ? occupancyColor : "#cbd0d8"}
                    />
                  );
                })}
              </div>
              <div className="text">
                {departure.occupancy} <small>%</small>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function getDepartureTime(total: number) {
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
      {hours > 0 && (
        <>
          {hours} <small>h</small>{" "}
        </>
      )}
      {minutes} <small>min</small>
    </>
  );
}

function getOccupancyColor(occupancy: number) {
  if (occupancy >= 75) {
    return "#ec5564";
  }

  if (occupancy >= 50) {
    return "#ffb75e";
  }

  return "#9ed36a";
}

export default Schedules;
