<h1 align="center">MERN Integration Project - Entri Elevate CRM 🚀</h1>

<p align="center">
  A full-stack Customer Relationship Management (CRM) application built using the complete MERN stack. Designed with a stunning UI and secure API architecture.
</p>

<p align="center">
  <strong>Educational and Practice Purpose Only</strong><br/>
  <strong>Developer:</strong> Ashfaaq Feroz Muhammad - Entri Elevate MERN
</p>

---

## 🔗 Live Demo & Preview
> **Live Preview:** [Link to be added after hosting]
> 
> 💡 **Project Demonstration:** A full screen recording of the completed MERN integration CRM web application is available natively in the repository!  
> 🎥 **[Watch the Screen Recording Here](./screenrecord/Screen%20Recording.mov)**

## 🌟 Key Features
- **Modern Frontend Ecosystem**: Developed rapidly using React.js and Vite.
- **Dynamic UI/UX**: Includes a unique Blue-to-White gradient theme, Tailwind CSS styling, and a fully functional Dark/Light mode toggle.
- **Backend Architecture**: Node.js and Express.js RESTful API following the robust MVC (Model-View-Controller) design pattern.
- **Authentication**: Secure JSON Web Token (JWT) based user registration and login.
- **Database Strategy**: MongoDB integration using Mongoose models with strict schema validation.
- **CRM Operations**: Perform complete CRUD operations (Create, Read, Update, Delete) on customer records securely as an authenticated user.

## 📁 File Structure
```text
MERN Integration Project A14/
│
├── client/                     # React Frontend Environment
│   ├── public/                 # Static Assets
│   ├── src/                    
│   │   ├── components/         # Reusable UI Elements (Navbar, Modals)
│   │   ├── pages/              # Application Routes (Register, Login, Dashboard)
│   │   ├── App.jsx             # Core React Router and Theme Management
│   │   └── index.css           # Global Tailwind CSS and Custom Styles
│   └── vite.config.js          
│
├── server/                     # Node.js + Express Backend
│   ├── config/                 # DB Configuration (MongoDB connection logic)
│   ├── controllers/            # Controller Logic (User Auth and Customer CRM)
│   ├── middleware/             # Validation logic & Auth Guards (JWT Checks)
│   ├── models/                 # Database Schemas (Mongoose)
│   ├── routes/                 # Express API Routers
│   ├── .env                    # Environment Variables (Port, DB URI, JWT Secret)
│   └── app.js                  # Backend Entry Point and Error Handling
│
└── README.md                   # Project Documentation
```

## 🛠️ Technology Stack
### Frontend
- React 18 (Vite Template)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs (Password Hashing)
- CORS & dotenv

## 💻 Running the Project Locally

Follow these steps to safely clone and run the application on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/ashfaaqkt/MERN-Integration-A14-M5-Entri-Elevate.git
cd "MERN Integration Project A14"
```

### 2. Configure Environment Variables
Navigate into the `server` directory and create a `.env` file (if it doesn't exist):
```env
PORT=5001
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/?appName=MERN-Integration
JWT_SECRET=your_secure_secret_string_here
```

### 3. Install Packages & Run the Servers
You will need to open **two** separate terminal windows to run both the frontend and backend simultaneously.

**Start the Backend (Terminal 1):**
```bash
cd server
npm install
npm run dev
```
*(The server should log that it is correctly connected to MongoDB on port 5001.)*

**Start the Frontend (Terminal 2):**
```bash
cd client
npm install
npm run dev
```

### 4. Open in Browser
Once both terminal windows indicate that the servers are running successfully, open your browser and explore the project at:  
👉 `http://localhost:5173`

---
*Developed as part of the Entri Elevate MERN Full Stack Development assignment constraints.*
