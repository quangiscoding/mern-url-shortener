# 📄 URL Shortener

## Live demo: https://shortenurl-aa1b16bcab85.herokuapp.com/

## 📌 Project Overview

This project is a full-stack URL shortener application that transforms long URLs into short, shareable links. It provides fast redirection, simple user interaction, and a scalable backend for storing and retrieving URL mappings.

The application demonstrates core web development concepts including RESTful API design, client-server architecture, and database integration.

---

## ✨ Features Implemented

- 🔗 Shorten long URLs into unique short links
- 🚀 Instant redirection to original URLs
- 📋 Copy-to-clipboard functionality
- 📱 QR code generation for each short URL
- 🛡️ Input validation and error handling
- ⚡ Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js

### Database

- MongoDB (Mongoose)

### Utilities

- NanoID (unique ID generation)
- QR Code generator

---

## 🏗️ Architecture Overview

The application follows a **client-server architecture**:

- **Frontend (React)**  
  Handles user input, displays shortened URLs, and communicates with the backend.

- **Backend (Express)**  
  Processes API requests, generates short IDs, stores URL mappings, and handles redirection.

- **Database (MongoDB)**  
  Stores the relationship between short URLs and original URLs.

### Workflow

1. User submits a long URL via the frontend
2. Backend validates the URL
3. A unique `shortId` is generated
4. URL mapping is stored in the database
5. Short URL is returned to the user
6. When accessed, backend redirects to the original URL

---

## 🔌 API Design

### Base URL

/api/urls

### Endpoints

#### 1. Create Short URL

POST /api/urls

**Request Body:**

```json
{
  "originalUrl": "https://example.com"
}
```

**Response**

```json
{
  "shortId": "abc123",
  "shortUrl": "http://localhost:5001/abc123"
}
```

#### 2. Redirect to Original URL

GET /:shortId
**Description:**
Redirects the user to the original URL associated with the given shortId.

#### 3. Data Model

URL Schema

{
shortId: {
type: String,
required: true,
unique: true
},
originalUrl: {
type: String,
required: true
},
createdAt: {
type: Date,
default: Date.now
}
}

### 4. How to Run

1. Clone the Repository
   git clone https://github.com/quangiscoding/mern-url-shortener.git
   cd url-shortener

2. In the backend folder, create a .env file like this:
   PORT=5001
   MONGO_URI=mongodb+srv://quangnguyen2005gt08_db_user:bioQWXS0eGZl8fJI@cluster0.9dmy2up.mongodb.net/urls_db?appName=Cluster0
   BASE_URL=http://localhost:5001
3. In the frontend folder, create a .env file like this:
   VITE_BACKEND_URL=http://localhost:5001/api/urls

4. Now from the root directory (url-shortener folder), run:
   npm run build
   npm run start

5. Open browser and navigate to:
   http://localhost:5001
