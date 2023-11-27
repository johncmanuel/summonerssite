import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import httpClient from "../httpClient";
import { User } from "../types/User";

interface AuthContextType {
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const isUserAuth = async () => {
			try {
				const res = await httpClient.get("/isauth");
				console.log("res.data", res.data);
				if (res.data.success) {
					console.log("res.data.user", res.data.user);
					setUser({
						username: res.data.user.username as string,
						id: res.data.user.id,
					});
				}
			} catch (error) {
				setUser(null);
			}
		};
		isUserAuth();
	}, []);

	const login = (userData: User) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
