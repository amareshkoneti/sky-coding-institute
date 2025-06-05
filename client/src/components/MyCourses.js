import React, { useEffect, useState } from "react";

function MyCourses() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (!token || !userStr) {
        setError("You need to login.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userStr);
      const email = encodeURIComponent(user.email);

      try {
        const res = await fetch(`http://localhost:5000/api/registrations?email=${email}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch registrations.");

        const data = await res.json();
        setRegistrations(data);
      } catch (err) {
        setError(err.message || "Error fetching registrations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const LoadingState = () => (
    <div className="text-center py-5">
      <div className="mb-3 text-primary" style={{ fontSize: '3rem' }}>
        <i className="bi bi-book"></i>
      </div>
      <p className="lead" style={{ color: '#1e3c72' }}>Loading your registrations...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-5">
      <div className="mb-3 text-danger" style={{ fontSize: '3rem' }}>
        <i className="bi bi-exclamation-triangle-fill"></i>
      </div>
      <p className="lead" style={{ color: '#dc3545' }}>{error}</p>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-5">
      <div className="mb-3 text-secondary" style={{ fontSize: '3rem' }}>
        <i className="bi bi-journal-x"></i>
      </div>
      <p className="lead text-muted">You have not registered for any courses yet.</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold" style={{ color: '#1e3c72', fontFamily: "'Poppins', sans-serif" }}>My Registered Courses</h2>
          <p className="lead text-muted">Track your learning journey</p>
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState />}
        {!loading && !error && registrations.length === 0 && <EmptyState />}

        {!loading && !error && registrations.length > 0 && (
          <div className="row g-4">
            {registrations.map(reg => (
              <div key={reg._id} className="col-lg-6 col-md-12">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ borderRadius: '20px', transition: 'all 0.3s ease', background: 'white' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="me-3" style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(45deg, #28a745, #20c997)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        color: 'white'
                      }}>
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-2" style={{ color: '#1e3c72' }}>
                          {reg.courseId?.name || "Course name not available"}
                        </h5>
                        <div className="badge mb-2" style={{
                          background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                          color: '#1e3c72',
                          fontWeight: '500'
                        }}>
                          Enrolled
                        </div>
                      </div>
                    </div>
                    <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                      {reg.courseId?.description ?
                        (reg.courseId.description.length > 100 ?
                          reg.courseId.description.substring(0, 100) + "..." :
                          reg.courseId.description) :
                        "No description available"}
                    </p>
                    <div className="d-flex align-items-center text-muted">
                      <small>Registered on: {new Date(reg.registeredAt).toLocaleDateString()}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

export default MyCourses;
