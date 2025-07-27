
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    service_type: '',
    tradesman_id: '',
    job_details: ''
  });
  const [status, setStatus] = useState('');

  const webhookURL = 'https://shayani1.app.n8n.cloud/webhook-test/job-completed';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      setStatus(json.message || 'Success!');
    } catch (err) {
      setStatus('Error sending data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md p-8 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Submit Job Completion</h1>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key.replace('_', ' ')}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit
        </button>
        <p className="text-center text-sm text-gray-700 mt-2">{status}</p>
      </form>
    </div>
  );
}

export default App;
        