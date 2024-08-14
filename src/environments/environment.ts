export const environment = {
    production: false,
    mapbox: {
      accessToken: process.env['MAPBOX_ACCESS_TOKEN'] || ''
    },
    issapi: process.env['ISS_API'] || '',
    youtubeVideoId: process.env['YOUTUBE_ID'] || undefined,
  };