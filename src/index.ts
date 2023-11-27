import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import session from "express-session";
import passport from "./passport-config";
import cors from "cors";
import authRouter from "./passport-auth-route";
import { PORT, CLIENT_URL, SECRET } from "../env";
import cookieParser from "cookie-parser";

// I chose MemoryStore for session stores so I do not need to
// rely on additional software for setup such as databases or Redis.
// Though, this may change as this web application grows in complexity
// and traffic.
//
// See more available session stores with express-session:
// https://www.npmjs.com/package/express-session#compatible-session-stores
import createMemoryStore from "memorystore";

declare global {
	namespace Express {
		interface User {
			id: number;
			username: string;
			password: string;
		}
		// export interface Request {
		// 	user?: User;
		// }
	}
}

AppDataSource.initialize()
	.then(async () => {
		const app = express();

		app.use(
			cors({
				origin: CLIENT_URL,
				credentials: true,
			})
		);

		app.use(bodyParser.json());

		// 1 day in miliseconds
		const expiredMiliseconds = 86400000;
		const MemoryStore = createMemoryStore(session);

		app.use(
			session({
				secret: SECRET,
				resave: true,
				saveUninitialized: true,
				// cookie: {
				// 	// secure: true,
				// 	maxAge: expiredMiliseconds,
				// },
				store: new MemoryStore({
					checkPeriod: expiredMiliseconds,
				}),
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
