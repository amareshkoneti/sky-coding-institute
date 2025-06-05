import React, { useEffect, useRef } from "react";
import { 
  Target, 
  GraduationCap, 
  Monitor, 
  Users, 
  BookOpen, 
  Briefcase, 
  Headphones,
  TrendingUp,
  Eye,
  Award,
  Clock,
  CheckCircle
} from "lucide-react";

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

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <style jsx>{`
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          minHeight: '70vh',
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
            <div className="col-lg-10 text-center text-white">
              <h1 
                className="display-3 fw-bold mb-4"
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
                About IT Computer Institute
              </h1>
              
              <p 
                className="lead mb-4"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  color: '#e8e8e8',
                  maxWidth: '800px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  animation: 'fadeInUp 1s ease-out 0.3s both'
                }}
              >
                Excellence in Technical Education - Shaping Tomorrow's IT Professionals
              </p>
              
              <p 
                className="mb-5"
                style={{
                  fontSize: '1.1rem',
                  color: '#d1d1d1',
                  maxWidth: '700px',
                  margin: '0 auto 2rem',
                  lineHeight: '1.7',
                  animation: 'fadeInUp 1s ease-out 0.6s both'
                }}
              >
                We are committed to delivering high-quality technical education and guidance to help students 
                achieve their academic and professional goals in the rapidly evolving world of technology.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div 
          className="position-absolute"
          style={{
            top: '10%',
            left: '10%',
            width: '100px',
            height: '100px',
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
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse',
            zIndex: 2
          }}
        ></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 
                className="display-5 fw-bold mb-3"
                style={{
                  color: '#1e3c72',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Our Mission & Vision
              </h2>
              <p className="lead text-muted">
                Bridging the gap between academic learning and industry requirements
              </p>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 60, 114, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div className="card-body p-5">
                  <div 
                    className="mb-4"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 215, 0, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Target size={32} color="#ffd700" />
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: '#ffd700' }}>Our Mission</h4>
                  <p className="mb-0" style={{ lineHeight: '1.7' }}>
                    To provide world-class technical education that bridges the gap between academic learning 
                    and industry requirements, fostering innovation and excellence in every student while 
                    preparing them for real-world challenges in the IT industry.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(40, 167, 69, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div className="card-body p-5">
                  <div 
                    className="mb-4"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Eye size={32} color="#ffffff" />
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Our Vision</h4>
                  <p className="mb-0" style={{ lineHeight: '1.7' }}>
                    To become the leading IT education institute, recognized globally for producing skilled 
                    professionals who drive technological innovation and contribute to the digital transformation 
                    of society while maintaining the highest standards of integrity and excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 
                className="display-5 fw-bold mb-3"
                style={{
                  color: '#1e3c72',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Why Choose Us?
              </h2>
              <p className="lead text-muted">
                Discover what makes us the preferred choice for technical education
              </p>
            </div>
          </div>

          <div className="row g-4">
            {[
              {
                icon: <GraduationCap size={32} />,
                title: "Expert Faculty",
                description: "Learn from industry professionals with years of practical experience and academic excellence.",
                color: "#e74c3c"
              },
              {
                icon: <Monitor size={32} />,
                title: "Modern Infrastructure",
                description: "State-of-the-art computer labs with latest technology and software for hands-on learning.",
                color: "#3498db"
              },
              {
                icon: <BookOpen size={32} />,
                title: "Comprehensive Curriculum",
                description: "Industry-aligned courses covering both theoretical concepts and practical applications.",
                color: "#2ecc71"
              },
              {
                icon: <Users size={32} />,
                title: "Small Class Sizes",
                description: "Personalized attention with optimal student-to-instructor ratio for better learning outcomes.",
                color: "#f39c12"
              },
              {
                icon: <Briefcase size={32} />,
                title: "Placement Support",
                description: "Dedicated placement cell with strong industry connections and career guidance services.",
                color: "#9b59b6"
              },
              {
                icon: <Headphones size={32} />,
                title: "24/7 Student Support",
                description: "Round-the-clock academic and technical support to help students succeed in their journey.",
                color: "#1abc9c"
              }
            ].map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div 
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: '15px',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div className="card-body p-4 text-center">
                    <div 
                      className="mb-3"
                      style={{
                        width: '70px',
                        height: '70px',
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        color: 'white'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                      {feature.title}
                    </h5>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
        <div className="container">
          <div className="row text-center text-white">
            {[
              { number: "500+", label: "Students Trained", icon: <Users size={32} /> },
              { number: "15+", label: "Years Experience", icon: <Clock size={32} /> },
              { number: "95%", label: "Placement Rate", icon: <TrendingUp size={32} /> },
              { number: "50+", label: "Industry Partners", icon: <Award size={32} /> }
            ].map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div 
                  className="text-center"
                  style={{
                    animation: `fadeInUp 1s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div 
                    className="mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 215, 0, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      color: '#ffd700'
                    }}
                  >
                    {stat.icon}
                  </div>
                  <h3 className="display-4 fw-bold mb-2" style={{ color: '#ffd700' }}>
                    {stat.number}
                  </h3>
                  <p className="mb-0" style={{ fontSize: '1.1rem', color: '#e8e8e8' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 
                className="display-5 fw-bold mb-3"
                style={{
                  color: '#1e3c72',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Our Core Values
              </h2>
              <p className="lead text-muted">
                The principles that guide everything we do
              </p>
            </div>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Excellence",
                description: "We strive for the highest standards in education, maintaining quality that exceeds expectations."
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and teaching methodologies to stay ahead of industry trends."
              },
              {
                title: "Integrity",
                description: "We maintain honesty, transparency, and ethical practices in all our educational endeavors."
              },
              {
                title: "Student-Centric",
                description: "Every decision we make prioritizes student success and their future career prospects."
              },
              {
                title: "Collaboration",
                description: "We foster teamwork between students, faculty, and industry partners for mutual growth."
              },
              {
                title: "Continuous Learning",
                description: "We promote lifelong learning and adaptation to the ever-evolving technology landscape."
              }
            ].map((value, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div 
                  className="d-flex align-items-start p-4 h-100"
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div 
                    className="me-3 flex-shrink-0"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle size={24} color="white" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                      {value.title}
                    </h5>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-5 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4" style={{ color: '#ffd700' }}>
                Ready to Start Your IT Journey?
              </h2>
              <p className="lead mb-4" style={{ color: '#e8e8e8' }}>
                Join thousands of successful students who have launched their careers with us. 
                Take the first step towards your bright future in technology.
              </p>
              
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div 
          className="position-absolute"
          style={{
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite',
            zIndex: 1
          }}
        ></div>
      </section>
    </div>
  );
}