import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Header - Mobile Optimized */}
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
            SKY CODING INSTITUTE
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
            Gateway to Innovation
          </p>
        </div>

        {/* Right: Contact Info */}
        <div className="d-none d-lg-block text-end">
          <div style={{ color: '#ffd700', fontSize: '14px', fontWeight: '600' }}>
            <i className="bi bi-telephone-fill me-2"></i>+91-9956236756
          </div>
          <div style={{ color: '#e8e8e8', fontSize: '12px' }}>
            <i className="bi bi-envelope-fill me-2"></i>skycodinginstitute@gmail.com
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className="navbar navbar-expand-lg sticky-top"
        style={{ 
          background: 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e9ecef',
          minHeight: '70px'
        }}
      >
        <div className="container">
          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler border-0 ms-auto"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              boxShadow: 'none',
              padding: '8px 12px',
              background: isMenuOpen ? '#f8f9fa' : 'transparent'
            }}
          >
            <span 
              style={{
                display: 'block',
                width: '25px',
                height: '3px',
                background: '#2c3e50',
                margin: '5px 0',
                transition: '0.3s',
                transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'
              }}
            />
            <span 
              style={{
                display: 'block',
                width: '25px',
                height: '3px',
                background: '#2c3e50',
                margin: '5px 0',
                transition: '0.3s',
                opacity: isMenuOpen ? '0' : '1'
              }}
            />
            <span 
              style={{
                display: 'block',
                width: '25px',
                height: '3px',
                background: '#2c3e50',
                margin: '5px 0',
                transition: '0.3s',
                transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'
              }}
            />
          </button>

          {/* Navigation Menu */}
          <div 
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
            style={{
              transition: 'all 0.3s ease'
            }}
          >
            <ul className="navbar-nav mx-auto d-flex align-items-center gap-1">
              {/* Navigation Links */}
              {[
                { to: "/", icon: "bi-house-door-fill", text: "Home" },
                { to: "/gallery", icon: "bi-images", text: "Gallery" },
                { to: "/courses", icon: "bi-book-fill", text: "Courses" },
                { to: "/about", icon: "bi-info-circle-fill", text: "About Us" },
                { to: "/address", icon: "bi-geo-alt-fill", text: "Address" },
                { to: "/verify-certificate", icon: "bi-award-fill", text: "Verify Certificate" }
              ].map((item, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    className="nav-link px-3 py-2 d-flex align-items-center gap-2 text-center"
                    to={item.to}
                    onClick={closeMenu}
                    style={{ 
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#2c3e50",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      borderRadius: "20px",
                      whiteSpace: "nowrap"
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
                    <i className={`bi ${item.icon}`}></i> 
                    <span className="d-lg-inline">{item.text}</span>
                  </Link>
                </li>
              ))}

              {/* Authentication Buttons */}
              {!token ? (
                <li className="nav-item d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0 ms-lg-3">
                  <Link 
                    className="btn px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                    to="/signup"
                    onClick={closeMenu}
                    style={{ 
                      fontSize: "14px",
                      fontWeight: "600",
                      background: "linear-gradient(45deg, #28a745, #20c997)",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)",
                      minWidth: "120px"
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
                  <Link 
                    className="btn px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                    to="/login"
                    onClick={closeMenu}
                    style={{ 
                      fontSize: "14px",
                      fontWeight: "600",
                      background: "linear-gradient(45deg, #dc3545, #e74c3c)",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)",
                      minWidth: "120px"
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
              ) : (
                <li className="nav-item dropdown mt-3 mt-lg-0 ms-lg-3">
                  <button
                    className="btn dropdown-toggle d-flex align-items-center justify-content-center gap-2 px-4 py-2"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ 
                      fontSize: "14px",
                      fontWeight: "600",
                      background: "linear-gradient(45deg, #6f42c1, #8b5cf6)",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(111, 66, 193, 0.3)",
                      minWidth: "120px"
                    }}
                  >
                    <i className="bi bi-person-circle" style={{ fontSize: "16px" }}></i>
                    Profile
                  </button>
                  <ul 
                    className="dropdown-menu dropdown-menu-end border-0"
                    style={{
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      background: "white",
                      overflow: "hidden",
                      minWidth: "200px"
                    }}
                  >
                    <li>
                      <Link 
                        className="dropdown-item py-3 px-4 d-flex align-items-center gap-2"
                        to="/my-courses"
                        onClick={closeMenu}
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className="bi bi-journal-bookmark-fill"></i> Registered Courses
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item py-3 px-4 d-flex align-items-center gap-2"
                        to="/study-materials"
                        onClick={closeMenu}
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className="bi bi-award-fill"></i> Study Materials
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider m-0" /></li>
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

      {/* Enhanced Mobile Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        /* Mobile Optimizations */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: white;
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
          }
          
          .navbar-nav {
            width: 100%;
          }
          
          .nav-item {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          
          .nav-link {
            padding: 0.75rem 1rem !important;
            justify-content: center !important;
            border-radius: 10px !important;
            text-align: center;
          }
          
          .btn {
            width: 100%;
            margin-bottom: 0.5rem;
            justify-content: center !important;
          }
          
          .dropdown-menu {
            position: static !important;
            float: none !important;
            width: 100% !important;
            margin-top: 0.5rem !important;
            border-radius: 10px !important;
          }
        }
        
        @media (max-width: 576px) {
          .top-header {
            padding: 0.75rem !important;
          }
          
          .container-fluid {
            padding: 0 !important;
          }
        }
        
        /* Smooth animations */
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
        
        /* Custom hamburger animation */
        .navbar-toggler:focus {
          box-shadow: none !important;
        }
        
        /* Ensure proper spacing on all devices */
        .navbar {
          padding: 0.5rem 0;
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 991.98px) {
          .nav-link, .btn, .dropdown-item {
            min-height: 44px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;