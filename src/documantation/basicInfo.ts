import { DEPLOYED_URL, PORT, SERVER_URL } from "../utils/keys";

const basicInfo = {
  openapi: "3.0.0",
  info: {
    title: "basefood API",
    description: "Endpoints for basefood",
    version: "1.0.0",
  },

  servers: [
    {
      url: SERVER_URL || `http://localhost:${PORT}/api/v1`,
      description: "Development server",
    },
    {
      url: `${DEPLOYED_URL}/api/v1`,
      description: "Production server",
    },
  ],
  security: [
    {
      google_auth: [],
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default basicInfo;
