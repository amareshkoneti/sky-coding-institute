import React, { useEffect, useRef,useState } from "react";
import { MapPin, Phone, Mail, Clock, Building2 ,Instagram, Linkedin, Youtube} from "lucide-react";
import axios from 'axios';

// Particle System
const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particlesRef.current.forEach((particle, index) => {
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const dx = particle.x - particlesRef.current[j].x;
          const dy = particle.y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default function Address() {
  const [formData, setFormData] = useState({
      email: '',
      phone: '',
      address: '',
      query: ''
    });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const API = process.env.REACT_APP_BACKEND_URL;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`${API}/api/contact`, formData);
        setMsg("Your query has been sent!");
      } catch (err) {
        setMsg("Failed to send query. Try again later.");
      }
    };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      {/* Header Section */}
      <section 
        className="position-relative overflow-hidden py-5"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ParticleSystem />
        
        {/* Background Pattern */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1,
            zIndex: 2
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <MapPin size={48} className="me-3" style={{ color: '#ffd700' }} />
                <h1 
                  className="display-4 fw-bold mb-0"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 1s ease-out'
                  }}
                >
                  Contact Information
                </h1>
              </div>
              
              <p 
                className="lead mb-0"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '400',
                  color: '#e8e8e8',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  animation: 'fadeInUp 1s ease-out 0.3s both'
                }}
              >
                Get in touch with us for any inquiries or visit our campus
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div 
          className="position-absolute"
          style={{
            top: '20%',
            left: '10%',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 2
          }}
        ></div>
        <div 
          className="position-absolute"
          style={{
            top: '60%',
            right: '15%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse',
            zIndex: 2
          }}
        ></div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-5" style={{ marginTop: '-80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                {/* Main Address Card */}
                <div className="col-lg-8">
                  <div 
                    className="card h-100 border-0 shadow-lg"
                    style={{
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      background: 'white',
                      animation: 'fadeInUp 1s ease-out 0.6s both'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div className="card-body p-5">
                      <div className="d-flex align-items-center mb-4">
                        <div 
                          className="me-3"
                          style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Building2 size={24} color="white" />
                        </div>
                        <h2 
                          className="fw-bold mb-0"
                          style={{
                            color: '#1e3c72',
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '2rem'
                          }}
                        >
                          Our Address
                        </h2>
                      </div>
                      
                      <div className="mb-4">
                        <h5 
                          className="fw-bold mb-3"
                          style={{ 
                            color: '#1e3c72',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          IT Computer Institute
                        </h5>
                        <p 
                          className="mb-0"
                          style={{
                            fontSize: '1.2rem',
                            color: '#6c757d',
                            lineHeight: '1.8'
                          }}
                        >
                          123 Main Street,<br />
                          Hyderabad, Telangana - 500001<br />
                          India
                        </p>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div 
                              className="me-3"
                              style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(45deg, #28a745, #20c997)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Phone size={18} color="white" />
                            </div>
                            <div>
                              <p className="fw-bold mb-1" style={{ color: '#1e3c72' }}>Phone</p>
                              <p className="mb-0 text-muted">+91 98765 43210</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div 
                              className="me-3"
                              style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Mail size={18} color="white" />
                            </div>
                            <div>
                              <p className="fw-bold mb-1" style={{ color: '#1e3c72' }}>Email</p>
                              <a
                                href="mailto:support@itcomputerinstitute.com"
                                className="text-decoration-none text-muted"
                                style={{
                                  transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#1e3c72'}
                                onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                              >
                                support@itcomputerinstitute.com
                              </a>
                            </div>
                            
                          </div>
                          
                        </div>
                        
                      </div>
                      {/* Social Media Section */}
                        <section className="py-5 text-center">
                          <div className="container">
                            <h4 className="fw-bold mb-4" style={{ color: '#1e3c72' }}>
                              Connect With Us
                            </h4>
                            <div className="d-flex justify-content-center gap-4 flex-wrap">
                              {/* Instagram */}
                              <a href="https://www.instagram.com/your_profile" target="_blank" rel="noopener noreferrer">
                                <Instagram color="#E1306C" size={32} />
                              </a>

                              {/* LinkedIn */}
                              <a href="https://www.linkedin.com/in/your_profile" target="_blank" rel="noopener noreferrer">
                                <Linkedin color="#0077b5" size={32} />
                              </a>

                              {/* YouTube */}
                              <a href="https://www.youtube.com/channel/your_channel" target="_blank" rel="noopener noreferrer">
                                <Youtube color="#FF0000" size={32} />
                              </a>

                              {/* WhatsApp */}
                              <a href="https://wa.me/919956236756" target="_blank" rel="noopener noreferrer">
                                <img 
                                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                                  alt="WhatsApp" 
                                  style={{ width: 32, height: 32 }} 
                                />
                              </a>
                            </div>
                          </div>
                        </section>

                        {/* Updated Query Section */}
                        <section className="py-5">
                          <div className="container">
                            <div 
                              className="card border-0 shadow-lg"
                              style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white'
                              }}
                            >
                              <div className="card-body p-5">
                                <div className="text-center mb-4">
                                  <div 
                                    className="d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      background: 'rgba(255, 255, 255, 0.2)',
                                      borderRadius: '50%'
                                    }}
                                  >
                                    <Mail size={32} color="white" />
                                  </div>
                                  <h3 
                                    className="fw-bold mb-2" 
                                    style={{ 
                                      color: 'white',
                                      fontFamily: "'Poppins', sans-serif",
                                      fontSize: '2.2rem'
                                    }}
                                  >
                                    Send Us a Query
                                  </h3>
                                  <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                                    We'd love to hear from you. Drop us a message!
                                  </p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="row g-4">
                                  <div className="col-md-6">
                                    <div className="form-floating">
                                      <input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        className="form-control"
                                        id="floatingEmail"
                                        
                                        onChange={handleChange}
                                        style={{
                                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                          border: '2px solid rgba(255, 255, 255, 0.3)',
                                          borderRadius: '15px',
                                          color: 'white',
                                          fontSize: '1.1rem'
                                        }}
                                      />
                                      <label htmlFor="floatingEmail" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        Your Email
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-floating">
                                      <input 
                                        type="tel" 
                                        name="phone" 
                                        required 
                                        className="form-control"
                                        id="floatingPhone"
                                        
                                        onChange={handleChange}
                                        style={{
                                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                          border: '2px solid rgba(255, 255, 255, 0.3)',
                                          borderRadius: '15px',
                                          color: 'white',
                                          fontSize: '1.1rem'
                                        }}
                                      />
                                      <label htmlFor="floatingPhone" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        Phone Number
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="form-floating">
                                      <input 
                                        type="text" 
                                        name="address" 
                                        required 
                                        className="form-control"
                                        id="floatingAddress"
                                        
                                        onChange={handleChange}
                                        style={{
                                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                          border: '2px solid rgba(255, 255, 255, 0.3)',
                                          borderRadius: '15px',
                                          color: 'white',
                                          fontSize: '1.1rem'
                                        }}
                                      />
                                      <label htmlFor="floatingAddress" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        Your Address
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="form-floating">
                                      <textarea 
                                        name="query" 
                                        required 
                                        className="form-control"
                                        id="floatingQuery"
                                        placeholder="Your Query"
                                        rows="4"
                                        onChange={handleChange}
                                        style={{
                                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                          border: '2px solid rgba(255, 255, 255, 0.3)',
                                          borderRadius: '15px',
                                          color: 'white',
                                          fontSize: '1.1rem',
                                          minHeight: '120px'
                                        }}
                                      ></textarea>
                                      
                                    </div>
                                  </div>
                                  <div className="col-12 text-center">
                                    <button 
                                      type="submit" 
                                      className="btn btn-lg px-5 py-3"
                                      style={{
                                        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                                        border: 'none',
                                        borderRadius: '50px',
                                        color: '#1e3c72',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        transform: 'translateY(0)'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 12px 35px rgba(255, 215, 0, 0.4)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.3)';
                                      }}
                                    >
                                      Send Query
                                    </button>
                                  </div>
                                  {msg && (
                                    <div className="col-12">
                                      <div 
                                        className="alert alert-success text-center"
                                        style={{
                                          backgroundColor: 'rgba(40, 167, 69, 0.2)',
                                          border: '2px solid rgba(40, 167, 69, 0.5)',
                                          borderRadius: '15px',
                                          color: 'white'
                                        }}
                                      >
                                        {msg}
                                      </div>
                                    </div>
                                  )}
                                </form>
                              </div>
                            </div>
                          </div>
                        </section>

                    </div>
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="col-lg-4">
                  <div 
                    className="card h-100 border-0"
                    style={{
                      borderRadius: '25px',
                      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      animation: 'fadeInUp 1s ease-out 0.9s both'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 60, 114, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="card-body p-4 text-center">
                      <div 
                        className="mb-4"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: 'rgba(255, 215, 0, 0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto'
                        }}
                      >
                        <Clock size={32} color="#ffd700" />
                      </div>
                      
                      <h5 className="fw-bold mb-3" style={{ color: '#ffd700' }}>Office Hours</h5>
                      
                      <div className="text-start">
                        <div className="mb-2">
                          <small className="text-muted d-block">Monday - Friday</small>
                          <span className="fw-bold">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted d-block">Saturday</small>
                          <span className="fw-bold">9:00 AM - 4:00 PM</span>
                        </div>
                        <div>
                          <small className="text-muted d-block">Sunday</small>
                          <span className="fw-bold">Closed</span>
                        </div>
                      </div>
                      
                      <hr style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }} />
                      
                      <p className="mb-0" style={{ fontSize: '0.9rem', color: '#e8e8e8' }}>
                        Visit us during office hours or schedule an appointment for personalized consultation.
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with Get Directions Header */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <MapPin size={32} className="me-3" style={{ color: '#1e3c72' }} />
              <h3 
                className="fw-bold mb-0"
                style={{
                  color: '#1e3c72',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '2.5rem'
                }}
              >
                Get Directions
              </h3>
            </div>
            <p 
              className="text-muted mb-0"
              style={{ fontSize: '1.1rem' }}
            >
              Find us easily with the interactive map below
            </p>
          </div>
          
          <div 
            className="card border-0 shadow-lg"
            style={{
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.4399210908077!2d80.64486905798911!3d16.503873800567153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fab12587c72b%3A0x20aec0bac504143c!2sParvathaneni%20Brahmayya%20Siddhartha%20college%20of%20Arts%20%26%20Science!5e0!3m2!1sen!2sin!4v1749026288386!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .form-control:focus {
          background-color: rgba(255, 255, 255, 0.15) !important;
          border-color: rgba(255, 215, 0, 0.8) !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25) !important;
          color: white !important;
        }
        
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem !important;
          }
          
          .lead {
            font-size: 1.1rem !important;
          }
          
          .btn-lg {
            padding: 0.75rem 2rem !important;
            font-size: 1rem !important;
          }
            a:hover svg {
              transform: scale(1.1);
              transition: transform 0.2s;
            }

          
          .card-body {
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}