import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', color: '#f8fafc', textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <p style={{ margin: '10px 0 20px 0' }}>Have questions or feedback? Send us a message!</p>

      {submitted ? (
        <div style={{ backgroundColor: '#22c55e', padding: '15px', borderRadius: '8px', color: 'white' }}>
          Thank you! Your message has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <textarea
            placeholder="Your Message..."
            rows="4"
            required
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;

