import httpClient from "../httpClient";
import { useAuth } from "./AuthContext";

const Logout = () => {
	const { logout } = useAuth();

	const handleLogout = async () => {
		const res = await httpClient.post("/logout");
		if (res.data.success) {
			logout();
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
