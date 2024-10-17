import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DeletePost from './DeletePost';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const FetchPosts = ({ onEdit }) => {
  const { data: posts, error, isLoading } = useQuery('posts', fetchPosts);

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onEdit(post)}>Edit</button>
          <DeletePost id={post.id} />
        </div>
      ))}
    </div>
  );
};

export default FetchPosts;