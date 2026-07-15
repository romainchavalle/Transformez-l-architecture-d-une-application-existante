# 📝 Notes App - Architectural Refactoring (REST API & React SPA)

> A complete architectural redesign transforming a legacy monolithic application into a modern, decoupled, and highly scalable Full-Stack platform.

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel_12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## 📖 Overview & Business Logic

This project is a **Note-Taking Application** that allows users to securely create, read, update, and delete their personal notes. 

While the functional scope (taking notes) is straightforward, **the true purpose of this repository is an architectural demonstration.** It showcases the process of migrating a legacy Laravel Monolith (Blade + Livewire) into a decoupled ecosystem with a headless REST API and an independent Single Page Application (SPA).

---

## 🚀 Target Architecture & Technologies

### 1. Back-End (REST API)
The backend was heavily refactored to serve as a pure API provider.
- **Framework:** Laravel 12
- **Database:** SQLite
- **Security:** Token-based authentication using **Laravel Sanctum** (Bearer Tokens).
- **Design Patterns:** Strict application of **SOLID** principles:
  - Isolated API routing (`routes/api.php`).
  - Request validation moved entirely to dedicated `FormRequests`.
  - Business logic encapsulated inside `Services` (Single Responsibility Principle).
  - Implementation of "Skinny Controllers".

### 2. Front-End (Client SPA)
The frontend was entirely rebuilt from scratch to consume the new API.
- **Environment:** React + Vite (for optimal development performance).
- **State Management:** **Zustand**, chosen for its lightweight and simple approach to global state.
- **HTTP Client:** **Axios**, configured with an interceptor system for automatic and transparent injection of security tokens.
- **Routing:** React Router with custom "Guards" to protect private routes (e.g., dashboard).
- **Structure:** "Feature-based" architecture (grouped by functional domain: Notes, Auth) promoting long-term maintainability.

---

## 🛠️ Local Installation & Startup

Because the application is decoupled, the API server and the Frontend client must be started separately in two different terminals.

### Step 1: Start the Backend (Laravel API)
From the project root:

```bash
# 1. Install PHP dependencies
composer install

# 2. Configure environment file
cp .env.example .env
php artisan key:generate

# 3. Initialize SQLite database
touch database/database.sqlite
php artisan migrate --seed

# 4. Launch local server
php artisan serve
```

### Step 2: Start the Frontend (React)

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

---
*Architectural refactoring performed by Romain Chavalle.*
