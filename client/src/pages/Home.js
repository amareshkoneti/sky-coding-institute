import React, { useEffect, useRef } from "react";
import { Rocket, Phone, GraduationCap, Monitor, Trophy, Users, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const particlesRef = useRef(null);

  useEffect(() => {
    // Particle.js configuration and initialization
    const createParticles = () => {
      const canvas = particlesRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = 100;

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.size = Math.random() * 2 + 1;
          this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.fill();
        }
      }

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    const cleanup = createParticles();
    return cleanup;
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
      {/* Hero Section */}
      <section
        className="position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Particle Canvas */}
        <canvas
          ref={particlesRef}
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Background Pattern */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1,
            zIndex: 0
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center text-white">
              <h1
                className="display-3 fw-bold mb-4"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  animation: "fadeInUp 1s ease-out",
                }}
              >
                Welcome to SKY CODING INSTITUTE
              </h1>

              <p
                className="lead mb-4"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  color: "#e8e8e8",
                  maxWidth: "800px",
                  margin: "0 auto",
                  lineHeight: "1.6",
                  animation: "fadeInUp 1s ease-out 0.3s both",
                }}
              >
                Gateway to Innovation
                <br></br>
                Empowering students with knowledge, skills, and confidence to achieve academic and career success.
              </p>

              <p
                className="mb-5"
                style={{
                  fontSize: "1.1rem",
                  color: "#d1d1d1",
                  maxWidth: "700px",
                  margin: "0 auto 2rem",
                  lineHeight: "1.7",
                  animation: "fadeInUp 1s ease-out 0.6s both",
                }}
              >
                Explore our wide range of courses, experienced faculty, and a supportive learning environment tailored
                to help you thrive. Let's build your future together.
              </p>

              <div
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center"
                style={{ animation: "fadeInUp 1s ease-out 0.9s both" }}
              >
                <button
                  className="btn btn-lg px-5 py-3 d-flex align-items-center gap-2"
                  onClick={() => handleNavigation("/courses")}
                  style={{
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                    color: "#1e3c72",
                    border: "none",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    boxShadow: "0 6px 20px rgba(255, 215, 0, 0.4)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(255, 215, 0, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 6px 20px rgba(255, 215, 0, 0.4)";
                  }}
                >
                  <Rocket size={20} />
                  Explore Courses
                </button>

                <button
                  className="btn btn-lg btn-outline px-5 py-3 d-flex align-items-center gap-2"
                  onClick={() => navigate("/address")}
                  style={{
                    color: "white",
                    border: "2px solid #ffd700",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    background: "transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ffd700";
                    e.target.style.color = "#1e3c72";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <Phone size={20} />
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div
          className="position-absolute"
          style={{
            top: "10%",
            left: "10%",
            width: "100px",
            height: "100px",
            background: "rgba(255, 215, 0, 0.1)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
            zIndex: 1
          }}
        ></div>
        <div
          className="position-absolute"
          style={{
            top: "60%",
            right: "15%",
            width: "80px",
            height: "80px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            animation: "float 4s ease-in-out infinite reverse",
            zIndex: 1
          }}
        ></div>
      </section>
      {/* Moving Text Ticker */}
      <div
        className="position-relative overflow-hidden"
        style={{
          background: "#f8f9fa",
          padding: "15px 0",
          borderTop: "3px solid #dc3545",
          borderBottom: "3px solid #dc3545"
        }}
      >
        <div
          className="ticker-content"
          style={{
            whiteSpace: "nowrap",
            animation: "scroll 30s linear infinite",
            color: "#dc3545",
            fontSize: "1.2rem",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif"
          }}
        >
           • LIMITED SEATS AVAILABLE • INDUSTRY-CERTIFIED COURSES •  CALL NOW FOR ADMISSION! • EXPERT FACULTY TRAINING •
        </div>
      </div>


      {/* Carousel Section */}
      <section className="py-5">
        <div id="educationCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#educationCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#educationCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#educationCarousel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/c1.jpg"
                className="d-block w-100"
                alt="Inspiring Learning"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Inspiring Learning</h5>
                <p>Unleash your potential with our tailored education programs.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="s2.jpg"
                className="d-block w-100"
                alt="Expert Faculty"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Expert Faculty</h5>
                <p>Learn from industry professionals dedicated to your success.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="c3.jpg"
                className="d-block w-100"
                alt="Success Stories"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Success Stories</h5>
                <p>Join thousands of students who have achieved their dreams.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#educationCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#educationCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2
                className="display-5 fw-bold mb-3"
                style={{
                  color: "#1e3c72",
                  fontFamily: "'Poppins', sans-serif",
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
            <div className="col-lg-4 col-md-6">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(45deg, #1e3c72, #2a5298)",
                      borderRadius: "50%",
                      margin: "0 auto",
                      color: "white"
                    }}
                  >
                    <GraduationCap size={32} />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: "#1e3c72" }}>
                    Expert Faculty
                  </h5>
                  <p className="text-muted">
                    Learn from industry professionals with years of practical experience and academic excellence.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(45deg, #28a745, #20c997)",
                      borderRadius: "50%",
                      margin: "0 auto",
                      color: "white"
                    }}
                  >
                    <Monitor size={32} />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: "#1e3c72" }}>
                    Modern Curriculum
                  </h5>
                  <p className="text-muted">
                    Stay ahead with updated course content that matches current industry standards and trends.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                      borderRadius: "50%",
                      margin: "0 auto",
                      color: "#1e3c72"
                    }}
                  >
                    <Trophy size={32} />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: "#1e3c72" }}>
                    Proven Results
                  </h5>
                  <p className="text-muted">
                    Join thousands of successful graduates who have achieved their career goals with our training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-5 position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
        }}
      >
        {/* Subtle background pattern */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1,
          }}
        ></div>
        
        <div className="container position-relative">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex flex-column align-items-center">
                <Users size={48} className="mb-3" style={{ color: "#ffd700" }} />
                <div className="h2 fw-bold mb-2" style={{ color: "#ffd700", fontSize: "3rem" }}>
                  1000+
                </div>
                <p className="mb-0">Happy Students</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex flex-column align-items-center">
                <GraduationCap size={48} className="mb-3" style={{ color: "#ffd700" }} />
                <div className="h2 fw-bold mb-2" style={{ color: "#ffd700", fontSize: "3rem" }}>
                  50+
                </div>
                <p className="mb-0">Expert Instructors</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex flex-column align-items-center">
                <BookOpen size={48} className="mb-3" style={{ color: "#ffd700" }} />
                <div className="h2 fw-bold mb-2" style={{ color: "#ffd700", fontSize: "3rem" }}>
                  25+
                </div>
                <p className="mb-0">Courses Available</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex flex-column align-items-center">
                <Star size={48} className="mb-3" style={{ color: "#ffd700" }} />
                <div className="h2 fw-bold mb-2" style={{ color: "#ffd700", fontSize: "3rem" }}>
                  95%
                </div>
                <p className="mb-0">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .ticker-content {
          display: inline-block;
        }

        .carousel-item img {
          filter: brightness(0.7);
          transition: filter 0.3s ease;
        }

        .carousel-item:hover img {
          filter: brightness(0.8);
        }

        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem !important;
          }

          .lead {
            font-size: 1.2rem !important;
          }

          .btn-lg {
            padding: 0.75rem 2rem !important;
            font-size: 1rem !important;
          }
          
          .d-flex.gap-2 {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }

          .ticker-content {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
}