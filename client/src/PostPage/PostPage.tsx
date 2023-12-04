import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../httpClient';
import { Post } from '../types/Post'; // Import the Post type

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null); // Use the Post type for the state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await httpClient.get<Post>(`/posts/${postId}`); // Use the Post type for the response data
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          Posted by {post.user.username} on {new Date(post.datePosted).toLocaleDateString()}
        </div>
        <h1 className="text-3xl font-bold my-2">{post.title}</h1>
        <div className="bg-gray-200 px-2 py-1 inline-block rounded">{/* post.category here if it exists */}</div>
        <p className="my-4">{post.content}</p>
        <div className="flex items-center my-4">
          <button>↑</button>
          <span className="mx-2">{post.likes}</span>
          <button>↓</button>
          <span className="ml-4">{post.comments.length} comments</span>
        </div>
      </div>
      {/* Comments section will be implemented here */}
    </div>
  );
};

export default PostPage;
