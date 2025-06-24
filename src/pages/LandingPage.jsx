import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function LandingPage() {
  const { login, isAuthenticated, user } = useAuth();

  const handleLogin = async () => {
    await login({ name: 'Guest' });
  };

  if (isAuthenticated) {
    return (
      <div className="landing-page">
        <h1>Welcome back, {user?.name}</h1>
        <p>You are logged in to FaceCrook.</p>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <h1>Welcome to FaceCrook</h1>
      <p>A satire-filled crypto social experience.</p>
      <button type="button" onClick={handleLogin}>Enter</button>
    </div>
  );
}

export default LandingPage;
