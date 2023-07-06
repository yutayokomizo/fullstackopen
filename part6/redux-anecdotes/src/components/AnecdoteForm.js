import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(createNew(anecdote));
    event.target.anecdote.value = '';
    dispatch(notify(`you created '${anecdote}'`, 5));
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
