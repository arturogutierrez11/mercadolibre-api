export const MeliConfig = {
  auth: {
    url: process.env.MELI_AUTH_URL!,
    clientId: process.env.MELI_CLIENT_ID!,
    clientSecret: process.env.MELI_CLIENT_SECRET!,
    redirectUri: process.env.MELI_REDIRECT_URI!,
  },
  api: {
    baseUrl: 'https://api.mercadolibre.com',
    timeout: 30000,
  },
};
