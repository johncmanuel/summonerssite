import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "password",
	database: "summonerssite",
	synchronize: true,
	logging: false,
	entities: [User, Post, Comment],
	migrations: [],
	subscribers: [],
});
