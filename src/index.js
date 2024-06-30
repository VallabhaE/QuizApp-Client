import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import CreateQ from './components/createQ';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
function RootComponent() {
  const [showCreateQ, setShowCreateQ] = useState(false);

  const handleToggle = () => {
    setShowCreateQ(prevState => !prevState);
  };

  return (
    <React.StrictMode>
      <div class="navBar">
      <button class="HeadderButton" onClick={handleToggle}>
        {showCreateQ ? "WriteQuiz" : "CreateQuiz"}
      </button>
      </div>
      {showCreateQ ? <CreateQ /> : <App />}
    </React.StrictMode>
  );


}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootComponent />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
