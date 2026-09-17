import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, CheckCircle, Lock, Crown, ArrowLeft, Award, HelpCircle, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoursePlayer = ({ course, onBack }) => {
  const { user, markLessonComplete, openCheckout, openCertificate, addCertificate } = useAuth();

  // Find first lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [currentLesson, setCurrentLesson] = useState(allLessons[0]);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const completedLessonIds = user?.completedLessons?.[course.id] || [];
  const isCourseUnlocked = course.tier === 'free' || user?.isPremium || user?.enrolledCourses?.includes(course.id);

  const progressPercent = Math.round((completedLessonIds.length / allLessons.length) * 100);

  const handleSelectLesson = (lesson) => {
    const isAccessible = lesson.freePreview || isCourseUnlocked;
    if (!isAccessible) {
      openCheckout(course);
      return;
    }
    setCurrentLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleToggleComplete = () => {
    if (!user) return;
    markLessonComplete(course.id, currentLesson.id);

    // If all lessons now complete
    if (completedLessonIds.length + 1 >= allLessons.length) {
      addCertificate(course);
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === currentLesson.quiz.correctAnswer) {
      handleToggleComplete();
    }
  };

  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className={`progress-bar-fill ${progressPercent === 100 ? 'progress-bar-gold' : ''}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {progressPercent === 100 && (
            <button className="btn btn-gold btn-sm" onClick={() => openCertificate(course)}>
              <Award size={16} /> View Certificate
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="player-container">
        {/* Video Player & Lesson Notes */}
        <div className="video-section">
          <div className="video-wrapper">
            {(!currentLesson.freePreview && !isCourseUnlocked) ? (
              <div className="video-lock-overlay">
                <Crown size={48} color="#fbbf24" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
                  Premium Lesson Locked
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', marginBottom: '20px' }}>
                  Subscribe to SkillForge PRO or purchase this course to watch full high-definition video lessons & exercises.
                </p>
                <button className="btn btn-gold btn-lg" onClick={() => openCheckout(course)}>
                  Unlock Premium Course (${course.price})
                </button>
              </div>
            ) : (
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Current Lesson Header */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-category">{course.category}</span>
              <button
                className={`btn btn-sm ${isCurrentCompleted ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleToggleComplete}
              >
                {isCurrentCompleted ? (
                  <>
                    <CheckCircle size={16} color="var(--accent-green)" /> Completed
                  </>
                ) : (
                  <>Mark as Complete</>
                )}
              </button>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>
              {currentLesson.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
              Course: {course.title} • Instructor: {course.instructor.name}
            </p>

            {/* Quiz Section if lesson has a quiz */}
            {currentLesson.quiz && (
              <div style={{ marginTop: '24px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                  <HelpCircle size={18} /> Interactive Check-in Quiz
                </div>
                <div style={{ fontWeight: 600, marginBottom: '14px' }}>
                  {currentLesson.quiz.question}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {currentLesson.quiz.options.map((option, idx) => {
                    let border = '1px solid var(--border-color)';
                    let bg = 'rgba(18, 24, 38, 0.8)';

                    if (selectedQuizOption === idx) {
                      border = '2px solid var(--primary)';
                      bg = 'rgba(99, 102, 241, 0.15)';
                    }
                    if (quizSubmitted) {
                      if (idx === currentLesson.quiz.correctAnswer) {
                        border = '2px solid var(--accent-green)';
                        bg = 'rgba(16, 185, 129, 0.15)';
                      } else if (selectedQuizOption === idx) {
                        border = '2px solid #ef4444';
                        bg = 'rgba(239, 68, 68, 0.15)';
                      }
                    }

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border,
                          background,
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                        onClick={() => !quizSubmitted && setSelectedQuizOption(idx)}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button className="btn btn-primary btn-sm" onClick={handleQuizSubmit}>
                    Submit Answer
                  </button>
                ) : (
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: selectedQuizOption === currentLesson.quiz.correctAnswer ? 'var(--accent-green)' : '#f87171' }}>
                    {selectedQuizOption === currentLesson.quiz.correctAnswer
                      ? '✨ Correct! Lesson marked as completed.'
                      : '❌ Incorrect answer. Try again!'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Modules & Lessons */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            Course Curriculum
          </h3>

          <div className="modules-sidebar">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="module-card">
                <div className="module-header">
                  <span>{mod.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {mod.lessons.length} lessons
                  </span>
                </div>

                <div>
                  {mod.lessons.map((les) => {
                    const isSelected = currentLesson.id === les.id;
                    const isCompleted = completedLessonIds.includes(les.id);
                    const isAccessible = les.freePreview || isCourseUnlocked;

                    return (
                      <div
                        key={les.id}
                        className={`lesson-item ${isSelected ? 'active' : ''} ${!isAccessible ? 'locked' : ''}`}
                        onClick={() => handleSelectLesson(les)}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isCompleted ? (
                            <CheckCircle size={14} color="var(--accent-green)" />
                          ) : (
                            <PlayCircle size={14} />
                          )}
                          <span>{les.title}</span>
                        </span>

                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                          {les.duration}
                          {!isAccessible && <Lock size={12} color="var(--accent-gold)" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
