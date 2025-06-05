import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    const particleCount = 50;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const images = [
    { 
      src: "https://via.placeholder.com/400x300/1e3c72/ffffff?text=Modern+Classroom", 
      alt: "Modern Computer Lab", 
      category: "facilities",
      description: "State-of-the-art computer laboratory with latest equipment"
    },
    { 
      src: "https://via.placeholder.com/400x300/28a745/ffffff?text=Students+Learning", 
      alt: "Students in Action", 
      category: "students",
      description: "Our dedicated students working on programming projects"
    },
    { 
      src: "https://via.placeholder.com/400x300/ffd700/000000?text=Workshop+Session", 
      alt: "Technical Workshop", 
      category: "events",
      description: "Hands-on workshop on web development technologies"
    },
    { 
      src: "https://via.placeholder.com/400x300/6f42c1/ffffff?text=Certification+Day", 
      alt: "Certificate Distribution", 
      category: "events",
      description: "Annual certification ceremony for course completers"
    },
    { 
      src: "https://via.placeholder.com/400x300/dc3545/ffffff?text=Expert+Faculty", 
      alt: "Expert Instructor", 
      category: "faculty",
      description: "Our experienced faculty members guiding students"
    },
    { 
      src: "https://via.placeholder.com/400x300/17a2b8/ffffff?text=Project+Demo", 
      alt: "Project Presentation", 
      category: "students",
      description: "Students presenting their final year projects"
    },
    { 
      src: "https://via.placeholder.com/400x300/fd7e14/ffffff?text=Lab+Equipment", 
      alt: "Advanced Lab Setup", 
      category: "facilities",
      description: "Advanced networking and hardware laboratory"
    },
    { 
      src: "https://via.placeholder.com/400x300/e83e8c/ffffff?text=Industry+Visit", 
      alt: "Industry Visit", 
      category: "events",
      description: "Educational visit to leading tech companies"
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'building' },
    { id: 'facilities', name: 'Facilities', icon: 'building-2' },
    { id: 'students', name: 'Students', icon: 'graduation-cap' },
    { id: 'events', name: 'Events', icon: 'calendar-event' },
    { id: 'faculty', name: 'Faculty', icon: 'user-tie' },
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getIconSvg = (iconName) => {
    const icons = {
      'building': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 21h18v-2H3v2zm3-18h12v16h2V1H4v2zm4 4v2h2V7H8zm0 4v2h2v-2H8zm4-4v2h2V7h-2zm0 4v2h2v-2h-2z"/>
        </svg>
      ),
      'building-2': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1 0 2 0 3-1 5.16-1 9-5.45 9-11V7l-10-5z"/>
        </svg>
      ),
      'graduation-cap': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      ),
      'calendar-event': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      'user-tie': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      'camera': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5c1.38 0 2.5-1.12 2.5-2.5S13.38 10.5 12 10.5 9.5 11.62 9.5 13s1.12 2.5 2.5 2.5zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        </svg>
      ),
      'search': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      ),
      'x': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      ),
      'image': (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      )
    };
    return icons[iconName] || null;
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh', position: 'relative' }}>
      {/* Particle Background */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: '#1e3c72',
              borderRadius: '50%',
              opacity: particle.opacity,
              transition: 'all 0.05s linear'
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <section 
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div className="container text-center">
          <h1 
            className="display-4 fw-bold mb-3 d-flex align-items-center justify-content-center gap-3"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {getIconSvg('camera')} Gallery
          </h1>
          <p className="lead" style={{ color: '#e8e8e8', maxWidth: '600px', margin: '0 auto' }}>
            Explore our vibrant campus life, modern facilities, and memorable moments captured through our lens
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4" style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`btn px-4 py-2 d-flex align-items-center gap-2 ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                    style={{
                      background: activeCategory === category.id 
                        ? 'linear-gradient(45deg, #1e3c72, #2a5298)' 
                        : 'transparent',
                      color: activeCategory === category.id ? 'white' : '#1e3c72',
                      border: activeCategory === category.id ? 'none' : '2px solid #1e3c72',
                      borderRadius: '25px',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: activeCategory === category.id 
                        ? '0 4px 15px rgba(30, 60, 114, 0.3)' 
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeCategory !== category.id) {
                        e.target.style.background = 'linear-gradient(45deg, #1e3c72, #2a5298)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category.id) {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#1e3c72';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {getIconSvg(category.icon)} {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div className="row g-4">
            {filteredImages.map((img, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => openModal(img)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="card-img-top"
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'rgba(30, 60, 114, 0.8)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = 1;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = 0;
                      }}
                    >
                      <div
                        style={{ 
                          fontSize: '2rem', 
                          color: 'white',
                          background: 'rgba(255, 215, 0, 0.9)',
                          borderRadius: '50%',
                          padding: '10px',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getIconSvg('search')}
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center p-4">
                    <h6 
                      className="card-title fw-bold mb-2"
                      style={{ color: '#1e3c72' }}
                    >
                      {img.alt}
                    </h6>
                    <p 
                      className="card-text small text-muted mb-0"
                      style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
                    >
                      {img.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#6c757d' }}>
                {getIconSvg('image')}
              </div>
              <h4 style={{ color: '#6c757d' }}>No images found</h4>
              <p className="text-muted">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div 
          className="modal fade show d-block"
          style={{ 
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1050
          }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div 
              className="modal-content border-0"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="modal-header border-0 d-flex justify-content-between align-items-center"
                style={{ 
                  background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
                  color: 'white',
                  padding: '1rem 1.5rem'
                }}
              >
                <h5 className="modal-title fw-bold mb-0">{selectedImage.alt}</h5>
                <button 
                  type="button" 
                  className="btn p-0 border-0"
                  onClick={closeModal}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    opacity: 0.8
                  }}
                >
                  {getIconSvg('x')}
                </button>
              </div>
              <div className="modal-body p-0">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-100"
                  style={{ 
                    maxHeight: '60vh',
                    objectFit: 'contain'
                  }}
                />
                <div className="p-4">
                  <p className="mb-0 text-muted">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .card:hover .position-absolute {
          opacity: 1 !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .btn {
            font-size: 12px !important;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}