import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Crown, ShieldCheck, CreditCard, Check, Sparkles, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    activeModal,
    setActiveModal,
    selectedCourseForCheckout,
    upgradeToPremium,
    enrollCourse
  } = useAuth();

  const [planType, setPlanType] = useState('course'); // 'course' | 'membership'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expDate, setExpDate] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'checkout') return null;

  const course = selectedCourseForCheckout;
  const basePrice = planType === 'membership' ? 19 : course?.price || 49;
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'PRO50' || coupon.trim().toUpperCase() === 'SKILL50') {
      setAppliedDiscount(Math.round(basePrice * 0.5));
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try "SKILL50"');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (planType === 'membership') {
        upgradeToPremium();
      } else if (course) {
        enrollCourse(course.id);
      }

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setActiveModal(null);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-card" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setActiveModal(null)}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge badge-premium" style={{ marginBottom: '8px' }}>
            <Crown size={14} /> SECURE CHECKOUT
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800 }}>
            {course ? `Unlock ${course.title}` : 'Upgrade to All-Access PRO'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Instant lifetime access with 30-day money-back guarantee
          </p>
        </div>

        {/* Plan toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: planType === 'course' ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
              background: planType === 'course' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer'
            }}
            onClick={() => setPlanType('course')}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fbbf24' }}>Single Course</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0' }}>
              ${course?.price || 49}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay once, keep forever</div>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: planType === 'membership' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              background: planType === 'membership' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer'
            }}
            onClick={() => setPlanType('membership')}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>
              All-Access PRO Pass
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0' }}>
              $19 <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unlock ALL premium courses</div>
          </div>
        </div>

        <form onSubmit={handlePay}>
          {/* Card Form */}
          <div style={{ background: 'rgba(18, 24, 38, 0.8)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={18} color="var(--primary)" /> Card Information
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> 256-Bit SSL Encrypted
              </span>
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <input
                type="text"
                className="form-input"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <input
                  type="text"
                  className="form-input"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-input"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Promo code */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Promo Code (try SKILL50)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={{ textTransform: 'uppercase' }}
            />
            <button type="button" className="btn btn-secondary" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>
          {couponError && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '-14px', marginBottom: '16px' }}>{couponError}</div>}
          {appliedDiscount > 0 && <div style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '-14px', marginBottom: '16px' }}>50% Promo Discount Applied! (-${appliedDiscount})</div>}

          {/* Total & Submit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount Due:</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>${finalPrice}</div>
            </div>

            <button type="submit" className="btn btn-gold btn-lg" disabled={isProcessing}>
              {isProcessing ? (
                'Processing Payment...'
              ) : (
                <>
                  <Lock size={16} /> Pay ${finalPrice} & Unlock
                </>
              )}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          🔒 Simulation Checkout. No real credit card charge will occur.
        </div>
      </div>
    </div>
  );
};
