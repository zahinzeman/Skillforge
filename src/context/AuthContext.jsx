import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'skillforge_user_state';

const DEFAULT_USER = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading auth state:', e);
    }
    return DEFAULT_USER;
  });

  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'checkout' | 'certificate' | 'detail' | null
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);
  const [selectedCourseForCheckout, setSelectedCourseForCheckout] = useState(null);
  const [selectedCourseForCertificate, setSelectedCourseForCertificate] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state:', e);
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated authentication
    const name = email.split('@')[0];
    const isPremiumUser = email.toLowerCase().includes('premium');
    const newUser = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      isPremium: isPremiumUser,
      enrolledCourses: ["course-1"], // Default enroll in free course
      completedLessons: { "course-1": ["l1"] },
      certificates: []
    };
    setUser(newUser);
    setActiveModal(null);
    return newUser;
  };

  const register = (name, email, password) => {
    const newUser = {
      name,
      email,
      isPremium: false,
      enrolledCourses: ["course-1"],
      completedLessons: {},
      certificates: []
    };
    setUser(newUser);
    setActiveModal(null);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPremium = () => {
    if (!user) {
      setActiveModal('login');
      return;
    }
    setUser(prev => ({
      ...prev,
      isPremium: true
    }));
  };

  const enrollCourse = (courseId) => {
    if (!user) {
      setActiveModal('login');
      return false;
    }
    if (!user.enrolledCourses.includes(courseId)) {
      setUser(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      }));
    }
    return true;
  };

  const markLessonComplete = (courseId, lessonId) => {
    if (!user) return;
    setUser(prev => {
      const prevCompleted = prev.completedLessons[courseId] || [];
      if (prevCompleted.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [courseId]: [...prevCompleted, lessonId]
        }
      };
    });
  };

  const addCertificate = (course) => {
    if (!user) return;
    const existingCert = user.certificates.find(c => c.courseId === course.id);
    if (!existingCert) {
      const certData = {
        id: `cert-${Date.now()}`,
        courseId: course.id,
        courseTitle: course.title,
        issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        instructor: course.instructor.name
      };
      setUser(prev => ({
        ...prev,
        certificates: [...prev.certificates, certData]
      }));
    }
  };

  const openCheckout = (course) => {
    if (!user) {
      setActiveModal('login');
      return;
    }
    setSelectedCourseForCheckout(course);
    setActiveModal('checkout');
  };

  const openCertificate = (course) => {
    setSelectedCourseForCertificate(course);
    setActiveModal('certificate');
  };

  const openCourseDetail = (course) => {
    setSelectedCourseForDetail(course);
    setActiveModal('detail');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        upgradeToPremium,
        enrollCourse,
        markLessonComplete,
        addCertificate,
        activeModal,
        setActiveModal,
        selectedCourseForDetail,
        setSelectedCourseForDetail,
        selectedCourseForCheckout,
        openCheckout,
        selectedCourseForCertificate,
        openCertificate,
        openCourseDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
