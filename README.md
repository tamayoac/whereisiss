# ISS Tracker (Angular + Mapbox)

Minimal UI that shows the live position of the International Space Station with telemetry and an optional external HD camera stream.

## Features

- Live ISS location rendered on Mapbox with a custom marker
- Telemetry cards for latitude, longitude, velocity, altitude, timestamp, and visibility
- Optional NASA external HD camera stream (YouTube embed)
- Built with Angular 18, Tailwind CSS, and NgRx

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
   ISS_API=https://api.wheretheiss.at/v1/satellites/25544
   YOUTUBE_ID=<youtube_video_id_optional>
   ```
   `ISS_API` must return latitude, longitude, velocity, altitude, timestamp, and visibility fields.
3. Start the dev server:
   ```bash
   npm start
   ```
   Visit `http://localhost:4200/`.

## Scripts

- `npm start` - run dev server with hot reload
- `npm run build` - build for development
- `npm run build:prod` - production build
- `npm run serve:prod` - serve the compiled app from `dist/project-iis` (after build)
- `npm test` - run unit tests

## Project structure

- `src/app/components/location-tracker` - map, telemetry UI, and stream embed
- `src/app/services/iss-location.service.ts` - ISS API client using `ISS_API`
- `src/app/services/map.service.ts` - Mapbox helper and marker config
- `src/environments` - environment values loaded from `.env`

## Notes

- The Mapbox style is set in `map.service.ts` and can be swapped for your own.
- The external camera feed may be offline; the embed remains in place gracefully.
