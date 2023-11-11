import { useEffect } from "react";

export const Posts = () => {
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
