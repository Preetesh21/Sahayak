
import Footer from './Footer';
import Navber from './Navber';
import ChatBot from 'react-simple-chatbot';
import { useState, useEffect, Fragment } from 'react';

const ml5 = window.ml5;


let sentiment;

function App() {
  let [text, setText] = useState('');
  let [score, setScore] = useState(0);
  let [modelIsReady, setModelIsReady] = useState(false); 
//  let [posts,setPosts]=useState('');
  let userid=localStorage.getItem('id');
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
  async function senddata(){
      try{
          const data=text;
          const resp = await fetch(`/mender/posts/${userid}`,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({text:data})
        });
        document.getElementById('hell').innerHTML="Posted!"
      }
      catch(err){
          console.log(err)
      }
  }

  return (
      <Fragment>
      <Navber />

<div className="row">
<div className="col-md-7">
  <div className="App container" style={{maxWidth:"50vw",maxHeight:"20vh"}}>
      <h1>Sentiment Analyzer</h1>
      <textarea id="input" onChange={handleChange} placeholder="hello I like you!" disabled={!modelIsReady}></textarea>
      <br />
      <p>{modelIsReady ? '' : 'Loading model...'}</p>
      <button className="btn btn-secondary" onClick={calculateSentiment}>Calculate</button>
      <br />
      <h3>Sentiment Score: {score.toFixed(5)}</h3>
      <button className="btn btn-warning" onClick={senddata}>Post</button><br></br>
      <h5 id="hell">.</h5>
        <br></br>
        
        <a href ={`/users/${userid}/allposts`}>CLICK TO CHECK ALL YOUR POSTS</a>     
    </div>   
  </div>
  <div className="col-md-4 m-3">
  <ChatBot
  steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you! How are you?',
      trigger:'4',
    },
    {
      id:'4',
      user:true,
      trigger:'5',
    },
    {
      id:'5',
      message:'So, do you wanna know more about the following:',
      trigger:'6'
    },
    {
      id:'6',
      options:[
        {value:1,label:'Depression',trigger:'7'},
        {value:2,label:'Anxiety',trigger:'8'},
        {value:3,label:'Stress',trigger:'9'}
      ],
    },
    {
      id:'7',
      component: (
        <div> Checkout <a href="https://www.healthline.com/health/depression">this</a> article.</div>
      ),
      trigger:'5'
    },
    {
      id:'8',
      component: (
        <div> Checkout <a href="https://www.healthline.com/health/anxiety">this</a> article.</div>
      ),
      trigger:'5'
    },
    {
      id:'9',
      component: (
        <div> Checkout <a href="https://my.clevelandclinic.org/health/articles/11874-stress">this</a> article.</div>
      ),
      trigger:'5'
    }
  ]}
/>
  </div>
</div>
<Footer />
    </Fragment>
  );
}

export default App;