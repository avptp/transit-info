import { syncStations } from "data/backend";
import { useEffect, useState } from "react";
import Status, { StatusType } from "components/status";
import Header from "components/Header/Header";
import Schedules from "components/Schedules/Schedules";
import "typeface-titillium-web";
import "./App.scss";
import { Station } from "types/station";
import storage from "data/storage";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("station");
  const currentStation = id && parseInt(id);

  const [stations, setStations] = useState<Station[] | null>(
    storage.getItem("stations")
  );

  useEffect(() => {
    (async () => {
      await syncStations();
      setStations(storage.getItem("stations"));
    })();
  }, []);

  if (!stations) {
    return <Status full={true} type={StatusType.Loading} />;
  }

  const station =
    currentStation &&
    stations?.find((station: Station) => station.id === currentStation);

  if (!station) {
    return <Status full={true} type={StatusType.Error} />;
  }

  return (
    <>
      <Header station={station} />
      <Schedules station={station} />
    </>
  );
}

export default App;
