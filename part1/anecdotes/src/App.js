import { useState } from 'react';

const Anecdote = ({ text, points }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {points} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const arrayLength = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(arrayLength).fill(0));

  const generateRandom = () => {
    const random = Math.floor(Math.random() * arrayLength);
    setSelected(random);
  };

  const incrementPoints = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };

  const maxIndex = () => {
    const max = Math.max(...points);
    return points.indexOf(max);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <button onClick={incrementPoints}>vote</button>
      <button onClick={generateRandom}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[maxIndex()]} points={points[maxIndex()]} />
    </div>
  );
};

export default App;
