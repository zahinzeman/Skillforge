import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Clock, BookOpen, Crown, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export const CourseCard = ({ course, onSelectCourse }) => {
  const { user, openCourseDetail, openCheckout, enrollCourse } = useAuth();

  const isFree = course.tier === 'free';
  const isEnrolled = user?.enrolledCourses?.includes(course.id);
  const isUnlocked = isFree || user?.isPremium || isEnrolled;

  const handleAction = (e) => {
    e.stopPropagation();
    if (isEnrolled) {
      onSelectCourse(course);
    } else if (isFree) {
      enrollCourse(course.id);
      onSelectCourse(course);
    } else if (isUnlocked) {
      onSelectCourse(course);
    } else {
      openCheckout(course);
    }
  };

  return (
    <div
      className={`glass-panel course-card ${!isFree ? 'premium-card' : ''}`}
      onClick={() => openCourseDetail(course)}
      style={{ cursor: 'pointer' }}
    >
      {/* Thumbnail */}
      <div className="course-thumbnail-wrap">
        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
        <div className="course-badge-top">
          {isFree ? (
            <span className="badge badge-free">FREE COURSE</span>
          ) : (
            <span className="badge badge-premium">
              <Crown size={12} /> PREMIUM TIER
            </span>
          )}
        </div>
        <div className="course-price-top">
          {isFree ? 'FREE' : `$${course.price}`}
        </div>
      </div>

      {/* Content */}
      <div className="course-content">
        <div className="course-meta-top">
          <span className="badge badge-category">{course.category}</span>
          <div className="course-rating">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{course.rating}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>({course.reviewsCount})</span>
          </div>
        </div>

        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BookOpen size={14} /> {course.lessonsCount} Lessons
          </span>
        </div>

        {/* Footer */}
        <div className="course-footer">
          <div className="instructor-info">
            <img src={course.instructor.avatar} alt={course.instructor.name} className="instructor-img" />
            <span className="instructor-name">{course.instructor.name}</span>
          </div>

          <button
            className={`btn btn-sm ${
              isEnrolled
                ? 'btn-secondary'
                : isFree
                ? 'btn-primary'
                : 'btn-gold'
            }`}
            onClick={handleAction}
          >
            {isEnrolled ? (
              <>
                <CheckCircle2 size={14} /> Continue
              </>
            ) : isFree ? (
              <>Enroll Free</>
            ) : isUnlocked ? (
              <>Start Learning</>
            ) : (
              <>
                <Lock size={14} /> Unlock ${course.price}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
