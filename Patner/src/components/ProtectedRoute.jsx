import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, onShowLogin }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to home and show login
      navigate('/');
      // Call the onShowLogin callback after a short delay to ensure navigation completes
      setTimeout(() => {
        if (onShowLogin) {
          onShowLogin();
        }
      }, 100);
    }
  }, [isAuthenticated, loading, navigate, onShowLogin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e879a0] border-t-[#b355e0] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#2d1b4e] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
