import { faMale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Status, { StatusType } from "components/status";
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

function Schedules({ station }: Props) {
  const [departures, setDepartures] = useState<Departure[]>();

  useEffect(() => {
    const fetch = () => {
      getDepartures(station.id).then((departures) => setDepartures(departures));
    };

    fetch();
    const interval = setInterval(fetch, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [station]);

  if (departures === undefined) {
    return <Status full={false} type={StatusType.Loading} />;
  }

  if (departures.length === 0) {
    return <Status full={false} type={StatusType.Error} />;
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
