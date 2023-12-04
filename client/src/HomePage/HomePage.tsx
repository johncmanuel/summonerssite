import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory1, setSelectedCategory1] = useState("recent"); // Default category 1
  const [selectedCategory2, setSelectedCategory2] = useState("all"); // Default category 2

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    logout();
  };

  // Sample post data
  const posts = [
    {
      id: 1,
      title: "Post 1",
      date: "2023-12-01",
      comments: 5,
      likes: 10,
    },
    {
      id: 2,
      title: "Post 2",
      date: "2023-12-02",
      comments: 3,
      likes: 8,
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Summoners Site</h1>
        <div className="flex-1 text-center">
          <span
            className={`inline-block mx-4 cursor-pointer ${
              selectedCategory1 === "recent" && "text-red-500 border-b-2 border-red-500"
            }`}
            onClick={() => setSelectedCategory1("recent")}
          >
            Recent
          </span>
          <span
            className={`inline-block mx-4 cursor-pointer ${
              selectedCategory1 === "likes" && "text-red-500 border-b-2 border-red-500"
            }`}
            onClick={() => setSelectedCategory1("likes")}
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
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
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
          <Link to="/signup-login" className="text-blue-500 hover:underline">
            Signup/Login
          </Link>
        )}
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="flex h-full">
          {/* Category 2 to the left of the posts */}
          <div className="w-1/4 p-4 border-r">
            <div
              className={`cursor-pointer mb-4 ${selectedCategory2 === "all" ? "text-red-500" : ""}`}
              onClick={() => setSelectedCategory2("all")}
            >
              <span className={`${selectedCategory2 === "all" ? "border-b-2 border-red-500" : ""}`}>
                All
              </span>
            </div>
            <div
              className={`cursor-pointer ${selectedCategory2 === "competitive" ? "text-red-500" : ""}`}
              onClick={() => setSelectedCategory2("competitive")}
            >
              <span className={`${selectedCategory2 === "competitive" ? "border-b-2 border-red-500" : ""}`}>
                Competitive
              </span>
            </div>
            {/* Add more categories for Category 2 here */}
          </div>

          {/* Posts in the center */}
          <div className="flex-1 p-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex p-4 bg-white rounded shadow-md hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="text-xl font-semibold">{post.title}</div>
                  <div className="text-sm text-gray-500">
                    {post.date} | {post.comments} Comments
                  </div>
                </div>
                <div className="text-2xl font-bold">{post.likes}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
