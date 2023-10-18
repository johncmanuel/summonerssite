import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

export class CommentController {
	private postRepository = AppDataSource.getRepository(Post);
	private userRepository = AppDataSource.getRepository(User);
	private commentRepository = AppDataSource.getRepository(Comment);

	// Get all comments posted from a user
	async all(request: Request, response: Response, next: NextFunction) {
		const postId = parseInt(request.params.postId);
		const { userId } = request.body;

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		const post = await this.postRepository.findOne({
			where: {
				id: postId,
			},
		});
		return this.commentRepository.find({ where: { user, post } });
	}

	// Get a comment from a user
	async one(request: Request, response: Response, next: NextFunction) {
		const postId = parseInt(request.params.postId);
		const commentId = parseInt(request.params.commentId);
		const { userId } = request.body;

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		const post = await this.postRepository.findOne({
			where: {
				id: postId,
			},
		});
		const comment = await this.commentRepository.findOne({
			where: {
				user,
				post,
				id: commentId,
			},
		});
		return comment;
	}

	// Add a comment from the user to the post
	async save(request: Request, response: Response, next: NextFunction) {
		// const userId = parseInt(request.params.id);
		const postId = parseInt(request.params.postId);

		const { userId, author, content, datePosted } = request.body;

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		const post = await this.postRepository.findOne({
			where: { id: postId },
		});

		const comment = Object.assign(new Comment(), {
			author,
			content,
			datePosted,
			user,
			post,
		});
		return this.commentRepository.save(comment);
	}

	// Remove user's comment from the post
	async remove(request: Request, response: Response, next: NextFunction) {
		const postId = parseInt(request.params.postId);
		const commentId = parseInt(request.params.commentId);
		const { userId } = request.body;

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		const post = await this.postRepository.findOne({
			where: { id: postId },
		});

		let comment = await this.commentRepository.findOneBy({
			id: commentId,
			user,
			post,
		});

		if (!comment) return "this comment doesn't exist";

		await this.commentRepository.delete(comment);
		return "this comment has been deleted";
	}
}
