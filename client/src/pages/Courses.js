import React, { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import { BookOpen, Clock } from "lucide-react";

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

const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  const user = getUserInfo();
  const API = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
      fetch(`${API}/api/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleRegister = async (courseId) => {
    if (!user) {
      setMessage("Please login to register for a course.");
      return;
    }

    setLoadingCourseId(courseId);
    setMessage("");

    try {
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          courseId,
        }),
      });

      const result = await res.json();
      setMessage(res.ok ? "Successfully registered for the course!" : result.message || "Registration failed.");
    } catch (error) {
      setMessage("Error occurred. Please try again.");
    }

    setLoadingCourseId(null);
    document.getElementById("closeModalBtn")?.click();
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    const modal = new Modal(document.getElementById("courseModal"));
    modal.show();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      {/* Header Section */}
      <section 
        className="position-relative overflow-hidden py-5"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          minHeight: '50vh',
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
        />

        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center text-white">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <BookOpen size={48} className="me-3" style={{ color: '#ffd700' }} />
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
                  Available Courses
                </h1>
              </div>
              
              <p 
                className="lead mb-4"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '400',
                  color: '#e8e8e8',
                  maxWidth: '700px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  animation: 'fadeInUp 1s ease-out 0.3s both'
                }}
              >
                Discover our comprehensive range of IT courses designed to boost your career in technology
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
        />
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
        />
      </section>

      {/* Courses Content Section */}
      <section className="py-5" style={{ marginTop: '-80px' }}>
        <div className="container">
          {/* Message Alert */}
          {message && (
            <div className="row justify-content-center mb-4">
              <div className="col-lg-8">
                <div 
                  className="alert border-0 shadow-lg"
                  style={{ 
                    background: message.includes('Success') 
                      ? 'linear-gradient(45deg, #28a745, #20c997)' 
                      : 'linear-gradient(45deg, #ffd700, #ffed4e)', 
                    color: message.includes('Success') ? 'white' : '#1e3c72',
                    borderRadius: '15px', 
                    fontWeight: '500',
                    animation: 'fadeInUp 0.5s ease-out'
                  }}
                >
                  {message}
                </div>
              </div>
            </div>
          )}
          
          <div className="row g-4">
            {courses.map((course, index) => (
              <div key={course._id} className="col-lg-4 col-md-6">
                <div 
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    animation: `fadeInUp 1s ease-out ${0.2 * index}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body d-flex flex-column p-4">
                    <h5 
                      className="fw-bold mb-3"
                      style={{ 
                        color: '#1e3c72',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {course.name}
                    </h5>
                    
                    <div className="mb-3">
                      <span 
                        className="badge px-3 py-2 d-inline-flex align-items-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                          color: 'white', 
                          borderRadius: '20px', 
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        <Clock size={14} className="me-2" />
                        {course.duration}
                      </span>
                    </div>
                    
                    <p 
                      className="text-muted flex-grow-1 mb-4"
                      style={{ lineHeight: '1.6' }}
                    >
                      {course.description.length > 100 ? course.description.substring(0, 100) + "..." : course.description}
                    </p>
                    
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <button
                        className="btn px-4 py-2"
                        onClick={() => openModal(course)}
                        style={{ 
                          background: 'linear-gradient(45deg, #ffd700, #ffed4e)', 
                          color: '#1e3c72', 
                          border: 'none', 
                          borderRadius: '25px', 
                          fontWeight: '600', 
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
                        }}
                      >
                        View Details
                      </button>
                      {!user && <span className="text-muted small">Login to register</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Enhanced Style */}
      <div className="modal fade" id="courseModal" tabIndex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div 
            className="modal-content border-0 shadow-lg" 
            style={{ borderRadius: '25px' }}
          >
            <div 
              className="modal-header border-0" 
              style={{ 
                background: 'linear-gradient(45deg, #1e3c72, #2a5298)', 
                color: 'white', 
                borderRadius: '25px 25px 0 0',
                padding: '1.5rem'
              }}
            >
              <h5 
                className="modal-title fw-bold" 
                id="courseModalLabel"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {selectedCourse?.name}
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                data-bs-dismiss="modal" 
                aria-label="Close" 
                id="closeModalBtn"
              />
            </div>
            
            <div className="modal-body p-4">
              <div className="mb-3">
                <div className="d-flex align-items-center mb-3">
                  <Clock size={20} className="me-2" style={{ color: '#1e3c72' }} />
                  <strong style={{ color: '#1e3c72' }}>Duration: {selectedCourse?.duration}</strong>
                </div>
              </div>
              <p 
                className="text-muted" 
                style={{ lineHeight: '1.7', fontSize: '1.05rem' }}
              >
                {selectedCourse?.description}
              </p>
            </div>
            
            <div className="modal-footer border-0 p-4">
              {user ? (
                <button
                  className="btn px-4 py-2 me-2"
                  disabled={loadingCourseId === selectedCourse?._id}
                  onClick={() => handleRegister(selectedCourse._id)}
                  style={{ 
                    background: loadingCourseId === selectedCourse?._id 
                      ? '#6c757d' 
                      : 'linear-gradient(45deg, #ffd700, #ffed4e)', 
                    color: '#1e3c72', 
                    border: 'none', 
                    borderRadius: '25px', 
                    fontWeight: '600',
                    minWidth: '120px'
                  }}
                >
                  {loadingCourseId === selectedCourse?._id ? "Registering..." : "Register"}
                </button>
              ) : (
                <p className="text-muted mb-0">Please login to register.</p>
              )}
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 py-2" 
                data-bs-dismiss="modal" 
                style={{ borderRadius: '25px', fontWeight: '500' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

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
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem !important;
          }
          
          .lead {
            font-size: 1.1rem !important;
          }
          
          .card-body {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Courses;