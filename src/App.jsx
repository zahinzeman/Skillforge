import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MOCK_COURSES, CATEGORIES } from './data/courses';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { CourseDetailModal } from './components/CourseDetailModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CertificateModal } from './components/CertificateModal';
import { CoursePlayer } from './components/CoursePlayer';
import { Dashboard } from './components/Dashboard';
import { Sparkles, Crown, BookOpen, Lock, UserPlus, LogIn, ArrowRight } from 'lucide-react';

function MainApp() {
  const { user, setActiveModal } = useAuth();
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'dashboard' | 'player'
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [tierFilter, setTierFilter] = useState('all'); // 'all' | 'free' | 'premium'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseForPlayer, setActiveCourseForPlayer] = useState(null);

  // Filter courses based on Category, Tier, and Search Query
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All Courses' || course.category === selectedCategory;
      const matchesTier =
        tierFilter === 'all' || course.tier === tierFilter;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTier && matchesSearch;
    });
  }, [selectedCategory, tierFilter, searchQuery]);

  const handleSelectCourse = (course) => {
    if (!user) {
      setActiveModal('register');
      return;
    }
    setActiveCourseForPlayer(course);
    setActiveTab('player');
  };

  const handleRequireAuth = (targetAction = 'register') => {
    if (!user) {
      setActiveModal(targetAction);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (!user && tab === 'dashboard') {
            setActiveModal('login');
            return;
          }
          setActiveTab(tab);
          if (tab !== 'player') setActiveCourseForPlayer(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          if (!user) {
            setActiveModal('register');
          } else {
            setSearchQuery(q);
          }
        }}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'player' && activeCourseForPlayer && user ? (
          <CoursePlayer
            course={activeCourseForPlayer}
            onBack={() => {
              setActiveTab('browse');
              setActiveCourseForPlayer(null);
            }}
          />
        ) : activeTab === 'dashboard' && user ? (
          <Dashboard onSelectCourse={handleSelectCourse} />
        ) : (
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="container">
                <div className="badge badge-category" style={{ marginBottom: '16px', gap: '6px' }}>
                  <Sparkles size={14} color="var(--primary)" /> Account Required to View Catalog
                </div>

                <h1 className="hero-title">
                  Master In-Demand Tech & AI Skills with <span>SkillForge</span>
                </h1>

                <p className="hero-subtitle">
                  Create a free account to unlock access to our full library of <strong>free courses</strong> and <strong>premium masterclasses</strong> with real-world projects & certificates.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {user ? (
                    <>
                      <button className="btn btn-primary btn-lg" onClick={() => setTierFilter('free')}>
                        <BookOpen size={18} /> Browse Free Courses
                      </button>
                      <button className="btn btn-gold btn-lg" onClick={() => setTierFilter('premium')}>
                        <Crown size={18} /> Explore Premium Tier
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-lg" onClick={() => setActiveModal('register')}>
                        <UserPlus size={18} /> Sign Up Free to Unlock Catalog
                      </button>
                      <button className="btn btn-secondary btn-lg" onClick={() => setActiveModal('login')}>
                        <LogIn size={18} /> Log In to Account
                      </button>
                    </>
                  )}
                </div>

                {/* Hero Stats */}
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-val">50,000+</span>
                    <span className="stat-lbl">Active Students</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-val">4.9 ★</span>
                    <span className="stat-lbl">Average Rating</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-val">100% Free</span>
                    <span className="stat-lbl">Account Registration</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-val">Verified</span>
                    <span className="stat-lbl">Certificates</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Courses Catalog Section */}
            <section className="container" style={{ paddingBottom: '64px' }}>
              {!user ? (
                /* Locked Catalog View for Guests */
                <div
                  className="glass-panel"
                  style={{
                    padding: '64px 32px',
                    textAlign: 'center',
                    maxWidth: '720px',
                    margin: '0 auto',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'var(--primary)'
                    }}
                  >
                    <Lock size={32} />
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
                    Course Catalog Locked
                  </h2>

                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
                    Please <strong>Sign Up</strong> or <strong>Log In</strong> to view our collection of free and premium interactive courses, lesson plans, and verified completion certificates.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={() => setActiveModal('register')}>
                      <UserPlus size={18} /> Create Free Account
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => setActiveModal('login')}>
                      <LogIn size={18} /> Log In
                    </button>
                  </div>

                  {/* Quick Demo hint */}
                  <div style={{ marginTop: '24px', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
                    💡 <em>Tip: You can use the One-Click Demo buttons inside the login modal to test instantly.</em>
                  </div>
                </div>
              ) : (
                /* Unlocked Catalog View for Logged-In Users */
                <>
                  <div className="controls-bar">
                    {/* Category Pills */}
                    <div className="filter-pills">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Free / Premium Tier Filter */}
                    <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
                      <button
                        className={`btn btn-sm ${tierFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ borderRadius: '20px', border: 'none' }}
                        onClick={() => setTierFilter('all')}
                      >
                        All
                      </button>
                      <button
                        className={`btn btn-sm ${tierFilter === 'free' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ borderRadius: '20px', border: 'none' }}
                        onClick={() => setTierFilter('free')}
                      >
                        Free
                      </button>
                      <button
                        className={`btn btn-sm ${tierFilter === 'premium' ? 'btn-gold' : 'btn-secondary'}`}
                        style={{ borderRadius: '20px', border: 'none' }}
                        onClick={() => setTierFilter('premium')}
                      >
                        <Crown size={12} /> Premium
                      </button>
                    </div>
                  </div>

                  {/* Course Grid */}
                  {filteredCourses.length > 0 ? (
                    <div className="course-grid">
                      {filteredCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onSelectCourse={handleSelectCourse}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-panel" style={{ padding: '64px', textAlign: 'center', margin: '40px 0' }}>
                      <h3>No courses found matching your filter</h3>
                      <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                        Try searching for another topic or reset the category filters.
                      </p>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ marginTop: '16px' }}
                        onClick={() => {
                          setSelectedCategory('All Courses');
                          setTierFilter('all');
                          setSearchQuery('');
                        }}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>

      {/* Modals */}
      <CourseDetailModal onSelectCourse={handleSelectCourse} />
      <AuthModal />
      <CheckoutModal />
      <CertificateModal />

      {/* Footer */}
      <footer style={{ background: 'rgba(9, 13, 22, 0.95)', borderTop: '1px solid var(--border-color)', padding: '40px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="logo" style={{ marginBottom: '6px' }}>
              <div className="logo-icon" style={{ width: '28px', height: '28px' }}>
                <BookOpen size={16} />
              </div>
              <div className="logo-text" style={{ fontSize: '1.2rem' }}>
                Skill<span>Forge</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              © 2026 SkillForge Inc. All rights reserved. Account registration required.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => handleRequireAuth('login')}>Log In</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleRequireAuth('register')}>Sign Up</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
