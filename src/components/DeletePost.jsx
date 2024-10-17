import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deletePost = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

const DeletePost = ({ id }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      alert('Post deleted successfully!');
    },
  });

  return (
    <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
  );
};

export default DeletePost;