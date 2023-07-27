import nations from "./nations";
import "flag-icon-css/css/flag-icons.css";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState([]);
  const [flagCountry, setFlagCountry] = useState({});
  const[score, setScore]= useState({correct:0,incorrect:0,total:0});
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState([]);


  const generateRandomNations = () => {
    let ct = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      ct.push(nations[r]);
    }

    setCountry(ct);
    const index = Math.floor(Math.random() * 4);
    setFlagCountry(ct[index]);
    console.log(ct, ct[index]);
  };

  const checkAnswer = (country) => {
    setSelected(country);
    if (country.name === flagCountry.name) {
        setScore({...score, correct: score.correct+1, total: score.total+1});
    } else {
      setScore({...score, incorrect: score.incorrect+1, total: score.total+1});
    };
    setShowAnswer(true);
    setTimeout(()=>{
      setShowAnswer(false);
      nextQuestion();
    },3000)
  };

  const nextQuestion = ()=>{
    generateRandomNations();
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  return (
    <div className="App">
      {flagCountry.name ? (
        <span
          className={`flag-icon flag-icon-${flagCountry[
            "alpha-2"
          ].toLowerCase()}`}
        ></span>
      ) : null}

      <div>
        {country.map((c) => (
          <button className="btn-option" onClick={(e) => checkAnswer(c)}>{c.name}</button>
        ))}
      </div>
      <div>
      <h4>Correct: {score.correct}</h4>
      <h4>Incorrect: {score.incorrect}</h4>
      <h4>Total: {score.total}</h4>
      </div>
      <div>
         {showAnswer? <h3 className={flagCountry.name === selected.name ? 'correct':'incorrect' }> Correct Answer : { flagCountry.name }</h3> :null }   
      </div>
    </div>
  );

}

export default App;
