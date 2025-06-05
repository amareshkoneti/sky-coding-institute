import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    address: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      setMsg(res.data.msg);
      setError(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        address: ""
      });
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      setMsg(err.response?.data?.msg || "Signup failed");
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
        maxWidth: '600px'
      }}>
        <h2 style={{ 
          color: '#1e3c72', 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Join Us Today
        </h2>

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
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <input
            name="dob"
            value={form.dob}
            onChange={handleChange}
            type="date"
            placeholder="Date of Birth"
            required
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Residential Address"
            required
            rows={3}
            style={{ ...inputStyle, resize: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            style={{ ...inputStyle, marginBottom: '2rem' }}
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
