# 🏠 Nestora-Real-Estate

Nestora-Real-Estate is a full-stack web application that enables users to browse, search, and manage real estate listings available for **sale** and **rent**. It includes both **user** and **admin** functionalities, such as adding properties, editing listings, and contacting landlords.

## 🌐 Live Demo

> _[Deploy URL if any]_  
> _Coming soon or hosted on localhost during development._

---

## 📸 Preview

_**Screenshots to be added here** (you can use `![Alt text](image-path)` when adding later)_

---

## 🚀 Features

- 🔐 **User Authentication** (Sign In / Sign Up using Firebase)
- 🔍 **Search and Filter Listings** (by rent/sale/offer/furnished/parking)
- 📝 **Property Management** (create, update, delete listings)
- 💬 **Contact Landlord via Email**
- 👤 **Profile Management** (update details, delete account)
- ⚙️ **Admin Access** for listing management
- 📱 **Responsive Design** (mobile-friendly)
- 🎨 **Smooth Animations and Transitions**

---

## 🛠️ Tech Stack

### 🔧 Frontend

- **React.js**  
- **Tailwind CSS**  
- **Framer Motion** — animations  
- **Swiper.js** — property carousels  
- **React Icons**, **React Hot Toast**, **Lenis** — smooth scroll  
- **Lordicon** — Lottie animations  

### 🧠 State Management

- **Redux Toolkit**  
- **Redux Persist**  

### ⚙️ Backend

- **Node.js**  
- **Express.js**  
- **MongoDB** with Mongoose  

### 🔐 Authentication

- **Firebase Authentication**

### ☁️ Image Upload

- **Cloudinary**

---

## 🗂️ Project Structure



Nestora-Real-Estate/
├── client/ # Frontend (React)
│ ├── src/
│ │ ├── Animations/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── user/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── vite.config.js

├── api/ # Backend (Node + Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js

├── .env
├── package.json
└── README.md



