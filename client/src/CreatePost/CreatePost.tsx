import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface State {
  title: string;
  description: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const [state, setState] = React.useState<State>({
    title: '',
    description: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description } = state;

    try {
      // Send a POST request to backend API to create a new post
      const response = await axios.post('/api/posts', {
        title,
        description,
      });

      // Handle the response or redirect as needed
      console.log(response.data);
      navigate(`/posts/${response.data.id}`); // Use navigate to redirect
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-semibold">
            <Link to="/">Summoners Site</Link>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-800 font-semibold">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={state.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-800 font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              value={state.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
