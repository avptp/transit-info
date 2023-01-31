import { syncStations } from "data/backend";
import { useEffect, useState } from "react";
import Error from "components/Error/Error";
import Header from "components/Header/Header";
import Schedules from "components/Schedules/Schedules";
import "typeface-titillium-web";
import "./App.scss";
import { Station } from "types/station";
import storage from "data/storage";

function App() {
  const [stations, setStations] = useState<Station[] | null>(
    storage.getItem("stations")
  );

  const [currentStation, setCurrentStation] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      await syncStations();
      setStations(storage.getItem("stations"));
    })();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("station");

    if (id !== null) {
      setCurrentStation(parseInt(id));
    }
  }, []);

  if (stations === null) {
    return <>Cargandito</>;
  }

  if (currentStation === null) {
    return <Error />;
  }

  const station = stations.find(
    (station: Station) => station.id === currentStation
  );

  if (station === undefined) {
    return <Error />;
  }

  return (
    <>
      <Header station={station} />
      <Schedules station={station} />
    </>
  );
}

export default App;
