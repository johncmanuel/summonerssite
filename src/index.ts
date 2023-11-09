import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import session from "express-session";
import passport from "./passport-config";
import cors from "cors";
import authRouter from "./passport-auth-route";
import { PORT, CLIENT_URL } from "../env";
import cookieParser from "cookie-parser";

AppDataSource.initialize()
	.then(async () => {
		const app = express();

		// if (process.env.NODE_ENV === "production") {
		// 	app.use(express.static("client/build"));
		// 	app.use(express.static("client/public"));
		// }
		app.use(
			cors({
				origin: CLIENT_URL,
				credentials: true,
			})
		);

		app.use(bodyParser.json());
		app.use(
			session({
				secret: "your-secret-key",
				// resave: false, // don't save session if unmodified
				// saveUninitialized: false, // don't create session until something stored
				resave: true,
				saveUninitialized: true,
			})
		);
		app.use(cookieParser());
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(passport.authenticate("session"));

		app.use("/api", authRouter);

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				`/api${route.route}`,
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[
						route.action
					](req, res, next);
					if (result instanceof Promise) {
						result.then((result) =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined
						);
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				}
			);
		});

		app.listen(PORT);
		console.log(`Express server has started on port ${PORT}.`);
	})
	.catch((error) => console.log(error));
