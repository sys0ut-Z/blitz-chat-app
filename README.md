# 💬 Blitz Chat App

A real-time chat application built with the **MERN stack (MongoDB, Express, React JS, Node.js)** and **Socket.IO**, deployed on **Render**.  
The app allows users to register, log in, and chat instantly with others in a clean, responsive UI.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based login & registration)
- 💬 **Real-time Messaging** with Socket.IO
- 👤 **User Presence Status** (online/offline)
- 📱 **Responsive Design** for mobile & desktop
- 🎨 **Frontend** built with React JS + Tailwind CSS
- ⚡ **Backend API** with Express.js
- 🌍 **Deployed** on Render (backend + frontend)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express.js (v4.x)
- MongoDB
- Socket.IO

### Deployment
- Render (Frontend + Backend)

---

## 📂 Project Structure

```
blitz-chat-app/
├── backend/         # Express API + Socket.IO
│   ├── models/      # MongoDB models
│   ├── routes/      # Express routes
│   └── index.js     # App entry point
│
├── frontend/        # React (Vite) client
│   ├── src/         # Components, pages, utils
│   ├── public/      # Static assets
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/blitz-chat-app.git
cd blitz-chat-app
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file inside **backend/**:
```env
PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm run start
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```
Create a `.env` file inside **frontend/**:
```env
BACKEND_URL=http://localhost:5001/api
```

Start frontend:
```bash
npm run dev
```

---

## 🚀 Deployment (Render)

- Add both **frontend** and **backend** as separate services.
- In frontend, set environment variable:
  ```env
  BACKEND_URL=https://your-backend.onrender.com/api
  ```
---

<!-- ## 👨‍💻 Author
Developed by [Zankhan Dhar](https://github.com/sys0ut-z) 🚀 -->
