# SkillBridge — Fiverr-like Freelance Platform

> A full-stack MERN application that connects freelancers and clients — built with real-time chat, AI assistance, and Stripe payments.

🔗 **Live Demo:** [skill-bridge-mern-livid.vercel.app](https://skill-bridge-mern-livid.vercel.app)  
📁 **GitHub:** [github.com/inzajuttsandhu-ctrl/SkillBridge-MERN](https://github.com/inzajuttsandhu-ctrl/SkillBridge-MERN)

---

## 📸 Overview

SkillBridge is a freelance marketplace platform where sellers can post gigs and buyers can browse, order, and pay — similar to Fiverr. It includes real-time messaging via Socket.io, an AI-powered gig description helper, and secure Stripe payment integration with an escrow model.

---

## ✨ Features

- 🔐 **Authentication** — JWT-based login/signup with bcrypt password hashing
- 📦 **Gig Management** — Create, read, update, delete gigs with search & filter
- 🛒 **Order System** — Full buyer/seller order flow with status tracking
- 💳 **Stripe Payments** — Secure checkout with escrow payment model
- 💬 **Real-time Chat** — Live messaging with Socket.io chat rooms
- 🤖 **AI Write Helper** — GPT-powered gig description generator
- ⭐ **Reviews & Ratings** — Buyer review system with star ratings
- 🛠️ **Admin Panel** — User management, analytics, and ban controls

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React.js | UI & component architecture |
| Redux | Global state management |
| Tailwind CSS | Styling & responsive design |
| Socket.io Client | Real-time chat UI |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + bcrypt | Auth & security |
| Socket.io | Real-time messaging |
| Stripe | Payment processing |
| OpenAI GPT API | AI gig description helper |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account
- OpenAI API key

### Clone the repo
```bash
git clone https://github.com/inzajuttsandhu-ctrl/SkillBridge-MERN.git
cd SkillBridge-MERN
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
OPENAI_API_KEY=your_openai_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
SkillBridge-MERN/
├── backend/
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── middleware/       # Auth & error handling
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── redux/       # State management
│   │   └── App.jsx
└── README.md
```

---

## 🌐 Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 👩‍💻 Developer

**Inza Sandhu**  
MERN Stack Developer | BS Software Engineering — Superior University, Lahore  
📧 inzajuttsandhu@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/inza-sandhu) · [GitHub](https://github.com/inzajuttsandhu-ctrl)
