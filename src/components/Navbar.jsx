import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, BookOpen, Crown, User, LogOut, Search, GraduationCap } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  const { user, logout, setActiveModal, upgradeToPremium } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('browse')}>
          <div className="logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="logo-text">
            Skill<span>Forge</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-box" style={{ margin: '0 16px' }}>
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search free & premium courses, skills, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navigation Tabs */}
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`}
              onClick={() => setActiveTab('browse')}
            >
              <BookOpen size={17} />
              Browse
            </button>
          </li>
          {user && (
            <li>
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <GraduationCap size={17} />
                My Learning
              </button>
            </li>
          )}
        </ul>

        {/* Auth Actions & Profile */}
        <div className="user-menu">
          {user ? (
            <>
              {user.isPremium ? (
                <div className="badge badge-premium">
                  <Crown size={14} /> PRO MEMBER
                </div>
              ) : (
                <button className="btn btn-gold btn-sm" onClick={() => setActiveModal('checkout')}>
                  <Sparkles size={15} /> Upgrade to PRO
                </button>
              )}

              <div
                className="user-avatar"
                title={user.name}
                onClick={() => setActiveTab('dashboard')}
                style={{ cursor: 'pointer' }}
              >
                {user.name.charAt(0)}
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={logout}
                title="Log Out"
                style={{ padding: '8px' }}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveModal('login')}>
                Log In
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('register')}>
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
