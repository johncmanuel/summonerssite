import express, { NextFunction, Request, Response } from "express";
import passport from "./passport-config";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

const authRouter = express.Router();

// Logs an existing user in
authRouter.post(
	"/login",
	passport.authenticate("local"),
	(req: Request, res: Response) => {
		res.status(200).json({ authenticated: true });
	}
);

// Logs out the user
authRouter.post(
	"/logout",
	(req: Request, res: Response, next: NextFunction) => {
		req.logout((err) => {
			// if (err) return next(err);
			if (err) res.status(500).json({ success: false, error: err });
			else res.status(200).json({ success: true, error: null });
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
				user: username,
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
	if (req.isAuthenticated())
		res.status(200).json({ success: true, user: req.user });
	else res.status(401).json({ success: false, user: null });
});

export default authRouter;
