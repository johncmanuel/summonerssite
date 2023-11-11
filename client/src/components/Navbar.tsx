import { Routes, Route, Link } from "react-router-dom";
import { Posts } from "./Posts";
import Login from "./Login";
import SignUp from "./Signup";
import { useAuth } from "./AuthContext";
import Logout from "./Logout";

export const Navbar = () => {
	const { user } = useAuth();
	console.log(user);
	return (
		<div>
			<nav>
				{user ? (
					<div>
						<p>Welcome, {user.username}.</p>
						<Logout />
					</div>
				) : (
					<div>
						<p>Please login or signup.</p>
						<li>
							<Link to={"/login"}>Login</Link>
						</li>
						<li>
							<Link to={"/signup"}>Sign Up</Link>
						</li>
					</div>
				)}
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/posts"}>Posts</Link>
				</li>
			</nav>
			<Routes>
				<Route path="/" element={<div>home</div>} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<div>post by id</div>} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				{/* <Route path="/logout" element={<div>logout</div>} /> */}
			</Routes>
		</div>
	);
};
