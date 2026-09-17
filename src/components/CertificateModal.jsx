import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Award, Download, Printer, ShieldCheck } from 'lucide-react';

export const CertificateModal = () => {
  const { user, selectedCourseForCertificate, openCertificate } = useAuth();

  if (!selectedCourseForCertificate) return null;

  const course = selectedCourseForCertificate;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => openCertificate(null)}>
      <div className="modal-card" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => openCertificate(null)}>
          <X size={20} />
        </button>

        <div className="certificate-frame" id="printable-certificate">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Award size={64} color="#fbbf24" />
          </div>

          <div className="certificate-title">Certificate of Completion</div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '16px' }}>
            This is to certify that
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textDecoration: 'underline decoration-color var(--primary)' }}>
            {user?.name || 'Verified Student'}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 24px' }}>
            has successfully completed 100% of the course curriculum and practical evaluations for
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#fbbf24', marginBottom: '32px' }}>
            {course.title}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '20px', textAlign: 'left' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date Issued</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{issueDate}</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <ShieldCheck size={32} color="var(--accent-green)" />
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified SkillForge Credential</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instructor Signature</div>
              <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>
                {course.instructor.name}
              </div>
            </div>
          </div>
        </div>

        {/* Print / Download buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          <button className="btn btn-gold" onClick={handlePrint}>
            <Printer size={16} /> Print / Save PDF
          </button>
          <button className="btn btn-secondary" onClick={() => openCertificate(null)}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
