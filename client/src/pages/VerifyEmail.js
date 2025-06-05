import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = process.env.REACT_APP_BACKEND_URL;

      const res = await axios.post(`${API}/api/auth/verify`, {email,otp});

      setMsg(res.data.msg);
      setError(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Verification failed");
      setError(true);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e9ecef',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          color: '#1e3c72', 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          Verify Your Email
        </h2>
        
        <p style={{
          color: '#666',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          Enter the OTP sent to your email address
        </p>

        {msg && (
          <div style={{
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            background: error ? '#fee' : '#efe',
            color: error ? '#c33' : '#363',
            border: `1px solid ${error ? '#fcc' : '#cfc'}`
          }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            style={{...inputStyle, marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.2rem', fontSize: '1.2rem'}}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}