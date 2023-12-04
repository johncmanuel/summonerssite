import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import httpClient from '../httpClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Post';
import { useAuth } from '../HomePage/AuthContext';

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [userLikes, setUserLikes] = useState<Post[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const [profileUsername, setProfileUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postsResponse = await httpClient.get<Post[]>(`/users/${username}/posts`);
        setUserPosts(postsResponse.data);

        const commentsResponse = await httpClient.get<Comment[]>(`/users/${username}/comments`);
        setUserComments(commentsResponse.data);

        const likesResponse = await httpClient.get<Post[]>(`/users/${username}/likes`);
        setUserLikes(likesResponse.data);

        // Set profile username only after all data is fetched
        setProfileUsername(user?.username || `${username}'s Profile`);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setProfileUsername(`${username}'s Profile`); // Fallback profile username
      }
    };

    fetchUserData();
  }, [username, user?.username]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderPosts = () => userPosts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      {/* Render other post details */}
    </div>
  ));

  const renderComments = () => userComments.map(comment => (
    <div key={comment.id}>
      <p>{comment.content}</p>
      {/* Render other comment details */}
    </div>
  ));

  const renderLikes = () => userLikes.map(like => (
    <div key={like.id}>
      <h3>{like.title}</h3>
      {/* Render other like details */}
    </div>
  ));

  return (
    <div className="container mx-auto mt-4">
      <header className="flex justify-between items-center p-4 border-b">
        <Link to="/" className="text-xl font-bold">Summoners Site</Link>
        <h2 className="text-center text-xl flex-1">{profileUsername}</h2>
        <div className="relative group">
          {user ? (
            <div
              className="inline-block cursor-pointer"
              onClick={toggleDropdown}
            >
              {user.username}
            </div>
          ) : (
            <Link
              to="/signup-login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
            >
              Signup/Login
            </Link>
          )}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md space-y-2">
              <Link
                to={`/users/${profileUsername}`}
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
      </header>
      <nav className="flex justify-center space-x-4 border-b-2 py-2">
        <button
          className={`text-xl ${activeTab === 'posts' ? 'text-red-500 border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`text-xl ${activeTab === 'comments' ? 'text-red-500 border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
        <button
          className={`text-xl ${activeTab === 'liked' ? 'text-red-500 border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked
        </button>
      </nav>
      <main>
        {activeTab === 'posts' && (userPosts.length > 0 ? renderPosts() : <p>User has not posted anything.</p>)}
        {activeTab === 'comments' && (userComments.length > 0 ? renderComments() : <p>User has not commented on anything.</p>)}
        {activeTab === 'liked' && (userLikes.length > 0 ? renderLikes() : <p>User has not liked any posts.</p>)}
      </main>
    </div>
  );
};

export default UserProfilePage;
