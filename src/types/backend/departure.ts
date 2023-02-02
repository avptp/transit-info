import { BackendTrain } from "./train";

export declare type BackendDeparture = {
  line_id: number;
  line: number;
  trains: BackendTrain[];
  linea_id_interna: number;
};
