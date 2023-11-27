import React, { FormEvent, useState } from "react";
import httpClient from "../httpClient";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<LoginFormData>({
		username: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await httpClient.post("/login", formData);
			const data = response.data;
			console.log("login", data);
			if (data.success) {
				login({ username: formData.username, id: parseInt(data.id) });
				navigate("/posts");
			}
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form
				// action="/login/password"
				// method="post"
				onSubmit={handleSubmit}
			>
				<section>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						autoComplete="username"
						required
						autoFocus
						value={formData.username}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor="current-password">Password</label>
					<input
						id="current-password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						value={formData.password}
						onChange={handleChange}
					/>
				</section>
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
};

export default Login;
