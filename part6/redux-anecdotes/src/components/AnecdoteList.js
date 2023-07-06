import { useSelector, useDispatch } from 'react-redux';
import { registerVote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter;

    if (filter === '') {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter),
      );
    }
  });
  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    dispatch(registerVote(id));
    dispatch(notify(`you voted '${content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
