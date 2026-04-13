# Companion Connect Website - Copilot Instructions

## Project Overview
Companion Connect is a modern, visually stunning platform for hiring companions for social activities. Built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Key Features
- Hero section with engaging CTAs and trust indicators
- How It Works - 4-step interactive process guide
- Featured companions showcase with ratings and reviews
- Individual companion profile pages
- Ratings and reviews section
- Safety & trust information
- Responsive mobile-first design
- Smooth animations and micro-interactions with Framer Motion

## Tech Stack
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling with custom color palette
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

## Style Guidelines
- **Color Palette**: Soft pastels (pinks #8b5cf6, purples, blues) with gradients
- **UI Effects**: Glassmorphism and neumorphism
- **Typography**: Clean, friendly, premium feel
- **Animations**: Smooth hover effects, card transitions, scroll animations with Framer Motion
- **Responsive**: Mobile-first approach (< 640px, 640-1024px, > 1024px)

## Project Structure
```
src/
├── components/           # All UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── HowItWorks.jsx
│   ├── FeaturedCompanions.jsx
│   ├── CompanionCard.jsx
│   ├── Reviews.jsx
│   ├── Safety.jsx
│   ├── CTA.jsx
│   └── Footer.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   └── CompanionProfile.jsx
├── data/               # Mock data
│   └── companions.js
├── App.jsx            # Main app with routing
├── index.css          # Global styles + Tailwind
└── App.css            # App-wide styles
```

## Project Status
✅ **COMPLETE** - All features implemented and build successful

- [x] Scaffold the Project with Vite + React
- [x] Install all dependencies (Tailwind CSS v4, Framer Motion, React Router, Lucide React)
- [x] Configure Tailwind CSS and CSS
- [x] Create all components
- [x] Build and test - successful build with 0 errors
- [x] Documentation complete

## Quick Start Commands

### Development
```bash
npm run dev    # Start dev server on http://localhost:5173
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

### Key Dependencies
- react: ^19.2.4
- react-dom: ^19.2.4
- react-router-dom: ^latest
- framer-motion: ^latest
- lucide-react: ^latest
- tailwindcss: ^latest
- @tailwindcss/postcss: ^latest

## Features Implemented

### Pages
1. **Home Page** - Landing page with all sections
2. **Companion Profile** - Individual profile with full details

### Components
- **Navbar** - Responsive navigation with mobile menu
- **Hero** - Eye-catching header with animations
- **HowItWorks** - 4-step process guide
- **FeaturedCompanions** - Grid of companion cards
- **CompanionCard** - Reusable card component with hover effects
- **Reviews** - Testimonials and user stats
- **Safety** - Trust and safety information
- **CTA** - Call-to-action section
- **Footer** - Footer with links and social icons

### Data
- **companions.js** - Mock data for 6 companions + 4 testimonials

## Design Highlights
- Smooth fade-in animations on scroll
- Card hover effects with scale and shadow
- Glassmorphism UI elements
- Gradient backgrounds
- Responsive grid layouts
- Mobile-optimized navigation

## Notes
- Platform is strictly for social companionship
- All profiles are verified
- Privacy and security emphasized throughout
- No inappropriate activities allowed

---

**Status**: Ready for development and testing!
