import TypedLocalStore from "typed-local-store";
import { Station } from "types/station";

interface Schema {
  lastSync: string;
  stations: Station[];
}

const storage = new TypedLocalStore<Schema>();

export default storage;
