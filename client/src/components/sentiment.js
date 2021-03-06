
import { useState, useEffect } from 'react';
const ml5 = window.ml5;

let sentiment;

function App() {
  let [text, setText] = useState('');
  let [score, setScore] = useState(0);
  let [modelIsReady, setModelIsReady] = useState(false); 

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const calculateSentiment = () => {
    const prediction = sentiment.predict(text);
    setScore(prediction.score);
  }

  useEffect(() => {
    console.log("loading model");
    sentiment = ml5.sentiment('movieReviews', modelReady);
  }, [])

  function modelReady() {
    console.log('Model Loaded!');
    setModelIsReady(true);
  }

  return (
    <div className="container">
      <h1>Sentiment Analyzer</h1>
      <textarea id="input" onChange={handleChange} placeholder="hello I like you!" disabled={!modelIsReady}></textarea>
      <br />
      <p>{modelIsReady ? '' : 'Loading model...'}</p>
      <button onClick={calculateSentiment}>Calculate</button>
      <br />
      <h3>Sentiment Score: {score.toFixed(5)}</h3>
    </div>
  );
}

export default App;