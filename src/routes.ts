import { PostController } from "./controller/PostController";
import { UserController } from "./controller/UserController";
import { CommentController } from "./controller/CommentController";

export const Routes = [
	/******************** User ********************/
	{
		method: "get",
		route: "/users",
		controller: UserController,
		action: "all",
	},
	{
		method: "get",
		route: "/users/:id",
		controller: UserController,
		action: "one",
	},
	{
		method: "post",
		route: "/users",
		controller: UserController,
		action: "save",
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
	},
	/******************** Post ********************/
	{
		method: "get",
		route: "/users/:id/post",
		controller: PostController,
		action: "all",
	},
	{
		method: "get",
		route: "/users/:id/post/:postId",
		controller: PostController,
		action: "one",
	},
	{
		method: "post",
		route: "/users/:id/post",
		controller: PostController,
		action: "save",
	},
	{
		method: "delete",
		route: "/users/:id/post/:postId",
		controller: PostController,
		action: "remove",
	},
	/******************** Comment ********************/
	// The user's id will be provided in the request body for all endpoints.
	{
		method: "get",
		route: "/posts/:postId/comments",
		controller: CommentController,
		action: "all",
	},
	{
		method: "get",
		route: "/posts/:postId/comments/:commentId",
		controller: CommentController,
		action: "one",
	},
	{
		method: "post",
		route: "/posts/:postId/comments",
		controller: CommentController,
		action: "save",
	},
	{
		method: "delete",
		route: "/posts/:postId/comments/:commentId",
		controller: CommentController,
		action: "remove",
	},
];
