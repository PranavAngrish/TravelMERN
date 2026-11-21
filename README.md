<div align="center">

<img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png" alt="Mid Orchard Logo" width="120" />

# 🏔️ Mid Orchard — Hotel Booking Platform

### *A full-stack MERN application for discovering and booking boutique stays in Kasol, Himachal Pradesh*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pg-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

---

> *"Property for memorable moments rich in emotions — enjoy mesmerizing views of the valley with a peaceful and luxurious stay."*

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture Overview](#-architecture-overview)
- [API Reference](#-api-reference)
- [Database Models](#-database-models)
- [Redux State Management](#-redux-state-management)
- [Authentication Flow](#-authentication-flow)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## 🏡 About the Project

**Mid Orchard** is a full-stack hotel booking platform built for a real boutique resort in **Kasol, Himachal Pradesh, India**. Guests can browse multiple property categories, select dates, choose their preferred room type, and submit booking enquiries — all through a beautifully crafted, mobile-responsive interface.

The platform supports both **email/password** and **Google OAuth** sign-in, features **email verification** for new accounts, sends **automated confirmation emails** to guests and admin on booking, and automatically **cleans up unverified accounts** using a scheduled cron job.

---

## ✨ Features

### 🛎️ Guest Experience
- **Interactive Homepage** — Full-screen hero with animated booking search bar (guests, check-in/check-out dates)
- **Property Browsing** — Three distinct room categories: Mountain View, River View, and Family Suite
- **Detailed Room Pages** — Individual info pages (`/kasol-mountain-view-hotel`, `/kasol-river-view-hotel`, `/kasol-family-hotel`) with photos, amenities, and pricing
- **Booking Enquiry Forms** — Dedicated enquiry pages for each room type with date pickers and guest count
- **Photo Gallery** — Curated image gallery with lazy loading
- **Blog Section** — Travel blog with individual post pages (`/blog/:slug`)
- **Testimonials** — Guest reviews carousel
- **Thank You Page** — Post-booking confirmation screen

### 🔐 Authentication & Security
- **Email / Password Sign Up** — With Joi validation and bcrypt password hashing
- **Email Verification** — One-time verification link sent via Nodemailer; unverified users cannot sign in
- **Google OAuth** — One-click sign in via Firebase + Google, auto-creates user account
- **JWT Session Management** — `httpOnly` secure cookies with 1-day expiry
- **Auto-cleanup Cron Job** — Unverified accounts older than 1 hour are automatically purged every hour

### 📧 Email Notifications
- **Guest Confirmation Email** — Sent immediately on booking submission, summarising stay details
- **Admin Notification Email** — Full guest details forwarded to admin inbox on every booking

### 📱 Responsive Design
- Fully responsive across mobile, tablet, and desktop
- Mobile-first sidebar navigation with smooth transitions
- Adaptive booking form layout (grid on mobile, inline on desktop)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.2 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Flowbite React | 0.9 | UI component library |
| Redux Toolkit | 2.2 | Global state management |
| Redux Persist | 6.0 | Persisted auth & form state |
| React Router DOM | 6.23 | Client-side routing |
| Firebase | 10.12 | Google OAuth provider |
| Axios | 1.7 | HTTP client |
| React DatePicker | 7.1 | Date selection UI |
| Framer Motion | 11.2 | Animations |
| Leaflet / React-Leaflet | 1.9 / 4.2 | Interactive maps |
| Lucide React | latest | Icon set |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 4.19 | REST API server |
| PostgreSQL + node-postgres (pg) | 8.4 | Database & ODM |
| JWT (jsonwebtoken) | 9.0 | Auth token signing |
| bcryptjs | 2.4 | Password hashing |
| Nodemailer | 6.9 | Transactional emails |
| Node-cron | 3.0 | Scheduled tasks |
| Joi + joi-password-complexity | 17.13 | Input validation |
| CORS | 2.8 | Cross-origin handling |
| dotenv | 16.4 | Environment config |

### Infrastructure
| Service | Usage |
|---|---|
| PostgreSQL Atlas | Cloud database |
| Firebase | Google OAuth |
| Cloudinary | Image hosting (CDN) |
| Vercel | Frontend deployment |
| Let's Encrypt | HTTPS SSL certificates |

---

## 📂 Project Structure

```
TravelMERN/
├── 📁 backend/
│   ├── 📁 controllers/
│   │   ├── authController.js       # signup, signin, googleSignIn, signout
│   │   ├── userController.js       # email verification
│   │   └── formController.js       # booking enquiry + email dispatch
│   ├── 📁 models/
│   │   ├── user_model.js           # User schema + JWT token generation
│   │   ├── token.js                # Verification token schema (TTL: 1hr)
│   │   └── form.js                 # Booking enquiry schema
│   ├── 📁 routes/
│   │   ├── authRoutes.js           # /api/auth/* endpoints
│   │   ├── user_routes.js          # /api/user/* + email verify
│   │   └── formSubmit.js           # /api/forms/submit-form
│   ├── 📁 Utils/
│   │   ├── sendEmail.js            # Nodemailer email utility
│   │   └── cleanupUnverifiedUsers.js  # Hourly cron job
│   ├── index.js                    # Express app + HTTPS server setup
│   └── package.json
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 pages/
    │   │   ├── Home.jsx             # Landing page + booking search widget
    │   │   ├── SignIn.jsx           # Login page (email + Google OAuth)
    │   │   ├── SignUp.jsx           # Registration page
    │   │   ├── Dashboard.jsx        # User dashboard
    │   │   ├── AboutUs.jsx          # About section
    │   │   ├── Blog.jsx             # Blog listing page
    │   │   ├── BlogPostPage.jsx     # Individual blog post
    │   │   ├── landing-kasol.jsx    # Kasol property overview
    │   │   ├── info-sd.jsx          # Mountain View room info
    │   │   ├── info-lux.jsx         # River View room info
    │   │   ├── info-fam.jsx         # Family Suite info
    │   │   ├── sd-enq.jsx           # Deluxe Room booking form
    │   │   ├── lux-enq.jsx          # River View booking form
    │   │   ├── fam-enq.jsx          # Family Suite booking form
    │   │   └── ThankYou.jsx         # Post-booking thank you
    │   ├── 📁 components/
    │   │   ├── Header.jsx           # Site header
    │   │   ├── OAuth.jsx            # Google sign-in button
    │   │   ├── PrivateRouting.jsx   # Auth-protected route wrapper
    │   │   ├── Profile.jsx          # User profile component
    │   │   ├── SideBar.jsx          # Mobile navigation sidebar
    │   │   ├── DatePicker.jsx       # Custom date picker wrapper
    │   │   ├── IncDecButton.jsx     # Guest count control
    │   │   ├── footer.jsx           # Site footer + contact
    │   │   ├── host.jsx             # "About us" host section
    │   │   ├── EmailVerify/         # Email verification handler
    │   │   └── firstPage/           # Homepage sub-components
    │   │       ├── properties.jsx   # Property cards grid
    │   │       ├── testimonials.jsx # Guest reviews
    │   │       └── Gallery.jsx      # Photo gallery
    │   ├── 📁 pagesMohin/
    │   │   ├── landing.jsx          # Alternative landing
    │   │   ├── legal.jsx            # Privacy & cancellation policy
    │   │   └── thankyou.jsx         # Alternate thank you
    │   ├── 📁 redux/
    │   │   ├── store.js             # Redux store + redux-persist config
    │   │   ├── userSlice.js         # Auth state (currentUser, loading, error)
    │   │   └── formSlice.js         # Booking form state (dates, guests, room)
    │   ├── 📁 api/
    │   │   └── axios.js             # Configured Axios instance
    │   ├── 📁 routing/
    │   │   └── Routing.jsx          # All React Router routes
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── Firebase.js              # Firebase app init
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                       │
│                                                             │
│  React + Vite  ──►  Redux (user + form state)              │
│       │                      │                              │
│  React Router              Persist (localStorage)           │
│       │                                                     │
│  Firebase Auth (Google OAuth)                               │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS / REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node + Express)                  │
│                                                             │
│  /api/auth/*  ──►  authController  ──►  User Model         │
│  /api/user/*  ──►  userController  ──►  Token Model        │
│  /api/forms/* ──►  formController  ──►  Form Model         │
│                          │                                  │
│                    Nodemailer  ──►  Guest & Admin Email     │
│                    node-cron   ──►  Hourly Cleanup Job      │
└────────────────────────┬────────────────────────────────────┘
                         │ node-postgres (pg) ODM
                         ▼
                ┌─────────────────┐
                │  PostgreSQL Atlas   │
                │  - users         │
                │  - tokens        │
                │  - forms         │
                └─────────────────┘
```

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/signup` | Register a new user | `{ userName, email, password }` |
| `POST` | `/signin` | Login with email & password | `{ email, password }` |
| `POST` | `/google` | Login / Register via Google OAuth | `{ email, name, googlePhotoURL }` |
| `POST` | `/signout` | Clear auth cookie & sign out | — |

### User Routes — `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/:id/verify/:token` | Verify email address via one-time token link |

### Form Routes — `/api/forms`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/submit-form` | Submit a room booking enquiry | `{ userName, email, phoneNumber, numberOfGuests, checkInDate, checkOutDate, branchName, roomName }` |

---

## 🗄️ Database Models

### User
```js
{
  userName:       String  (unique, required)
  email:          String  (unique, required)
  password:       String  (bcrypt hashed)
  verified:       Boolean (default: false)
  profilePicture: String  (default avatar URL)
  createdAt:      Date
}
```

### Token *(Email Verification)*
```js
{
  userId:    ObjectId  → ref: 'User'
  token:     String    (crypto random hex)
  createdAt: Date      (TTL: 3600s — auto-expires)
}
```

### Form *(Booking Enquiry)*
```js
{
  userName:       String
  email:          String
  phoneNumber:    Number
  numberOfGuests: Number
  checkInDate:    Date
  checkOutDate:   Date
  branchName:     String
  roomName:       String
}
```

---

## 🔁 Redux State Management

The app uses **Redux Toolkit** with **redux-persist** (localStorage) for two slices:

### `userSlice` — Authentication State
```js
{
  currentUser: null | { ...userDoc },
  loading:     Boolean,
  error:       String | null
}
// Actions: signInStart, signInSuccess, signInFailure, signoutSuccess, refreshSignIn
```

### `formSlice` — Booking Form State
```js
{
  path:           String   // redirect path after login
  userName:       String
  email:          String
  phoneNumber:    String
  numberOfGuests: String
  checkInDate:    String
  checkOutDate:   String
  branchName:     String
  roomName:       String
  loading:        Boolean
}
// Actions: setFormData, resetForm, loadForm, loadFormSuccess, loadingFalse
```

> Form data persists across sessions so users can continue their booking after signing in.

---

## 🔐 Authentication Flow

```
 ┌──────────────┐     1. Fill signup form      ┌────────────────┐
 │    User      │ ─────────────────────────── ▶ │   /api/auth    │
 └──────────────┘                               │   /signup      │
                                                └───────┬────────┘
                                                        │ 2. Hash password + save user
                                                        │ 3. Generate crypto token
                                                        ▼
                                               ┌─────────────────┐
                                               │  Send email with │
                                               │  verification    │
                                               │  link via        │
                                               │  Nodemailer      │
                                               └───────┬─────────┘
                                                       │
 ┌──────────────┐   4. Click link in email             │
 │    User      │ ◀────────────────────────────────────┘
 └──────┬───────┘
        │  GET /api/user/:id/verify/:token
        ▼
 ┌──────────────────────┐
 │  user.verified = true │
 │  Token deleted        │
 │  Redirect → /signin   │
 └──────────────────────┘
        │  5. Sign in
        ▼
 ┌──────────────────────────────────────┐
 │  JWT issued → httpOnly secure cookie │
 │  Redux state updated (currentUser)   │
 │  Redirected to booking page / home   │
 └──────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- **PostgreSQL Atlas** account
- **Firebase** project (for Google OAuth)
- **Nodemailer**-compatible email account (Gmail / SMTP)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/TravelMERN.git
cd TravelMERN
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

There is a single env file for the whole repo:

```bash
cp .env.example .env   # then fill in the values
```

### 5. Run the Development Servers

From the repo root:
```bash
npm run install:all
npm run dev
# API: http://localhost:3000   Web: http://localhost:5173 (proxies /api to the API)
```

---

## 🌍 Environment Variables

All variables live in one root `.env` (see `.env.example`). `VITE_*` variables are baked into the frontend at build time; the rest are read by the server at runtime.

## ☁️ Deployment (Railway)

One service serves both the API and the built frontend.

- Build: `npm run build`, Start: `npm start` (already set in `railway.json`)
- Add a **PostgreSQL** service in the same Railway project; on the app service set `DATABASE_URL` to `${{Postgres.DATABASE_URL}}`
- Paste the rest of `.env` into Railway > Variables > RAW Editor
- Tables are created automatically on first start
- Set `BASE_URL` / `FRONTEND_URL` to your custom domain

### Migrating old MongoDB data

Run once from your machine with `MONGODB` (old Atlas URI) and `DATABASE_URL` (Railway Postgres, **public** URL) set in `.env`:

```bash
npm run migrate
```

It writes a JSON backup to `data-export/` (git-ignored; contains password hashes, keep private) and imports users, enquiries and live verification tokens. Password hashes are copied unchanged, so existing users can still sign in. It is safe to re-run.

---

## 🗺️ Routes Summary

| Path | Component | Auth Required |
|------|-----------|:---:|
| `/` | Home (landing + search) | ❌ |
| `/signin` | Sign In | ❌ |
| `/signup` | Sign Up | ❌ |
| `/user/:id/verify/:token` | Email Verify | ❌ |
| `/about` | About Us | ❌ |
| `/blog` | Blog Listing | ❌ |
| `/blog/:slug` | Blog Post | ❌ |
| `/midorchard-kasol` | Kasol Property Landing | ❌ |
| `/kasol-mountain-view-hotel` | Mountain View Room Info | ❌ |
| `/kasol-river-view-hotel` | River View Room Info | ❌ |
| `/kasol-family-hotel` | Family Suite Info | ❌ |
| `/deluxe-room-booking` | Deluxe Room Enquiry Form | ❌ |
| `/river-view-booking` | River View Enquiry Form | ❌ |
| `/family-hotel-booking` | Family Suite Enquiry Form | ❌ |
| `/thankyou` | Thank You Page | ❌ |
| `/midorchard-policy` | Legal / Policy | ❌ |
| `/dashboard` | User Dashboard | ✅ |
| `/host` | Host Info | ❌ |

---


<div align="center">

Made with ❤️ for the mountains of Kasol

**[⬆ Back to top](#️-mid-orchard--hotel-booking-platform)**

</div>
