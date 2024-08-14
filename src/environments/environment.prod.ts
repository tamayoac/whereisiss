export const environment = {
    production: true,
    mapbox: {
        accessToken: process.env['MAPBOX_ACCESS_TOKEN'] || ''
    },
    issapi: process.env['ISS_API'] || '',
    youtubeVideoId: process.env['YOUTUBE_ID'] || undefined,
  };