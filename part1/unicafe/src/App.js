import { useState } from 'react';

const StatisticsLine = ({ text, value, isPercent = false }) => {
  if (isPercent) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={all} />
          <StatisticsLine text='average' value={average} />
          <StatisticsLine text='positive' value={positive} isPercent />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(good + 1)} text='neutral' />
      <Button handleClick={() => setBad(good + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
