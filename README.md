#  Kick Slot — Football Pitch Booking System

A full-stack web application for managing and booking 5-a-side football pitches. Built with Node.js, Express, MongoDB, and React.

---

##  Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt, Joi, dotenv, cors

**Frontend**
- React + Vite
- Bootstrap + CSS Modules
- Axios
- React Router DOM
- FontAwesome

---

##  Features

-  Secure Register & Login with JWT
-  Browse & search football pitches
-  Slot booking system with conflict prevention
-  Dual payment support (Online & Cash)
-  Booking notifications
-  Post-match pitch ratings & reviews
-  Admin dashboard with full management control

---

##  Project Structure

```
Kick_Slot/
├── Back_end/
│   ├── config/
│   │   └── db_connect.js
│   ├── controller/
│   │   ├── validate/
│   │   │   └── joi_valid.js
│   │   └── auth_controller.js
│   ├── model/
│   │   └── User.js
│   ├── routes/
│   │   └── authrouts.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   └── app.js
└── Front_end/
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Home.jsx
        ├── components/
        ├── admin/
        ├── services/
        │   └── api.js
        └── App.jsx
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/kick-slot.git
cd kick-slot
```

### 2. Backend Setup
```bash
cd Back_end
npm install
```

Create a `.env` file:
```
PORT=8000
DB_URL=mongodb://127.0.0.1:27017/kick_Slot
SECRET_KEY=your_secret_key_here
```

Run the server:
```bash
nodemon app.js
```

### 3. Frontend Setup
```bash
cd Front_end
npm install
npm run dev
```

---

##  PI Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Register a new user |
| POST | /api/loginUser | Login and get JWT token |
| GET | /api/logout | Logout user |

---

##  Project Timeline

| Phase | Duration |
|-------|----------|
| Auth System | May 19 – May 28 |
| Pitch Management | May 29 – Jun 11 |
| Slot & Booking | Jun 12 – Jun 25 |
| Payment | Jun 26 – Jul 09 |
| Notifications | Jul 10 – Jul 16 |
| Reviews & Ratings | Jul 17 – Jul 23 |
| Admin Dashboard | Jul 24 – Jul 31 |
| Testing & QA | Aug 01 – Aug 06 |
| Deployment | Aug 07 – Aug 10 |

---

##  Author

Ahmed — Full Stack Developer
