# Companion Connect - Modern Companion Hiring Platform

A stunning, modern website built with React, Tailwind CSS, and Framer Motion for a professional companion hiring platform.

## 🌟 Features

- **Hero Section** with engaging CTAs and trust indicators
- **How It Works** - 4-step interactive process guide
- **Featured Companions** - Card-based companion showcase with ratings and reviews
- **Advanced Filtering** - Filter by gender, location, price range, interests, and ratings
- **Individual Profiles** - Detailed companion profiles with photos, bio, services, availability, and reviews
- **Ratings & Reviews** - User testimonials and community feedback
- **Safety & Trust** - Verified profiles, secure payments, privacy protection, and community guidelines
- **Call-to-Action Sections** - Multiple conversion opportunities throughout
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Smooth Animations** - Framer Motion micro-interactions, hover effects, scroll animations
- **Glassmorphism & Neumorphism** - Modern UI effects with soft, warm color palettes

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 📋 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Hero.jsx            # Hero section with CTAs
│   ├── HowItWorks.jsx      # 4-step process guide
│   ├── FeaturedCompanions.jsx # Companion showcase
│   ├── CompanionCard.jsx   # Reusable companion card component
│   ├── Reviews.jsx         # Testimonials and stats
│   ├── Safety.jsx          # Safety guidelines section
│   ├── CTA.jsx             # Call-to-action section
│   └── Footer.jsx          # Footer with links and contact
├── pages/
│   ├── Home.jsx            # Main landing page
│   └── CompanionProfile.jsx # Individual companion profile page
├── data/
│   └── companions.js       # Mock data for companions and testimonials
├── App.jsx                 # Main app component with routing
├── App.css                 # App-wide styles
└── index.css               # Global styles with Tailwind directives
```

## 🎨 Color Palette

- **Primary**: Soft pinks (#fef3f2 to #f24624)
- **Secondary**: Purples (#f3f0ff to #7c3aed) - Main accent color
- **Accent**: Blues (#f0f9ff to #0284c7)
- **Warm**: Soft earth tones (#fdf8f3 to #4c1d95)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Pages

### Home Page (Landing)
- Hero section with headline and CTAs
- How It Works process guide
- Featured companions grid
- Testimonials and reviews
- Safety and trust section
- Final call-to-action

### Companion Profile Page
- Companion image and details
- Contact and booking buttons
- Bio and services offered
- Availability calendar
- Reviews and ratings
- Wishlist functionality

## ✨ Key Components

### Navbar
- Responsive navigation with mobile menu
- Logo and branding
- Quick action buttons
- Smooth animations

### Hero
- Large engaging headline
- Trust badges and indicators
- Animated background elements
- Primary and secondary CTAs

### CompanionCard
- Profile image with hover effects
- Name, role, and pricing
- Location and availability status
- Star rating and review count
- Services badges
- Action buttons (Hire, Message)
- Smooth hover animations

### Reviews
- Testimonials with ratings
- User statistics
- Quote icons and formatting
- Date information

### Safety Section
- Security features overview
- Community guidelines
- Verification badges
- Privacy information

## 🎬 Animations

All components feature smooth animations powered by Framer Motion:
- Fade-in on scroll
- Scale and hover effects
- Slide-up animations
- Staggered reveals
- Page transitions

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Safety Features

- Verified profiles badge
- Secure payment information
- Privacy protection messaging
- Community guidelines
- Reporting system information
- User testimonials and trust indicators

## 🌐 Routes

- `/` - Home page (landing page)
- `/companion/:id` - Individual companion profile page

## 📦 Dependencies

- react: ^19.2.4
- react-dom: ^19.2.4
- react-router-dom: ^latest
- framer-motion: ^latest
- lucide-react: ^latest
- tailwindcss: ^latest
- postcss: ^latest
- autoprefixer: ^latest

## 🎯 Performance

- Optimized images and lazy loading
- Smooth 60fps animations
- Minimal re-renders with React hooks
- Efficient CSS with Tailwind utility classes
- Fast build times with Vite

## 📄 License

All rights reserved - Companion Connect Platform

## ⚠️ Important Notes

- **Social Companionship Only**: This platform is strictly for social activities
- **No Inappropriate Activities**: Any illegal or inappropriate conduct is strictly prohibited
- **Verified Profiles**: All companions are verified for safety
- **Privacy Protected**: User information is never shared

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
