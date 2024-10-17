import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';


const updatePost = async (updatedPost) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
  return data;
};

const UpdatePost = ({ editingPost, onClear }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      alert('Post updated successfully!');
      onClear();
    },
  });

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingPost.id, title, body, userId: 1 });
    setTitle('');
    setBody('');
  };

  if (!editingPost) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePost;