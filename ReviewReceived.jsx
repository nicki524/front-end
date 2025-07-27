
import React, { useState } from 'react';

function ReviewReceived() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    platform: '',
    rating: ''
  });
  const [status, setStatus] = useState('');

  const webhookURL = 'https://shayani1.app.n8n.cloud/webhook-test/review-received';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-center">Mark Review as Received</h2>
        {['phone', 'email', 'platform', 'rating'].map(field => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Submit
        </button>
        <p className="text-center text-sm text-gray-700 mt-2">{status}</p>
      </form>
    </div>
  );
}

export default ReviewReceived;
