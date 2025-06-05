import React, { useState } from 'react';
import { Search, Award, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export default function Certificate() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [error, setError] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const handleRetrieve = async () => {

    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${API}/api/certificates/${certificateNumber}`);
      if (!res.ok) {
        throw new Error('Fetch failed');
      }

      const data = await res.json();
      setCertificateUrl(data.url);
      setError('');
    } catch (err) {
      console.error(err);
      setCertificateUrl('');
      setError('Certificate not found');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold" style={{ color: '#1e3c72', fontFamily: "'Poppins', sans-serif" }}>
            Verify Certificate
          </h2>
          <p className="lead text-muted">Verify the authenticity of your certificate</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div 
              className="card border-0 shadow-sm"
              style={{ 
                borderRadius: '20px', 
                background: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div 
                    className="mx-auto mb-3" 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      background: 'linear-gradient(45deg, #1e3c72, #2a5298)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center'
                    }}
                  >
                    <Award size={40} color="white" />
                  </div>
                  <h4 className="fw-bold" style={{ color: '#1e3c72' }}>Enter Certificate Details</h4>
                  <p className="text-muted">Please provide your certificate information for verification</p>
                </div>

                <div className="mb-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#1e3c72' }}>
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Certificate Number"
                      value={certificateNumber}
                      onChange={(e) => setCertificateNumber(e.target.value)}
                      style={{ 
                        borderRadius: '12px', 
                        border: '2px solid #e9ecef',
                        padding: '12px 16px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1e3c72';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(30, 60, 114, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button 
                    onClick={handleRetrieve}
                    className="btn w-100"
                    style={{ 
                      background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(30, 60, 114, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Search size={20} style={{ marginRight: '8px' }} />
                    Get Certificate
                  </button>
                </div>

                {error && (
                  <div className="text-center py-4">
                    <div className="mb-3">
                      <AlertTriangle size={48} style={{ color: '#dc3545' }} />
                    </div>
                    <p className="lead" style={{ color: '#dc3545' }}>{error}</p>
                  </div>
                )}

                {certificateUrl && (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="mb-3">
                        <CheckCircle size={48} style={{ color: '#28a745' }} />
                      </div>
                      <h4 className="fw-bold text-success mb-3">Certificate Found</h4>
                      <div className="badge mb-3" style={{ 
                        background: 'linear-gradient(45deg, #28a745, #20c997)', 
                        color: 'white', 
                        fontSize: '14px',
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }}>
                        Verified Certificate
                      </div>
                    </div>

                    <div 
                      className="mb-4"
                      style={{
                        border: '3px solid #28a745',
                        borderRadius: '15px',
                        padding: '10px',
                        background: 'linear-gradient(45deg, #f8f9fa, #ffffff)'
                      }}
                    >
                      <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                        <FileText size={24} style={{ marginRight: '8px', color: '#1e3c72' }} />
                        View Certificate
                      </a>
                      {certificateUrl.endsWith('.png') && (
                        <img
                          src={certificateUrl}
                          alt="Certificate Preview"
                          style={{ 
                            maxWidth: '100%', 
                            marginTop: '1rem', 
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}