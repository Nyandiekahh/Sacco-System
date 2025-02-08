// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import LandingPage from './pages/LandingPage';
import KYCVerification from './pages/KYCVerification';
import Dashboard from './pages/Dashboard';
import './App.css';

function RequireAuth({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  // Check if user needs KYC verification
  // You'll need to add a custom field to your Clerk user metadata for KYC status
  const kycVerified = user.publicMetadata.kycVerified;
  
  if (!kycVerified && window.location.pathname !== '/kyc') {
    return <Navigate to="/kyc" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/kyc" 
          element={
            <RequireAuth>
              <KYCVerification />
            </RequireAuth>
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;