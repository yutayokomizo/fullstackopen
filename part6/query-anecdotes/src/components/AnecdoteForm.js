import { useMutation, useQueryClient } from 'react-query';
import { createNew } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const createMutation = useMutation(createNew, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'SET', payload: `anecdote '${data.content}' created` });
      setTimeout(() => {
        dispatch({ type: 'REMOVE' });
      }, 5000);
    },
    onError: (err) => {
      dispatch({ type: 'SET', payload: err.response.data.error });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote');
    createMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
