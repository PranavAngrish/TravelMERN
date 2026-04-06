<div align="center">

<img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png" alt="Mid Orchard Logo" width="120" />

# 🏔️ Mid Orchard — Hotel Booking Platform

### *A full-stack MERN application for discovering and booking boutique stays in Kasol, Himachal Pradesh*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
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
- [Live Demo](#-live-demo)
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

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend (Vercel) | [midorchard-client.vercel.app](https://midorchard-client.vercel.app) |
| 🔒 Backend (HTTPS) | [www.hotelmidorchardkasol.in](https://www.hotelmidorchardkasol.in) |

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
| MongoDB + Mongoose | 8.4 | Database & ODM |
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
| MongoDB Atlas | Cloud database |
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
                         │ Mongoose ODM
                         ▼
                ┌─────────────────┐
                │  MongoDB Atlas   │
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
- **MongoDB Atlas** account
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

Create a `.env` file in `/backend`:
```env
MONGODB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWTPRIVATEKEY=your_jwt_private_key
BASE_URL=http://localhost:3000/
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
HTTPS_PORT=3000
```

Create a `.env` file in `/frontend`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### 5. Run the Development Servers

**Backend** (from `/backend`):
```bash
npm run dev
# Server starts at http://localhost:3000
```

**Frontend** (from `/frontend`):
```bash
npm run dev
# App starts at http://localhost:5173
```

> The Vite dev server proxies all `/api` requests to `http://localhost:3000` automatically.

---

## 🌍 Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `MONGODB` | MongoDB Atlas connection URI |
| `JWT_SECRET` | Secret for signing login JWTs |
| `JWTPRIVATEKEY` | Private key for user token generation |
| `BASE_URL` | Backend base URL (for email verification links) |
| `FRONTEND_URL` | Frontend URL (for post-verification redirect) |
| `EMAIL_USER` | Sender email address (Nodemailer) |
| `EMAIL_PASS` | Email password or app password |
| `HTTPS_PORT` | HTTPS server port (default: 3000) |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |

---

## ☁️ Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy /dist to Vercel
```

### Backend → Linux VPS with HTTPS
The backend is configured for **production HTTPS** using **Let's Encrypt** certificates:

```js
// Reads SSL certs from Let's Encrypt paths
const credentials = { key: privateKey, cert: certificate, ca: ca };
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

// HTTP → HTTPS redirect on port 80
httpServer.listen(80);
```

Update the `origin` in CORS config and the `BASE_URL` / `FRONTEND_URL` env vars when deploying.

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

## 📸 Screenshots

> *Hero section of the landing page — full-screen property view with integrated booking search*

The homepage features:
- Full-bleed Cloudinary-hosted background image with parallax
- Responsive navigation with mobile hamburger sidebar
- Inline booking widget (guests · check-in · check-out · search)
- Scrollable sections: Properties → Testimonials → Gallery → About → Blog → Contact

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ for the mountains of Kasol

**[⬆ Back to top](#️-mid-orchard--hotel-booking-platform)**

</div>
