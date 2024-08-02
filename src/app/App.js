"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'characters', label: 'Characters' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' }
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://my-backend-app-vd6w.onrender.com/bfhl', parsedJson);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error('Error details:', err); // Log the error for more details
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
            style={{ width: '100%', color: 'black' }} // Ensure full width and text color black
          />
        </div>
        <button type='submit' style={{ marginTop: '10px' }}>Submit</button>
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
            {selectedOptions.some(option => option.value === 'characters') && (
              <div>
                <strong>Characters:</strong> {response.alphabets?.join(', ')}
              </div>
            )}
            {selectedOptions.some(option => option.value === 'numbers') && (
              <div>
                <strong>Numbers:</strong> {response.numbers?.join(', ')}
              </div>
            )}
            {selectedOptions.some(option => option.value === 'highestAlphabet') && (
              <div>
                <strong>Highest Alphabet:</strong> {response.highest_alphabet?.join(', ')}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
