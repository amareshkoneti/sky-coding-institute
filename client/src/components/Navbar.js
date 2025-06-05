import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Top Header with enhanced professional styling */}
      <div 
        className="top-header d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderBottom: '3px solid #ffd700'
        }}
      >
        {/* Left: Logo with enhanced styling */}
        <div className="d-flex align-items-center">
          <div 
            style={{
              background: 'white',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            <img
              src="/logo.png"
              alt="Institute Logo"
              height="60"
              className="me-3"
              style={{ 
                maxWidth: '70px',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>

        {/* Center: Institute Name with professional styling */}
        <div className="text-center flex-grow-1">
          <h1
            className="mb-0 fw-bold text-uppercase"
            style={{
              color: "#ffffff",
              fontFamily: "'Poppins', 'Arial', sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              letterSpacing: "2px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            IT COMPUTER INSTITUTE
          </h1>
          <p 
            className="mb-0 mt-1"
            style={{
              color: '#e8e8e8',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '1px'
            }}
          >
            Excellence in Technical Education
          </p>
        </div>

        {/* Right: Contact Info */}
        <div className="d-none d-lg-block text-end">
          <div style={{ color: '#ffd700', fontSize: '14px', fontWeight: '600' }}>
            <i className="bi bi-telephone-fill me-2"></i>+91-XXXXX-XXXXX
          </div>
          <div style={{ color: '#e8e8e8', fontSize: '12px' }}>
            <i className="bi bi-envelope-fill me-2"></i>info@itinstitute.com
          </div>
        </div>
      </div>

      {/* Main Navigation with professional styling */}
      <nav 
        className="navbar navbar-expand-lg sticky-top"
        style={{ 
          background: 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e9ecef'
        }}
      >
        <div className="container">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{
              boxShadow: 'none',
              padding: '8px 12px'
            }}
          >
            <span 
              className="navbar-toggler-icon"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
              }}
            />
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav d-flex gap-3 align-items-center">
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                  to="/" 
                  style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "25px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1e3c72";
                    e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2c3e50";
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-house-door-fill"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                  to="/gallery" 
                  style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "25px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1e3c72";
                    e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2c3e50";
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-images"></i> Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                  to="/courses" 
                  style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "25px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1e3c72";
                    e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2c3e50";
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-book-fill"></i> Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                  to="/about" 
                  style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "25px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1e3c72";
                    e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2c3e50";
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-info-circle-fill"></i> About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                  to="/address" 
                  style={{ 
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2c3e50",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "25px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1e3c72";
                    e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2c3e50";
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-geo-alt-fill"></i> Address
                </Link>
              </li>
              <li>
                <Link 
                    className="nav-link position-relative px-3 py-2 d-flex align-items-center gap-2"
                    to="/verify-certificate"
                    style={{
                     fontSize: "16px",
                      fontWeight: "600",
                      color: "#2c3e50",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      borderRadius: "25px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#1e3c72";
                      e.target.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#2c3e50";
                      e.target.style.background = "transparent";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-award-fill"></i> Verify Certificate
                  </Link>
              </li>

              {!token ? (
                <>
                  <li className="nav-item ms-3">
                    <Link 
                      className="btn px-4 py-2 d-flex align-items-center gap-2"
                      to="/signup" 
                      style={{ 
                        fontSize: "15px",
                        fontWeight: "600",
                        background: "linear-gradient(45deg, #28a745, #20c997)",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.3)";
                      }}
                    >
                      <i className="bi bi-person-plus-fill"></i> Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className="btn px-4 py-2 d-flex align-items-center gap-2"
                      to="/login" 
                      style={{ 
                        fontSize: "15px",
                        fontWeight: "600",
                        background: "linear-gradient(45deg, #dc3545, #e74c3c)",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 20px rgba(220, 53, 69, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(220, 53, 69, 0.3)";
                      }}
                    >
                      <i className="bi bi-box-arrow-in-right"></i> Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown ms-3">
                  <button
                    className="btn dropdown-toggle d-flex align-items-center gap-2 px-4 py-2"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ 
                      fontSize: "15px",
                      fontWeight: "600",
                      background: "linear-gradient(45deg, #6f42c1, #8b5cf6)",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(111, 66, 193, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(111, 66, 193, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(111, 66, 193, 0.3)";
                    }}
                  >
                    <i className="bi bi-person-circle" style={{ fontSize: "18px" }}></i>
                    Profile
                  </button>
                  <ul 
                    className="dropdown-menu dropdown-menu-end border-0"
                    aria-labelledby="profileDropdown"
                    style={{
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      background: "white",
                      overflow: "hidden"
                    }}
                  >
                    <li>
                      <Link 
                        className="dropdown-item py-3 px-4 d-flex align-items-center gap-2"
                        to="/my-courses"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "linear-gradient(45deg, #f8f9fa, #e9ecef)";
                          e.target.style.color = "#1e3c72";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#495057";
                        }}
                      >
                        <i className="bi bi-journal-bookmark-fill"></i> Registered Courses
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item py-3 px-4 d-flex align-items-center gap-2"
                        to="/study-materials"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "linear-gradient(45deg, #f8f9fa, #e9ecef)";
                          e.target.style.color = "#1e3c72";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#495057";
                        }}
                      >
                        <i className="bi bi-award-fill"></i> Study Materials
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider m-0" style={{ background: "#dee2e6" }} /></li>
                    <li>
                      <button 
                        className="dropdown-item py-3 px-4 text-danger d-flex align-items-center gap-2"
                        onClick={handleLogout}
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          border: "none",
                          background: "transparent",
                          width: "100%",
                          textAlign: "left"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "linear-gradient(45deg, #fff5f5, #fed7d7)";
                          e.target.style.color = "#dc3545";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#dc3545";
                        }}
                      >
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Add custom styles for better responsiveness */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        @media (max-width: 768px) {
          .top-header {
            flex-direction: column !important;
            text-align: center !important;
            padding: 1rem !important;
          }
          
          .top-header > div {
            margin-bottom: 0.5rem;
          }
          
          .navbar-nav {
            text-align: center;
            gap: 0.5rem !important;
          }
          
          .nav-item {
            margin: 0.25rem 0;
          }
          
          .nav-link, .btn {
            justify-content: center !important;
          }
        }
        
        .dropdown-menu {
          animation: fadeInDown 0.3s ease;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;