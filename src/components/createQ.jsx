import React, { useState } from 'react';

function CreateQ() {
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    ans: '',
    roomId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/create-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Optionally reset the form
        setFormData({
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          ans: '',
          roomId: ''
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">Question:</label>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Option 1:</label>
        <input
          type="text"
          name="option1"
          value={formData.option1}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Option 2:</label>
        <input
          type="text"
          name="option2"
          value={formData.option2}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Option 3:</label>
        <input
          type="text"
          name="option3"
          value={formData.option3}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Option 4:</label>
        <input
          type="text"
          name="option4"
          value={formData.option4}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Answer:</label>
        <input
          type="text"
          name="ans"
          value={formData.ans}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Room Id if Already Created</label>
        <input
          type="text"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
}

export default CreateQ;
