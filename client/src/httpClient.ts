import axios from "axios";
import { SERVER_URL } from "./env";

export default axios.create({
	baseURL: `${SERVER_URL}/api`,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
