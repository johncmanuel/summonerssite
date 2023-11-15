import * as dotenv from "dotenv";
dotenv.config({
	path: "./client/.env",
});

export const PORT = parseInt(process.env.PORT || "3001");

export const SERVER_URL = process.env.WEBSITE_URL || `http://localhost:${PORT}`;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

export const DB_HOST = process.env.DB_HOST || "localhost";

export const DB_PORT = parseInt(process.env.DB_PORT || "3306");

export const DB_PASSWORD = process.env.DB_PASSWORD || "password";

export const DB_USERNAME = process.env.DB_USERNAME || "root";

export const DB_DATABASE = process.env.DB_DATABASE;
