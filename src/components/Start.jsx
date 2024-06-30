import React,{useState} from "react";
import CreateQ from "./createQ";
import App from "./App";
function Start() {
    const [showCreateQ, setShowCreateQ] = useState(false);
  
    const handleToggle = () => {
      setShowCreateQ(prevState => !prevState);
    };
  
    return (
        <div>
        <button class="HeadderButton" onClick={handleToggle}>
          {showCreateQ ? "WriteQuiz" : "CreateQuiz"}
        </button>
        {showCreateQ ? <CreateQ /> : <App />}
        </div>
       
      
    );
  
  
  }


  export default Start;