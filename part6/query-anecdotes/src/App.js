import { useQuery, useMutation, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, vote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes);
  const queryClient = useQueryClient();
  const voteMutation = useMutation(vote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({
        type: 'SET',
        payload: `anecdote '${data.content}' voted`,
      });
      setTimeout(() => {
        dispatch({ type: 'REMOVE' });
      }, 5000);
    },
  });
  const dispatch = useNotificationDispatch();

  console.log(result);

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(updatedAnecdote);
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
