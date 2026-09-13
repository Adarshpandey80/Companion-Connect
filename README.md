# 🧑‍🤝‍🧑 Find Companion

Find Companion is a **production-ready MERN Stack** web application where users can hire companions for travel, shopping, events, and other activities. Individuals can create profiles, set their service rates, securely book sessions with Razorpay payment integration, and connect safely.

---

## 🚀 Key Features

- 👤 **Companion Profiles**: Detailed profiles with ratings, bios, availability, and hourly pricing.
- 💳 **Razorpay Payment Integration**: Secure online payment checkout with cryptographic HMAC SHA-256 signature verification.
- 📅 **Session Booking System**: Real-time booking modal, session confirmation, and dynamic user booking history.
- 🔍 **Search & Filter**: Find companions by city, service type, rating, and availability.
- 💬 **Direct Messaging**: Connect and chat before scheduling outings.
- 🛡️ **Production-Hardened Security**: Helmet security headers, API rate limiting, JWT token authentication, and CORS origin restriction.
- 🩺 **Health Check & Monitoring**: Dedicated `/health` endpoint for uptime monitoring and container orchestration.
- 🛡️ **Zero Vulnerabilities**: Patched and audited with 0 security vulnerabilities across backend and frontend dependencies.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Razorpay Node SDK, JWT, Helmet, Express-Rate-Limit
- **Payment Gateway**: Razorpay (Orders API & Web Checkout)

---

## ⚙️ Environment Variables

### Backend (`Server/.env`)
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/findCompanion
JWT_SECRET=your-super-secret-jwt-key-change-in-production
RAZORPAY_KEY_ID=rzp_test_RvRurWrKcudxY0
RAZORPAY_KEY_SECRET=BeCtlsZU6RFioxopPF026GvD
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Note**: In production, set `NODE_ENV=production`, `CLIENT_URL` to your live domain, and replace the Razorpay keys with your live keys.

### Frontend (`Patner/.env`)
```env
VITE_SERVER_URL=http://localhost:8080
VITE_RAZORPAY_KEY_ID=rzp_test_RvRurWrKcudxY0
```

---

## 💻 Production & Development Commands

### Backend (`Server`)

| Command | Description |
|---|---|
| `pnpm install` | Install all backend dependencies |
| `pnpm run dev` | Start development server with file watch (`node --watch app.js`) |
| `pnpm start` | Start production server (`node app.js`) |
| `pnpm audit` | Run security vulnerability audit |

### Frontend (`Patner`)

| Command | Description |
|---|---|
| `pnpm install` | Install all frontend dependencies |
| `pnpm run dev` | Start Vite local development server on `http://localhost:5173` |
| `pnpm run build` | Build optimized production bundle to `dist/` |
| `pnpm run preview` | Preview the production build locally |
| `pnpm audit` | Run security vulnerability audit |

---

## 🧪 Security & Quality Audit Status

- **Backend Audit**: `pnpm audit` reports **0 vulnerabilities** (Exit code 0).
- **Frontend Audit**: `pnpm audit` reports **0 vulnerabilities** (Exit code 0).
- **Production Build**: `pnpm run build` completes cleanly with 0 errors.
- **Payment Verification**: Cryptographic HMAC SHA-256 signature verification prevents tampering.

---

## 📄 License
**All Rights Reserved** © 2026 Adarsh Pandey