import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        alert('Error submitting form.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>Lead Generation Form</h1>
      {submitted ? <p>Thanks for your message!</p> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name *</label><br />
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          </div>

          <div>
            <label>Email *</label><br />
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>

          <div>
            <label>Company</label><br />
            <input type="text" name="company" value={formData.company} onChange={handleChange} />
          </div>

          <div>
            <label>Message</label><br />
            <textarea name="message" value={formData.message} onChange={handleChange} />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
