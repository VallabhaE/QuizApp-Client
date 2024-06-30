import React, { useEffect, useState } from "react";
import Finish from "./Finish";

function App() {
  const [backEndData, setBackEndData] = useState([]);
  const [id, setId] = useState('');
  const [holdQ, changeQ] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [prevId, setPrevId] = useState('');
  const [currIdx, setCurrIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, changeScore] = useState(0);
  const [holding,changeHold] = useState("start")
  const idChange = (event) => {
    setId(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackEndData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const next = (roomId) => {
    let questions = filteredQuestions;
    if (roomId !== prevId) {
      questions = backEndData.filter(q => q.roomId === roomId);
      setFilteredQuestions(questions);
      setPrevId(roomId);
      setCurrIdx(0);
      setIsFinished(false);
      changeHold("start")
    }
    

    if (questions.length > 0 && currIdx < questions.length) {
      if (currIdx > 0 && holdQ.ans === selectedAnswer) {
        changeScore(score + 1);
      }
      changeHold("next")
      if (currIdx  === questions.length) {
        setIsFinished(true);
        if (holdQ.ans === selectedAnswer) {
          changeScore(score + 1);
        }
      } else {
        const nextQuestion = questions[currIdx];
        changeQ(nextQuestion);
        setSelectedAnswer('');
        setCurrIdx(currIdx + 1);
      }
    } else {
      setIsFinished(true);
      if (holdQ.ans === selectedAnswer) {
        changeScore(score + 1);
      }
    }
  };

  return (
    <div>
      <h2>List of Questions:</h2>
      <input
        type="text"
        id="roomId"
        onChange={idChange}
        placeholder="Enter Room ID"
      />
      <button onClick={() => next(id)}>{holding}</button>
      <div>
        {isFinished ? (
          <Finish score={score} />
        ) : (
          holdQ.question && (
            <div>
              <strong>Question:</strong> {holdQ.question} <br />
              <div>
                <input
                  type="radio"
                  name="answer"
                  value={holdQ.option1}
                  checked={selectedAnswer === holdQ.option1}
                  onChange={handleAnswerChange}
                /> {holdQ.option1}
              </div>
              <div>
                <input
                  type="radio"
                  name="answer"
                  value={holdQ.option2}
                  checked={selectedAnswer === holdQ.option2}
                  onChange={handleAnswerChange}
                /> {holdQ.option2}
              </div>
              <div>
                <input
                  type="radio"
                  name="answer"
                  value={holdQ.option3}
                  checked={selectedAnswer === holdQ.option3}
                  onChange={handleAnswerChange}
                /> {holdQ.option3}
              </div>
              <div>
                <input
                  type="radio"
                  name="answer"
                  value={holdQ.option4}
                  checked={selectedAnswer === holdQ.option4}
                  onChange={handleAnswerChange}
                /> {holdQ.option4}
              </div>
              <strong>Room ID:</strong> {holdQ.roomId}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
