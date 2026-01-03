# Gap2Growth

**Adaptive Student Time Utilisation & Learning Continuity System**

A web application that helps students make the most of their free time by detecting timetable gaps, recommending productive activities, and tracking learning progress.

---

## 🎯 Features

- **Firebase Authentication** - Secure login with Google and Email/Password
- **Role-Based Dashboards** - Separate views for Students, Teachers, and Admins
- **Timetable Gap Detection** - Automatically identifies free slots and cancelled classes
- **Activity Recommendation** - Smart suggestions based on available time and student interests
- **Progress Tracking** - Track completed activities and learning hours
- **PDF Reports** - Generate weekly/monthly progress reports

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript

### Backend
- Python 3.10+
- Flask

### Database & Auth
- Supabase (PostgreSQL)
- Firebase Authentication

### Additional Tools
- APScheduler (Background jobs)
- WeasyPrint (PDF generation)
- Gmail SMTP (Notifications)

---

## 📁 Project Structure

```
gap2growth/
│
├── app/
│   ├── __init__.py              # App package initializer
│   ├── routes/
│   │   ├── auth_routes.py       # Authentication API routes
│   │   ├── frontend_routes.py   # HTML page routes
│   │   ├── student_routes.py    # Student API routes
│   │   ├── teacher_routes.py    # Teacher API routes
│   │   └── admin_routes.py      # Admin API routes
│   │
│   ├── services/
│   │   ├── auth_service.py      # Firebase token verification
│   │   ├── supabase_service.py  # Database operations
│   │   └── scheduler_service.py # Background job scheduler
│   │
│   ├── templates/               # HTML templates
│   │   ├── login.html
│   │   ├── student_dashboard.html
│   │   ├── teacher_dashboard.html
│   │   └── admin_dashboard.html
│   │
│   ├── static/
│   │   ├── css/                 # Stylesheets
│   │   │   ├── main.css
│   │   │   ├── login.css
│   │   │   └── dashboard.css
│   │   └── js/                  # JavaScript files
│   │       ├── main.js
│   │       ├── login.js
│   │       └── dashboard.js
│   │
│   └── utils/
│       └── decorators.py        # Route protection decorators
│
├── app.py                       # Flask application entry point
├── config.py                    # Configuration settings
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables (not in git)
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- A Supabase account
- A Firebase project

### Installation

1. **Clone or navigate to the project folder**
   ```bash
   cd gap2growth
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Edit the `.env` file with your credentials:
   ```env
   SECRET_KEY=your-secret-key
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   FIREBASE_CREDENTIALS=path/to/firebase-credentials.json
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open in browser**
   ```
   http://localhost:5000
   ```

---

## 👥 User Roles

### Student
- View personal timetable and free slots
- See recommended activities
- Start and complete activities
- Track progress and view reports

### Teacher
- Manage class schedules
- Cancel classes (notifies students)
- Create learning activities
- View student engagement

### Admin
- Manage all users
- Approve new registrations
- Manage departments and courses
- View system-wide analytics

---

## 🧪 Demo Credentials

For testing the frontend (Phase 1), you can use any email/password combination. The demo mode will simulate login and redirect to the appropriate dashboard based on the selected role.

| Role    | Demo Access                     |
|---------|--------------------------------|
| Student | Select "Student" tab and login |
| Teacher | Select "Teacher" tab and login |
| Admin   | Select "Admin" tab and login   |

---

## 📝 Development Phases

- [x] **Phase 1**: Frontend Design (HTML, CSS, JS)
- [ ] **Phase 2**: Backend Setup & Flask Configuration
- [ ] **Phase 3**: Authentication & Role Management
- [ ] **Phase 4**: Database Design & Supabase Integration
- [ ] **Phase 5**: Timetable & Downtime Detection
- [ ] **Phase 6**: Activity Recommendation Engine
- [ ] **Phase 7**: Activity Execution & Tracking
- [ ] **Phase 8**: Notifications & Scheduling
- [ ] **Phase 9**: PDF Report Generation
- [ ] **Phase 10**: Final Integration & Debugging

---

## 📄 License

This project is developed for academic purposes.

---

## 🤝 Contributors

- Harshwardhan (Developer)

---

*Built with ❤️ using Flask and Bootstrap*
