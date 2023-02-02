import { DateTime } from "luxon";
import { Departure } from "types/departure";
import { BackendDeparture } from "types/backend/departure";
import { BackendStation } from "types/backend/station";
import { BackendTrain } from "types/backend/train";
import { Station } from "types/station";
import storage from "./storage";

const baseUrl = "/api";

export async function syncStations() {
  let lastSyncRaw = storage.getItem("lastSync");

  if (lastSyncRaw === null) {
    lastSyncRaw = "2023-01-01";
  }

  const lastSync = DateTime.fromISO(lastSyncRaw);

  try {
    const { data } = await fetch(
      `${baseUrl}/sincronizacion?fecha_desde=${lastSync.toFormat(
        "yyyy-LL-dd%20HH:mm:uu"
      )}`
    ).then((response) => response.json());

    if (data.estaciones.length === 0) {
      return;
    }

    let stations: Station[] = [];

    data.estaciones.forEach((station: BackendStation) =>
      stations.push({
        id: station.estacion_id_FGV,
        name: station.nombre,
        transfer: station.transbordo === 0,
        latitude: station.latitud,
        longitude: station.longitud,
      })
    );

    storage.setItem("lastSync", DateTime.now().toJSON());
    storage.setItem("stations", stations);
  } catch (error) {
    console.error(error);
  }
}

export async function getDepartures(stationId: number): Promise<Departure[]> {
  let departures: Departure[] = [];

  const response = await fetch(
    `${baseUrl}/horarios-prevision/${stationId}`
  ).then((response) => response.json());

  response.forEach((departure: BackendDeparture) =>
    departure.trains.forEach((train: BackendTrain) =>
      departures.push({
        line: departure.line,
        destination: train.destino,
        time: train.seconds,
        occupancy: train.capacity,
      })
    )
  );

  departures = departures.sort((a, b) => {
    return a.time > b.time ? 1 : -1;
  });

  return departures;
}
