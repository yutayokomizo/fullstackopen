import { useMatch } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';

import blogService from '../services/blogs';

const BlogDetail = () => {
  const match = useMatch('/blogs/:id');
  const id = match.params.id;
  const [comment, setComment] = useState('');

  const results = useQuery('blogs', blogService.getAll);

  const queryClient = useQueryClient();
  const likeMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const commentMutation = useMutation(blogService.comment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  const blog = results.data.find((blog) => blog.id === id);

  const handleClick = () => {
    likeMutation.mutate({
      blogId: blog.id,
      data: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await commentMutation.mutateAsync({
      blogId: blog.id,
      comment: comment,
    });

    setComment('');
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes <button onClick={handleClick}>like</button>
        </p>
        <p>Added by {blog.user.name}</p>
      </div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetail;
