export interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  datePosted: string;
  commentCount: number;
  user: {
    id: number;
    username: string;
  };
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  datePosted: string;
}
