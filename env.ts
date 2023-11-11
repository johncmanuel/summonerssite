export const PORT = parseInt(process.env.PORT || "3001");

export const SERVER_URL = process.env.WEBSITE_URL || `http://localhost:${PORT}`;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
