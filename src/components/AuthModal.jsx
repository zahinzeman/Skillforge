import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Sparkles, Check } from 'lucide-react';

export const AuthModal = () => {
  const { activeModal, setActiveModal, login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(activeModal === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (activeModal !== 'login' && activeModal !== 'register') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your full name.');
      return;
    }

    if (isSignUp) {
      register(name, email, password);
    } else {
      login(email, password);
    }
  };

  const handleDemoLogin = (type) => {
    if (type === 'free') {
      login('student@skillforge.edu', 'password123');
    } else {
      login('premium.pro@skillforge.edu', 'password123');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setActiveModal(null)}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>
            {isSignUp ? 'Create your Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isSignUp
              ? 'Join 50,000+ developers & creators learning on SkillForge'
              : 'Sign in to access your courses and certificates'}
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Quick Demo One-Click Sign In:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleDemoLogin('free')}
              style={{ fontSize: '0.8rem' }}
            >
              Demo Free Member
            </button>
            <button
              type="button"
              className="btn btn-gold btn-sm"
              onClick={() => handleDemoLogin('premium')}
              style={{ fontSize: '0.8rem' }}
            >
              Demo PRO Member
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
            {isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => { setIsSignUp(false); setError(''); }}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => { setIsSignUp(true); setError(''); }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
