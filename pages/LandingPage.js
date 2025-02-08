// pages/LandingPage.js
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';

function LandingPage() {
  const [email, setEmail] = useState('');
  const { isSignedIn } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">KMS SACCO</div>
        <div className="nav-buttons">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login-btn">Login</button>
            </SignInButton>
            <button className="join-btn">Join Now</button>
          </SignedOut>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Save, Borrow, Earn interest.</h1>
          <p className="hero-text">
            Curb the January hurdles by joining our SACCO today. With as little as KES500 of your monthly income, 
            you qualify for loans of up to 2x your savings
          </p>
          <div className="cta-section">
            <p>To get started, Simply click the <button className="join-inline">Join Now</button> and follow instructions</p>
          </div>
          
          <SignedOut>
            <div className="info-section">
              <h2>Not sure? Get an email from us with full description of our SACCO.</h2>
              <form onSubmit={handleSubmit} className="email-form">
                <input 
                  type="email" 
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
                <button type="submit" className="submit-btn">
                  Get Detailed Information
                </button>
              </form>
            </div>
          </SignedOut>
        </div>

        <div className="hero-image">
          <div className="illustration">
            <img src="/images/savings.png" alt="People saving money" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;