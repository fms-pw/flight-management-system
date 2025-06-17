# Pw Flights

### Flight Management System

A **comprehensive Flight Management System (FMS)** designed to automate airline operations—flight scheduling, ticket booking, passenger management, and real-time status tracking—using the MERN stack.

---

## 🎯 Goals & Objectives

- **Automation of Airline Operations**
  Reduce manual effort and errors by automating flight scheduling, bookings, and data management.
- **Improved Customer Experience**
  Provide an intuitive platform for users to search, book, modify, or cancel flights.
- **Enhanced Data Accuracy & Security**
  Securely store and process airline and passenger data with role-based access.
- **Administrative Control**
  Centralized dashboard for admins to manage flights, bookings, users, and reporting.
- **Scalability & Resilience**
  Auto-scaling infrastructure to handle traffic spikes and ensure high availability.

---

## 💡 Key Features

### Admin Panel

1. **Dashboard Overview**
   Flight statistics: Scheduled, Delayed, Canceled flights.
2. **Flight Management**
   Add/update/delete flights, set times, destinations, aircraft types.
3. **Route & Schedule Management**
   Define routes (e.g., JFK→LAX) and recurring or one-time schedules.
4. **Booking Management**
   View/manage all bookings, pricing, class quotas.
5. **User Management**
   Add/block/remove users; view profiles, booking history, feedback.
6. **Reports**
   Downloadable CSV/PDF reports filtered by date, route, or class.

### User (Passenger)

1. **Registration & Login**
   JWT-based signup/login, profile management.
2. **Flight Search**
   Search by date, origin, destination, apply filters (non-stop, price).
3. **Ticket Booking**
   Select flight and seat class, enter passenger details, secure payment.
4. **Booking Management**
   View, download, cancel, or reschedule tickets.
5. **Real-Time Flight Status**
   Live updates on delays, gates, arrivals, departures.
6. **E-Ticket & Boarding Pass**
   Generate and download PDFs.
7. **Loyalty & Rewards**
   Earn points, redeem for discounts/upgrades.

---

## 🏗 System Architecture

- **Frontend:** React.js (Vite), React Router, Axios, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT + role-based middleware
- **Notifications:** WebSockets or Firebase Cloud Messaging
- **Payment Gateway:** Stripe / Razorpay integration (demo)
- **Infrastructure:** Docker, AWS ECS (Fargate), S3/CloudFront, Route 53
- **CI/CD:** GitHub Actions for automated build & deploy

---

## 🚀 API Endpoints

### Authentication & Authorization

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | User registration          |
| POST   | `/api/auth/login`    | Login + JWT                |
| POST   | `/api/auth/logout`   | Logout                     |
| GET    | `/api/auth/profile`  | Fetch current user profile |

### User Management

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/users/`    | \[Admin] List all users |
| GET    | `/api/users/:id` | Get user profile        |
| PUT    | `/api/users/:id` | Update user profile     |
| DELETE | `/api/users/:id` | \[Admin] Delete user    |

### Flight & Route Management

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | `/api/flights/`    | \[Admin] Create flight       |
| GET    | `/api/flights/`    | List all flights             |
| GET    | `/api/flights/:id` | Get flight details           |
| PUT    | `/api/flights/:id` | \[Admin] Update flight       |
| DELETE | `/api/flights/:id` | \[Admin] Delete flight       |
| POST   | `/api/routes/`     | \[Admin] Create route        |
| GET    | `/api/routes/`     | List all routes              |
| POST   | `/api/schedules/`  | \[Admin] Set flight schedule |
| GET    | `/api/schedules/`  | List all schedules           |

### Booking & Payments

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| POST   | `/api/bookings/`               | Book a ticket              |
| GET    | `/api/bookings/`               | \[User] List own bookings  |
| GET    | `/api/admin/bookings/`         | \[Admin] List all bookings |
| PUT    | `/api/bookings/:id/cancel`     | Cancel booking             |
| PUT    | `/api/bookings/:id/reschedule` | Reschedule booking         |
| POST   | `/api/payments/checkout`       | Initiate payment           |
| POST   | `/api/payments/webhook`        | Handle payment webhook     |

---

## ⚙️ Setup & Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/fms-pw/flight-management-system.git
   cd flight-management-system
   ```

2. **Environment variables**

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   - Fill in MongoDB URI, JWT secret, payment & AWS keys.

3. **Run with Docker**

   ```bash
   docker-compose up --build
   ```

4. **Access locally**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

---

## 📄 License & Contributors

- **License:** [LICENSE](LICENSE)
- **Contributors:** Kailash Parihar, Zakir Khan, Tanya Tiwari, Laxmi, Mayank Yadav

---

## 🤝 Contributing

1. Fork and clone the repo
2. Create feature branch: `git checkout -b feature/xyz`
3. Commit with Conventional Commits: `description`
4. Push and open a PR
5. Ensure tests pass and reviews complete before merge
