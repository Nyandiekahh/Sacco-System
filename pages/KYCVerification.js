import React, { useState, useRef } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Smartphone, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  Check
} from 'lucide-react';
import './KYCVerification.css';

const RevoluntionaryKYC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [files, setFiles] = useState({
    idFront: null,
    idBack: null,
    selfie: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRefs = {
    idFront: useRef(null),
    idBack: useRef(null),
    selfie: useRef(null)
  };

  const handleFileChange = (type, file) => {
    setFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting KYC:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUploader = (type, title) => (
    <div 
      className={`file-upload-card ${files[type] ? 'uploaded' : ''}`}
      onClick={() => fileInputRefs[type].current.click()}
    >
      <input
        type="file"
        ref={fileInputRefs[type]}
        accept="image/*"
        onChange={(e) => handleFileChange(type, e.target.files[0])}
        className="hidden-input"
      />
      {files[type] ? (
        <div className="uploaded-preview">
          <Check size={48} />
          <p>{title} Uploaded</p>
        </div>
      ) : (
        <div className="upload-placeholder">
          <Upload size={48} />
          <p>{title}</p>
          <p>Click to Upload</p>
        </div>
      )}
    </div>
  );

  const sections = [
    { 
      id: 'overview', 
      label: 'Overview',
      content: (
        <>
          <h2>Welcome to KYC Verification</h2>
          <p>Secure, simple, and compliant identity verification for KMS SACCO members.</p>
          
          <div className="info-cards">
            <div className="info-card">
              <ShieldCheck size={48} />
              <h3>Guaranteed Security</h3>
              <p>Your personal information is encrypted and protected.</p>
            </div>
            <div className="info-card">
              <AlertCircle size={48} />
              <h3>Legal Compliance</h3>
              <p>Verified process that meets all regulatory requirements.</p>
            </div>
          </div>

          <button 
            className="submit-button"
            onClick={() => setActiveSection('upload')}
          >
            Start Verification
          </button>
        </>
      )
    },
    { 
      id: 'upload', 
      label: 'Upload',
      content: (
        <>
          <h2>Upload Your Documents</h2>
          <div className="file-upload-grid">
            {renderFileUploader('idFront', 'ID Front')}
            {renderFileUploader('idBack', 'ID Back')}
            {renderFileUploader('selfie', 'Selfie')}
          </div>

          <button
            className="submit-button"
            disabled={!files.idFront || !files.idBack || !files.selfie || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Processing...' : 'Submit Verification'}
          </button>
        </>
      )
    },
    { 
      id: 'mobile', 
      label: 'Mobile',
      content: (
        <div className="qr-container">
          <Smartphone size={64} />
          <h2>Mobile Verification</h2>
          <p>Scan the QR code with your mobile device</p>
          
          <QRCodeSVG
            value="https://kmssacco.com/mobile-verify"
            size={200}
            level="H"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
      )
    }
  ];

  return (
    <div className="kyc-page">
      <nav className="kyc-navbar">
        <div className="kyc-logo">KMS SACCO</div>
        <UserButton afterSignOutUrl="/" />
      </nav>

      <div className="content-wrapper">
        <div className="sliding-container">
          <div className="sliding-section">
            <div className="section-nav">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`section-nav-button ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {sections.find(section => section.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevoluntionaryKYC;