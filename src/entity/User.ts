import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	// Taking out the email attribute for now
	// @Column()
	// email: string;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.author)
	comments: Comment[];
}
