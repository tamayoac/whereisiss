// N2YO API response models

export interface SatelliteInfo {
  satid: number;
  satname: string;
  transactionscount: number;
}

export interface SatellitePosition {
  satlatitude: number;
  satlongitude: number;
  sataltitude: number;
  azimuth: number;
  elevation: number;
  ra: number;
  dec: number;
  timestamp: number;
  eclipsed: boolean;
}

export interface N2YOPositionsResponse {
  info: SatelliteInfo;
  positions: SatellitePosition[];
}

// Normalized satellite data for our app
export interface Satellite {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity?: number;
  timestamp: number;
  eclipsed: boolean;
  category: SatelliteCategory;
}

export enum SatelliteCategory {
  SPACE_STATIONS = 'space-stations',
  WEATHER = 'weather',
  SCIENCE = 'science',
  STARLINK = 'starlink',
  GPS = 'gps',
  OTHER = 'other'
}

// Predefined satellites to track
export interface SatelliteOption {
  id: number;
  name: string;
  category: SatelliteCategory;
  icon?: string;
}

export const TRACKED_SATELLITES: SatelliteOption[] = [
  { id: 25544, name: 'ISS (ZARYA)', category: SatelliteCategory.SPACE_STATIONS, icon: 'iss' },
  { id: 48274, name: 'CSS (Tianhe)', category: SatelliteCategory.SPACE_STATIONS, icon: 'station' },
  { id: 20580, name: 'Hubble Space Telescope', category: SatelliteCategory.SCIENCE, icon: 'telescope' },
  { id: 33591, name: 'NOAA 19', category: SatelliteCategory.WEATHER, icon: 'weather' },
  { id: 43013, name: 'Starlink-24', category: SatelliteCategory.STARLINK, icon: 'starlink' },
  { id: 44713, name: 'Starlink-30074', category: SatelliteCategory.STARLINK, icon: 'starlink' },
  { id: 44914, name: 'Starlink-30171', category: SatelliteCategory.STARLINK, icon: 'starlink' },
  { id: 28654, name: 'NOAA 18', category: SatelliteCategory.WEATHER, icon: 'weather' },
  { id: 25994, name: 'Terra', category: SatelliteCategory.SCIENCE, icon: 'science' },
  { id: 27424, name: 'Aqua', category: SatelliteCategory.SCIENCE, icon: 'science' },
];

