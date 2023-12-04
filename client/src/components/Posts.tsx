import { useEffect } from "react";
import { useAuth } from "../HomePage/AuthContext";

export const Posts = () => {
	const { user } = useAuth();

	useEffect(() => {
		const getPosts = async () => {
			console.log("get posts here");
		};
		getPosts();
	}, []);

	return (
		<div>
			<p>hi</p>
		</div>
	);
};
