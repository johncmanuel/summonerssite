import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	author: string;

	@Column()
	content: string;

	@Column()
	datePosted: Date;

	@ManyToOne(() => Post, (post) => post.comments)
	post: Post;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@ManyToOne(() => Comment, (parentComment) => parentComment.replies, {
		nullable: true,
	})
	parentComment: Comment;

	@OneToMany(() => Comment, (reply) => reply.parentComment)
	replies: Comment[];
}
