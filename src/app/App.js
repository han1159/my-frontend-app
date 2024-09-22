"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' }
  ];

  useEffect(() => {
    // Update the document title to the user's roll number
    document.title = "RA2111003020422";
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput); // Ensure input is valid JSON
      const res = await axios.post('https://my-backend-app-vd6w.onrender.com/bfhl', parsedJson); // Update with your backend URL
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error('Error details:', err);
      setError('Invalid JSON format or API error');
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='Enter JSON here'
            rows="4"
            cols="50"
            style={{ width: '100%', color: 'black' }}
          />
        </div>
        <button type='submit' style={{
            marginTop: '10px',
            backgroundColor: 'blue',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
            width: '100%'
          }}>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            value={selectedOptions}
            placeholder="Multi Filter"
            style={{ marginTop: '10px' }}
          />
          <div style={{ marginTop: '20px' }}>
            <h2>Filtered Response</h2>
            {selectedOptions.some(option => option.value === 'alphabets') && (
              <div style={{color: 'black'}}>
                <strong>Alphabets:</strong> {response.alphabets?.join(', ')}
              </div>
            )}
            {selectedOptions.some(option => option.value === 'numbers') && (
              <div style={{color: 'black'}}>
                <strong>Numbers:</strong> {response.numbers?.join(', ')}
              </div>
            )}
            {selectedOptions.some(option => option.value === 'highestLowercaseAlphabet') && (
              <div style={{color: 'black'}}>
                <strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet?.join(', ')}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
