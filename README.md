# Satellite Tracker (Angular + Mapbox + N2YO)

Real-time satellite tracking app that displays multiple satellites on an interactive Mapbox map using the N2YO API.

## Features
- Track multiple satellites simultaneously (ISS, Hubble, NOAA, Starlink, etc.)
- Live position updates every 5 seconds
- Interactive Mapbox map with custom markers per satellite type
- Telemetry display: latitude, longitude, altitude, sunlit/eclipsed status
- NASA ISS external HD camera stream (when ISS is selected)
- Built with Angular 18, NgRx, Tailwind CSS

## Tracked Satellites
| Satellite | NORAD ID | Category |
|-----------|----------|----------|
| ISS (ZARYA) | 25544 | Space Station |
| CSS (Tianhe) | 48274 | Space Station |
| Hubble Space Telescope | 20580 | Science |
| NOAA 19 | 33591 | Weather |
| NOAA 18 | 28654 | Weather |
| Starlink-24 | 43013 | Starlink |
| Terra | 25994 | Science |
| Aqua | 27424 | Science |

## Requirements
- Node.js 18+
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```bash
   MAPBOX_ACCESS_TOKEN=<your_mapbox_token>
   N2YO_API_KEY=<your_n2yo_api_key>
   YOUTUBE_ID=<youtube_video_id_optional>
   ```

   Get your N2YO API key at [n2yo.com/api](https://www.n2yo.com/api/).

3. Start the dev server:
   ```bash
   npm start
   ```
   Visit `http://localhost:4200/`.

## Scripts
- `npm start` – run dev server with hot reload
- `npm run build` – build for development
- `npm run build:prod` – production build
- `npm run serve:prod` – serve compiled app from `dist/project-iis`
- `npm test` – run unit tests

## Project Structure
```
src/app/
├── components/
│   └── location-tracker/    # Main tracker UI
├── model/
│   ├── iss-location.model.ts
│   └── satellite.model.ts   # N2YO response types
├── services/
│   ├── satellite.service.ts # N2YO API client
│   └── map.service.ts       # Mapbox + multi-marker support
└── state/
    ├── actions/
    ├── effects/
    ├── reducer/
    └── selectors/
```

## API Notes
- **N2YO API**: Free tier allows 1,000 requests/hour. Positions endpoint is polled every 5 seconds.
- **Mapbox**: Custom dark style. Change in `map.service.ts` if needed.

## Adding More Satellites
Edit `src/app/model/satellite.model.ts` and add entries to `TRACKED_SATELLITES`:
```typescript
{ id: 12345, name: 'My Satellite', category: SatelliteCategory.OTHER, icon: 'satellite' }
```

## License
MIT
