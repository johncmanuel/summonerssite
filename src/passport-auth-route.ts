import express, { NextFunction, Request, Response } from "express";
import passport from "./passport-config";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
// import type { AuthenticateCallback } from "passport";

const authRouter = express.Router();

// Logs an existing user in
// Code used:
// https://stackoverflow.com/a/15711502
authRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
	// TODO:
	// Assign type to the callback function using
	// passport.AuthenticateCallback
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err); // will generate a 500 error
		}
		if (!user) {
			return res.send({
				success: false,
				error: "Invalid username or password.",
			});
		}
		req.login(user, (loginErr) => {
			if (loginErr) {
				return next(loginErr);
			}
			// req.user = {...req.user, }
			return res.send({
				success: true,
				user: {
					username: user.username,
					id: user.id,
				},
				error: null,
			});
		});
	})(req, res, next);
	// res.status(200).json({ authenticated: true });
});

// Logs out the user
authRouter.post(
	"/logout",
	(req: Request, res: Response, next: NextFunction) => {
		req.logout((err) => {
			// if (err) return next(err);
			if (err) res.send({ success: false, error: err });
			else res.send({ success: true, error: null });
		});
	}
);

// Create the user
authRouter.post(
	"/signup",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userRepo: Repository<User> =
				AppDataSource.getRepository(User);

			const username: string = req.body.username;
			const password: string = req.body.password;

			const existingUser = await userRepo.findOne({
				where: { username: username },
			});

			if (existingUser) {
				throw new Error("User already exists");
			}

			// NOTE: There will be significant performance costs when hashing
			// passwords.
			// https://www.npmjs.com/package/bcrypt#a-note-on-rounds
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			const newUser = userRepo.create({
				username: username,
				password: hashedPassword,
			});

			await userRepo.save(newUser);

			res.status(200).json({
				success: true,
				user: {
					username: username,
					id: newUser.id,
				},
				error: null,
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				user: null,
				error: err.message,
			});
		}
	}
);

// Checks if the user is authenticated
authRouter.get("/isauth", (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.send({
			success: true,
			user: {
				username: req.user.username,
				id: req.user.id,
			},
		});
	} else res.send({ success: false, user: null });
});

export default authRouter;
