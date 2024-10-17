import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const createPost = async (newPost) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return data;
};

const CreatePost = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      alert('Post created successfully!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ title, body, userId: 1 });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;