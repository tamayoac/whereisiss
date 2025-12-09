export const environment = {
    production: true,
    mapbox: {
        accessToken: process.env['MAPBOX_ACCESS_TOKEN'] || ''
    },
    issapi: process.env['ISS_API'] || '',
    youtubeVideoId: process.env['YOUTUBE_ID'] || undefined,
    n2yo: {
      apiKey: process.env['N2YO_API_KEY'] || '',
      baseUrl: '/n2yo-api/rest/v1/satellite' // use proxy for both dev and prod serve
    }
  };