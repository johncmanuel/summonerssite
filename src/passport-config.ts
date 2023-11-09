import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

// Stores the relevant user info for
// session purposes
interface UserSession {
	id: number;
	username: string;
	password: string;
}

const userRepository: Repository<User> = AppDataSource.getRepository(User);

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await userRepository.findOne({
				where: { username },
			});
			const isValidPassword = await bcrypt.compare(
				password,
				user.password
			);

			if (!isValidPassword)
				throw new Error("Incorrect username or password");
			if (!user) {
				throw new Error("Incorrect username or password");
			}

			const userSession: UserSession = {
				username,
				password,
				id: user.id,
			};
			return done(null, userSession);
		} catch (error) {
			return done(null, false, {
				message: "Incorrect username or password.",
			});
		}
	})
);

passport.serializeUser((user: UserSession, done) => {
	console.log("serializeUser", user);
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await userRepository.findOne({
			where: { id },
		});
		console.log("deserializeUser", user, id);
		const userSession: UserSession = {
			username: user.username,
			password: user.password,
			id,
		};
		done(null, userSession);
	} catch (err) {
		done(err);
	}
});

export default passport;
