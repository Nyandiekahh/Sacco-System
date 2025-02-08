// pages/Dashboard.js
import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Dashboard.css';


function Dashboard() {
  const { user } = useUser();
  const [kyc, setKyc] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
    isVerified: false
  });
  const location = useLocation();

  const uploadKYC = (type, file) => {
    setKyc(prev => ({
      ...prev,
      [type]: file
    }));
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src="/images/logo.png" alt="KMS SACCO" className="sidebar-logo" />
          <h2>KMS SACCO</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Overview
          </Link>
          <Link to="/dashboard/savings" className={location.pathname.includes('/savings') ? 'active' : ''}>
            Savings
          </Link>
          <Link to="/dashboard/loans" className={location.pathname.includes('/loans') ? 'active' : ''}>
            Loans
          </Link>
          <Link to="/dashboard/profile" className={location.pathname.includes('/profile') ? 'active' : ''}>
            Profile
          </Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-welcome">
            Welcome back, {user?.firstName}
          </div>
          <div className="header-actions">
            <div className="notifications">
              {/* Notification bell icon */}
            </div>
            <div className="user-menu">
              {/* User avatar and dropdown */}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={
              <div className="overview-grid">
                <div className="stat-card">
                  <h3>Total Savings</h3>
                  <p className="amount">KSH 0.00</p>
                  <p className="subtitle">Min. Monthly: KSH 1,000</p>
                </div>
                <div className="stat-card">
                  <h3>Loan Eligibility</h3>
                  <p className="amount">KSH 0.00</p>
                  <p className="subtitle">Up to 3x your savings</p>
                </div>
                <div className="stat-card">
                  <h3>Next Payment Due</h3>
                  <p className="date">5th of next month</p>
                  <p className="subtitle">Grace period: 3 days</p>
                </div>
                {!kyc.isVerified && (
                  <div className="kyc-notice">
                    <h3>Complete Your KYC</h3>
                    <p>Upload required documents:</p>
                    <div className="kyc-uploads">
                      <div className="upload-item">
                        <label>ID Front</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => uploadKYC('idFront', e.target.files[0])} 
                        />
                      </div>
                      <div className="upload-item">
                        <label>ID Back</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => uploadKYC('idBack', e.target.files[0])} 
                        />
                      </div>
                      <div className="upload-item">
                        <label>Selfie with ID</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => uploadKYC('selfie', e.target.files[0])} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            } />
            <Route path="/savings" element={<h1>Savings</h1>} />
            <Route path="/loans" element={<h1>Loans</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;