# User Profile Management System (Internship Task)

A full-stack web application for User Registration, Login, and Profile Management using **PHP**, **MySQL**, **MongoDB**, and **Redis**.

## 🚀 Features
- **User Registration**: Secure sign-up with email and password (stored in **MySQL**).
- **Authentication**: Login system using **Redis** for session management.
- **Profile Management**: Update user details (Name, Age, City, etc.) stored in **MongoDB**.
- **File Upload**: Upload and save profile photos.
- **Frontend**: Responsive UI using **Bootstrap** and **jQuery**.

## 🛠️ Tech Stack
- **Backend**: PHP (Procedural)
- **Frontend**: HTML, CSS, JavaScript (jQuery, Bootstrap)
- **Databases**:
  - **MySQL**: Stores user credentials (email, password hash).
  - **MongoDB**: Stores user profile details (flexible schema).
  - **Redis**: Stores active session tokens.

## ⚙️ Setup Instructions

### 1. Prerequisites
- Install **XAMPP** (for Apache & MySQL).
- Install **MongoDB** server.
- Install **Redis** server.
- Configure `php.ini` to enable extensions: `mysqli`, `mongodb`, `redis`.

### 2. Database Setup
1. Open **phpMyAdmin**.
2. Create a new database or simply import the provided SQL commands.
3. Import the contents of `database.sql` or run this SQL command:
   ```sql
   CREATE DATABASE IF NOT EXISTS vsail_intern;
   USE vsail_intern;
   
   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 3. Run the Project
1. Open the project folder in a terminal.
2. Start the PHP built-in server:
   ```bash
   php -S localhost:8000
   ```
3. Open your browser and visit:  
   **http://localhost:8000/index.html**

## 📂 Project Structure
```
/IITTASK01
│── /assets         # Uploaded images
│── /css            # Stylesheets
│── /js             # Frontend logic (AJAX)
│── /php            # Backend logic (API endpoints)
│── index.html      # Landing Page
│── login.html      # Login Page
│── register.html   # Registration Page
│── profile.html    # Profile Dashboard
│── database.sql    # Database Setup Script
└── README.md       # Project Documentation
```

## 👨‍💻 Author
**Gowthaman**  
*Internship Task Submission*
