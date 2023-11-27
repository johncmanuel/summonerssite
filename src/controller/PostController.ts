import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController {
	private postRepository = AppDataSource.getRepository(Post);
	private userRepository = AppDataSource.getRepository(User);

	// Get all posts from a particular user
	async all(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const user = await this.userRepository.findOne({
			where: { id },
		});
		const posts = this.postRepository.find({
			where: { user },
		});
		return posts;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const postId = parseInt(request.params.postId);
		const user = await this.userRepository.findOne({
			where: { id },
		});
		const post = this.postRepository.findOne({
			where: { user, id: postId },
		});
		return post;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		if (request.isUnauthenticated()) {
			return "not authenticated";
		}

		const { title, description, datePosted } = request.body;
		const userId = parseInt(request.params.id);
		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		const post = Object.assign(new Post(), {
			title,
			description,
			datePosted,
			user,
		});
		return this.postRepository.save(post);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		if (request.isUnauthenticated()) {
			return "not authenticated";
		}

		const id = parseInt(request.params.id);
		const postId = parseInt(request.params.postId);
		const user = await this.userRepository.findOne({
			where: { id },
		});
		const postToRemove = await this.postRepository.findOneBy({
			id: postId,
			user,
		});

		if (!postToRemove) {
			return "this post not exist";
		}

		await this.postRepository.remove(postToRemove);
		return "post has been removed";
	}
}
