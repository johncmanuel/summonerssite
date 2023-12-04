import React, { useState } from "react";
import httpClient from "../httpClient";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const SignupLogin: React.FC = () => {
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

  const handleLogin = async () => {
    try {
      const response = await httpClient.post("/login", formData);
      const data = response.data;
      if (data.success) {
        login({ username: formData.username, id: parseInt(data.id) });
        navigate("/"); // Redirect to the homepage after login
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = async () => {
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
          navigate("/"); // Redirect to the homepage after signup
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="bg-white w-1/4 mx-auto p-4 mt-10 rounded-md shadow-md">
      <h1 className="text-2xl mb-4">Signup/Login</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupLogin;
