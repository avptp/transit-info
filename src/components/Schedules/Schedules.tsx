import { faMale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "components/Error/Error";
import Line from "components/Line/Line";
import { getDepartures } from "data/backend";
import { useEffect, useState } from "react";
import { Departure } from "types/departure";
import { Station } from "types/station";
import { getOccupancyType, occupancyColor, OccupancyType } from "./occupancy";
import "./Schedules.scss";

type Props = {
  station: Station;
};

function Schedules(props: Props) {
  const [departures, setDepartures] = useState<Departure[]>();

  useEffect(() => {
    getDepartures(props.station.id).then((departures) =>
      setDepartures(departures)
    );

    const interval = setInterval(() => {
      getDepartures(props.station.id).then((departures) =>
        setDepartures(departures)
      );
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
        const occupancy = getOccupancyType(departure.occupancy);

        return (
          <div
            key={`${departure.line}-${departure.destination}-${departure.time}`}
            className="departure"
          >
            <div className="destination">
              <Line id={departure.line} />
              <div>{departure.destination}</div>
            </div>
            <div className="time">{getDepartureTime(departure.time)}</div>
            <div className="occupancy">
              {occupancy === OccupancyType.Unknown ||
                [...Array(3).keys()].map((key) => {
                  return (
                    <FontAwesomeIcon
                      key={key}
                      icon={faMale}
                      color={
                        key < occupancy
                          ? occupancyColor.get(occupancy)
                          : "#cbd0d8"
                      }
                    />
                  );
                })}
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

export default Schedules;
