import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Star, Clock, BookOpen, Crown, CheckCircle2, Lock, PlayCircle, Award, ShieldCheck } from 'lucide-react';

export const CourseDetailModal = ({ onSelectCourse }) => {
  const { user, selectedCourseForDetail, setSelectedCourseForDetail, openCheckout, enrollCourse } = useAuth();

  if (!selectedCourseForDetail) return null;

  const course = selectedCourseForDetail;
  const isFree = course.tier === 'free';
  const isEnrolled = user?.enrolledCourses?.includes(course.id);
  const isUnlocked = isFree || user?.isPremium || isEnrolled;

  const handleStart = () => {
    setSelectedCourseForDetail(null);
    if (!isEnrolled) {
      enrollCourse(course.id);
    }
    onSelectCourse(course);
  };

  const handleUnlock = () => {
    setSelectedCourseForDetail(null);
    openCheckout(course);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedCourseForDetail(null)}>
      <div className="modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedCourseForDetail(null)}>
          <X size={20} />
        </button>

        {/* Header visual */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px' }}>
          <img
            src={course.thumbnail}
            alt={course.title}
            style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(15, 21, 35, 0.95) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${isFree ? 'badge-free' : 'badge-premium'}`}>
                {isFree ? 'FREE ACCESS' : 'PREMIUM COURSE'}
              </span>
              <span className="badge badge-category">{course.level}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>{course.title}</h2>
          </div>
        </div>

        {/* Overview Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rating</div>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
              <Star size={14} fill="#fbbf24" /> {course.rating}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{course.duration}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lessons</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{course.lessonsCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Students</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{course.studentsCount.toLocaleString()}</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Course Overview</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>{course.overview}</p>
        </div>

        {/* Curriculum Preview */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>Syllabus Breakdown</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {course.modules.map((mod) => (
              <div key={mod.id} style={{ background: 'rgba(18, 24, 38, 0.7)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{mod.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {mod.lessons.map((les) => (
                    <div key={les.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PlayCircle size={14} color="var(--primary)" /> {les.title}
                      </span>
                      <span>
                        {les.freePreview || isUnlocked ? (
                          <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem' }}>Preview Available</span>
                        ) : (
                          <Lock size={12} color="var(--accent-gold)" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
          <img src={course.instructor.avatar} alt={course.instructor.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 700 }}>{course.instructor.name}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{course.instructor.role}</div>
          </div>
        </div>

        {/* Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '16px', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Access Tier</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {isFree ? 'FREE' : `$${course.price}`}
            </div>
          </div>

          {isUnlocked ? (
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              <PlayCircle size={18} /> {isEnrolled ? 'Continue Course' : 'Start Course Now'}
            </button>
          ) : (
            <button className="btn btn-gold btn-lg" onClick={handleUnlock}>
              <Crown size={18} /> Unlock Full Course (${course.price})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
