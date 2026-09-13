import { useState, useEffect } from 'react';

/**
 * Checks whether a JWT token string has expired or is malformed.
 * @param {string} token
 * @returns {boolean}
 */
export const isJwtExpired = (token) => {
  if (!token || typeof token !== 'string') return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return true; // Token has expired
    }
    return false;
  } catch {
    return true; // Malformed token
  }
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      if (isJwtExpired(token)) {
        // Token has expired; remove stale credentials
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to parse user data:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, user, loading };
};
