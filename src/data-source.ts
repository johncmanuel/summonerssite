import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
import {
	DB_HOST,
	DB_PORT,
	DB_PASSWORD,
	DB_USERNAME,
	DB_DATABASE,
} from "../env";

console.log(DB_DATABASE);

export const AppDataSource = new DataSource({
	type: "mysql",
	port: DB_PORT,
	host: DB_HOST,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: process.env.NODE_ENV === "development",
	logging: false,
	entities: [User, Post, Comment],
	migrations: [],
	subscribers: [],
	ssl: {
		rejectUnauthorized: false,
	},
});
