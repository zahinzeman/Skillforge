import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_COURSES } from '../data/courses';
import { CourseCard } from './CourseCard';
import { Crown, BookOpen, Award, CheckCircle, Sparkles } from 'lucide-react';

export const Dashboard = ({ onSelectCourse }) => {
  const { user, openCheckout, openCertificate } = useAuth();

  if (!user) return null;

  const enrolledCourseObjects = MOCK_COURSES.filter(c =>
    user.enrolledCourses?.includes(c.id)
  );

  const completedCount = Object.keys(user.completedLessons || {}).reduce((acc, courseId) => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) return acc;
    const totalLessons = course.modules.flatMap(m => m.lessons).length;
    const doneLessons = user.completedLessons[courseId]?.length || 0;
    return doneLessons >= totalLessons ? acc + 1 : acc;
  }, 0);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', background: 'var(--gradient-glow)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800 }}>
                Welcome back, {user.name}!
              </h1>
              {user.isPremium ? (
                <span className="badge badge-premium">
                  <Crown size={14} /> PRO ACCESS ACTIVE
                </span>
              ) : (
                <span className="badge badge-free">FREE PLAN</span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Track your learning path, watch lessons, and access earned certificates.
            </p>
          </div>

          {!user.isPremium && (
            <button className="btn btn-gold btn-lg" onClick={() => openCheckout(null)}>
              <Sparkles size={18} /> Upgrade to All-Access PRO
            </button>
          )}
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={14} color="var(--primary)" /> Enrolled Courses
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>
              {enrolledCourseObjects.length}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} color="var(--accent-green)" /> Completed Courses
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>
              {completedCount}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={14} color="#fbbf24" /> Earned Certificates
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px' }}>
              {user.certificates?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
          My Enrolled Courses
        </h2>

        {enrolledCourseObjects.length > 0 ? (
          <div className="course-grid">
            {enrolledCourseObjects.map((course) => (
              <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
            <BookOpen size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <h3>No enrolled courses yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Explore our free and premium catalog to start learning today!
            </p>
          </div>
        )}
      </div>

      {/* Certificates Section */}
      {user.certificates?.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
            My Verified Certificates
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {user.certificates.map((cert) => {
              const course = MOCK_COURSES.find(c => c.id === cert.courseId);
              return (
                <div key={cert.id} className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Award size={28} color="#fbbf24" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cert.courseTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issued: {cert.issueDate}</div>
                    </div>
                  </div>

                  <button
                    className="btn btn-gold btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => course && openCertificate(course)}
                  >
                    View / Download Certificate
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
