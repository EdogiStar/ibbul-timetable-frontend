# IBBUL Timetable Scheduling System (Frontend)

A modern React-based frontend for the Ibrahim Badamasi Babangida University, Lapai (IBBUL) Timetable Scheduling System. The application provides an intuitive interface for managing faculties, departments, programmes, courses, lecturers, venues, timetable scheduling, and other academic resources.

## Features

- Secure Authentication
- Responsive Dashboard
- Faculty Management (CRUD)
- Search Functionality
- Reusable UI Components
- Protected Routes
- REST API Integration
- Responsive Design
- Toast Notifications
- Clean and Modular Architecture

## Tech Stack

- React
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React
- Sonner
- Vite

## Project Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   └── layout/
├── context/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   └── faculties/
├── routes/
├── services/
├── utils/
└── App.jsx
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/EdogiStar/ibbul-timetable-frontend.git
```

### Navigate into the project

```bash
cd ibbul-timetable-frontend
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Replace the URL with your backend server URL when deploying.

### Start the development server

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build.

## Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Faculty Management
- Add Faculty Modal
- Edit Faculty Modal

## Backend Repository

Backend API:

https://github.com/EdogiStar/ibbul-timetable-backend

## Future Modules

- Departments
- Programmes
- Levels
- Sessions
- Semesters
- Lecturers
- Venues
- Courses
- Course Offerings
- Course Allocations
- Timetable Scheduler
- Reports
- User Management

## Author

**Isah Muhammad Alhaji**

- GitHub: https://github.com/EdogiStar
- Portfolio: https://mxdev.netlify.app

## License

This project is developed for educational and demonstration purposes.