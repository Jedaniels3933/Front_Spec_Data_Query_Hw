import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import FetchPosts from './components/FetchPost';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import DeletePost from './components/DeletePost';
import { useQuery } from 'react-query';


const queryClient = new QueryClient();

const App = () => {
  const [editingPost, setEditingPost] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query</h1>
        <CreatePost />
        <UpdatePost editingPost={editingPost} onClear={() => setEditingPost(null)} />
        <FetchPosts onEdit={(post) => setEditingPost(post)} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
