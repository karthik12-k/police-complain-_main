# Police Complaint System 🚨

A full-stack real-time Police Complaint and Tracking System consisting of a **Node.js/Express Backend Web Portal** and a **React Native Mobile Application**. The platform allows users to report incidents and track nearby police officers in real-time.

---

## 🏗️ Project Architecture

```
                    ┌─────────────────────────┐
                    │   React Native App      │
                    │   (Mobile Frontend)     │
                    └───────────┬─────────────┘
                                │
                      HTTP /    │ Socket.io
                    WebSockets  │ (Live Location)
                                ▼
                    ┌─────────────────────────┐
                    │     Node.js Server      │
                    │    (Express Backend)    │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │     MongoDB Database    │
                    │    (Mongoose ORM)       │
                    └─────────────────────────┘
```

---

## 🌟 Key Features

- **Real-Time Tracking**: WebSocket-based (Socket.io) live location sharing of active police officers.
- **Map Integration**: Mapbox integration for interactive mapping and visual navigation.
- **Authentication**: Secure registration and login for both Users and Police Officers (using JWT).
- **Incident Reporting**: Form for reporting complaints with current geolocation coordinates.
- **Notifications**: Automated email notifications (Nodemailer) and SMS/OTP verification (Twilio).

---

## 🛠️ Tech Stack

### Backend Server & Web Portal
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ORM)
- **Real-Time Communication**: Socket.io (WebSockets)
- **External APIs**: Mapbox GL JS, Twilio (SMS), Nodemailer (SMTP/Email)

### Mobile Application
- **Framework**: React Native (TypeScript)
- **Navigation**: React Navigation (Stack)
- **Networking**: Axios, Socket.io Client
- **Sensors**: React Native Community Geolocation

---

## 📂 Project Structure

```
Police-Complaint/
├── README.md                          # Main documentation
├── .gitignore                         # Git exclusion rules
├── run_app.ps1                        # PowerShell automation script for Android
├── package.json                       # Workspace/Root metadata
├── MobileApp/                         # React Native Application source
│   ├── android/                       # Native Android configuration
│   ├── ios/                           # Native iOS configuration
│   ├── src/                           # TypeScript React Native code
│   └── tsconfig.json                  # TS compiler config
└── Police-Complaint-main/             # Node.js backend & frontend views
    ├── controllers/                   # Request handler functions
    ├── models/                        # Mongoose database schemas
    ├── routes/                        # Express API route configurations
    ├── views/                         # Client-side HTML files (Web Portal)
    ├── public/                        # Static assets (CSS, JS scripts, Media)
    ├── index.js                       # Server entrypoint
    └── .env                           # Environment configuration (git-ignored)
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v20 or higher)
- **npm** (v10 or higher)
- **Java Development Kit (JDK 21)** (for Android builds)
- **Android Studio** (configured with Android SDK and Emulator)
- **MongoDB Database** (local instance or cloud database URL)

---

### 🔧 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Police-Complaint-main
   ```
2. Install the server-side dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Police-Complaint-main` folder:
   ```env
   PORT=5000
   DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/databaseName
   SECRET_KEY=your_jwt_secret_key
   TWILIO_ACCOUNT_SID=your_twilio_sid
   AUTH_TOKEN=your_twilio_auth_token
   PH_NO=your_twilio_phone_number
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   *The backend will start listening on http://localhost:5000.*

---

### 📱 2. Mobile App Setup

1. Navigate to the `MobileApp` directory:
   ```bash
   cd MobileApp
   ```
2. Install mobile project dependencies:
   ```bash
   npm install
   ```
3. Launch your Android Emulator or connect a physical Android device.
4. Launch the React Native server and deploy to your device/emulator:
   - **Using the helper script (at the project root)**:
     ```powershell
     .\run_app.ps1
     ```
   - **Using npm commands**:
     ```bash
     npm run android
     ```

---

## 🔒 Security Note
Do **not** upload or commit your `.env` configuration file containing real MongoDB connection URLs, Mapbox tokens, or Twilio API keys to any public repository. These files are excluded locally by the root [`.gitignore`](.gitignore).
