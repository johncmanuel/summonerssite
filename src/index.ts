import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(bodyParser.json());

		if (process.env.NODE_ENV === "production") {
			app.use(express.static("client/build"));
			app.use(express.static("client/public"));
		}

		const PORT = process.env.PORT || 3001;

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

		// start express server
		app.listen(PORT);
		console.log(`Express server has started on port ${PORT}.`);
	})
	.catch((error) => console.log(error));
