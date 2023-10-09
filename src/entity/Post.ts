import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	datePosted: Date;

	@Column({ default: 0 })
	likes: number;

	@Column({ default: 0 })
	dislikes: number;

	@ManyToOne(() => User, (user) => user.posts)
	user: User;

	@OneToMany(() => Comment, (comment) => comment.post)
	comments: Comment[];

	// @Column()
	// content: ?
}
