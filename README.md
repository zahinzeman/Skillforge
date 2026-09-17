# 🎓 SkillForge - Modern Online Course Platform

SkillForge is a full-featured, high-aesthetic web application where users can explore **free courses** and upgrade/purchase **premium masterclasses**. Features real-time course player, interactive quizzes, student progress tracking, Stripe-style checkout simulation, and downloadable verified completion certificates.

![SkillForge Cover](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- 🆓 **Free & Premium Tiers**: Free courses accessible to all users; premium courses gated with lock screens and checkout options.
- 🔐 **Authentication & User Profiles**: Sign Up & Log In with persistent state saved in `localStorage`. Includes one-click quick demo buttons for testing.
- 🎬 **Interactive Course Player**: Embedded HD video lesson player, course curriculum navigation sidebar, lesson completion toggles, and progress bar tracking.
- 💡 **Check-In Quizzes**: Interactive quiz per lesson with instant scoring and completion validation.
- 💳 **Stripe-Style Payment Simulation**: Unlock single premium courses ($49) or All-Access PRO Pass ($19/mo) with discount promo code support (`SKILL50`) and celebratory confetti.
- 🏆 **Verified Certificates**: Earn gold-embossed completion certificates upon completing 100% of a course, complete with print/PDF support.
- 🎨 **Modern Dark UI & Design Tokens**: Ultra-sleek glassmorphism visual style, custom gradients, dynamic animations, and responsive layouts.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: `canvas-confetti`
- **Styling**: Vanilla CSS3 with Custom Variables, Glassmorphism & Modern CSS Grid/Flexbox layout

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx             # Sign Up / Log In Modal & Quick Demo buttons
│   │   ├── CertificateModal.jsx      # Gold-embossed completion certificate generator
│   │   ├── CheckoutModal.jsx         # Simulated Stripe payment & promo codes
│   │   ├── CourseCard.jsx            # Course card with Free/Premium badges
│   │   ├── CourseDetailModal.jsx     # Full syllabus overview & instructor bio
│   │   ├── CoursePlayer.jsx          # Interactive video player, quiz & sidebar
│   │   ├── Dashboard.jsx             # Student dashboard, stats & certificates
│   │   └── Navbar.jsx                # Header, brand logo, search bar & user profile
│   ├── context/
│   │   └── AuthContext.jsx           # React context for auth, enrollments & progress
│   ├── data/
│   │   └── courses.js                # Free & premium course catalog dataset
│   ├── App.jsx                       # Main application composition
│   ├── index.css                     # Global CSS design system tokens
│   └── main.jsx                      # React DOM entrypoint
├── index.html                        # HTML template with Google Fonts
├── vite.config.js                    # Vite bundler configuration
└── package.json                      # Project dependencies & scripts
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/zahinzeman/Skillforge.git
cd Skillforge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to view the application!

### 4. Build for Production
```bash
npm run build
```

---

## 🔑 Quick Demo Credentials

For quick testing without creating a manual account:
- **Demo Free Member**: `student@skillforge.edu`
- **Demo PRO Member**: `premium.pro@skillforge.edu`
- **Promo Code**: `SKILL50` (50% off during checkout)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
