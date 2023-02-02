export enum OccupancyType {
  Unknown = 0,
  Low,
  Medium,
  High,
}

export const occupancyColor = new Map<OccupancyType, string>([
  [OccupancyType.Low, "#9ed36a"],
  [OccupancyType.Medium, "#ffb75e"],
  [OccupancyType.High, "#ec5564"],
]);

export function getOccupancyType(occupancy: number | undefined): OccupancyType {
  if (occupancy === undefined) {
    return OccupancyType.Unknown;
  }

  if (occupancy >= 75) {
    return OccupancyType.High;
  }

  if (occupancy >= 50) {
    return OccupancyType.Medium;
  }

  return OccupancyType.Low;
}
