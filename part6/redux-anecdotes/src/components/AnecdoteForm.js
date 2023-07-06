import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const newAnecdote = await anecdotesService.createNew(anecdote);
    dispatch(create(newAnecdote));
    event.target.anecdote.value = '';
    dispatch(setNotification(`you created '${anecdote}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
