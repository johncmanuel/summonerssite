import React, { useState } from "react";
import httpClient from "../httpClient";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create the account, then login the newly-created user
		try {
			const response = await httpClient.post("/signup", formData);
			const data = response.data;
			if (data.success) {
				const res = await httpClient.post("/login", formData);
				const resData = res.data;
				if (resData.success) {
					login({
						username: formData.username,
						id: parseInt(resData.user.id),
					});
					navigate("/posts");
				}
			}
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<div>
			<h1>Sign up</h1>
			<form onSubmit={handleSubmit}>
				<section>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						autoComplete="username"
						required
						value={formData.username}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor="new-password">Password</label>
					<input
						id="new-password"
						name="password"
						type="password"
						autoComplete="new-password"
						required
						value={formData.password}
						onChange={handleChange}
					/>
				</section>
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
};

export default SignUp;
