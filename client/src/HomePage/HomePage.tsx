import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import httpClient from '../httpClient';
import { Post } from '../types/Post';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory1, setSelectedCategory1] = useState('recent');
  const [selectedCategory2, setSelectedCategory2] = useState('all');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await httpClient.get<Post[]>('/posts');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Summoners Site</h1>
        <div className="flex-1 text-center">
          <span
            className={`inline-block mx-4 cursor-pointer ${
              selectedCategory1 === 'recent' ? 'text-red-500 border-b-2 border-red-500' : ''
            }`}
            onClick={() => setSelectedCategory1('recent')}
          >
            Recent
          </span>
          <span
            className={`inline-block mx-4 cursor-pointer ${
              selectedCategory1 === 'likes' ? 'text-red-500 border-b-2 border-red-500' : ''
            }`}
            onClick={() => setSelectedCategory1('likes')}
          >
            Likes
          </span>
        </div>
        {user ? (
          <div className="relative group">
            <div
              className="inline-block cursor-pointer"
              onClick={toggleDropdown}
            >
              {user.username}
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md space-y-2">
                <Link
                  to={`/users/${user.username}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile Page
                </Link>
                <Link 
                  to="/create-post" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup-login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
          >
            Signup/Login
          </Link>
        )}
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="flex h-full">
          <div className="w-1/4 p-4 border-r flex flex-col">
            <div
              className={`cursor-pointer mb-4 ${
                selectedCategory2 === 'all' ? 'text-red-500 border-b-2 border-red-500' : ''
              }`}
              onClick={() => setSelectedCategory2('all')}
            >
              All
            </div>
            <div
              className={`cursor-pointer ${
                selectedCategory2 === 'competitive' ? 'text-red-500 border-b-2 border-red-500' : ''
              }`}
              onClick={() => setSelectedCategory2('competitive')}
            >
              Competitive
            </div>
            {/* Add more categories for Category 2 here */}
          </div>
          <div className="flex-1 p-4">
            {posts.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id} className="block mb-4 p-4 bg-white rounded shadow-md hover:bg-gray-100">
                <div className="text-xl font-semibold">{post.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.datePosted).toLocaleDateString()} | {post.commentCount} Comments
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
