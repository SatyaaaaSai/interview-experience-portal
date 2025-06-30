# Interview Experience Portal - Complete Setup Guide

This guide will help you set up the complete Interview Experience Portal with React frontend and Java backend.

## 🏗️ Project Structure

```
interview-experience-portal/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js          # API service for backend communication
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                     # Java backend
│   ├── src/main/java/com/interviewportal/
│   │   ├── dao/
│   │   │   └── ExperienceDAO.java
│   │   ├── filter/
│   │   │   └── CORSFilter.java
│   │   ├── model/
│   │   │   └── Experience.java
│   │   ├── servlet/
│   │   │   ├── ExperienceServlet.java
│   │   │   └── ReviewServlet.java
│   │   └── util/
│   │       └── DatabaseUtil.java
│   ├── src/main/webapp/
│   │   ├── WEB-INF/
│   │   │   └── web.xml
│   │   ├── error/
│   │   │   ├── 404.jsp
│   │   │   └── 500.jsp
│   │   └── index.jsp
│   ├── pom.xml
│   ├── run.bat                 # Windows run script
│   ├── run.sh                  # Linux/Mac run script
│   └── README.md
└── SETUP_GUIDE.md
```

## 📋 Prerequisites

### For Backend (Java)
1. **Java 11 or higher**
2. **MySQL 8.0 or higher**
3. **Maven 3.6 or higher**
4. **Apache Tomcat 9.0 or higher** (optional, can use embedded Tomcat)

### For Frontend (React)
1. **Node.js 16 or higher**
2. **npm or yarn**

## 🗄️ Database Setup

### 1. Install MySQL
- Download and install MySQL 8.0+ from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- During installation, set a root password (remember this!)

### 2. Configure Database Connection
Edit `backend/src/main/java/com/interviewportal/util/DatabaseUtil.java`:

```java
private static final String URL = "jdbc:mysql://localhost:3306/interview_portal?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
private static final String USERNAME = "root";
private static final String PASSWORD = "your_mysql_password_here"; // Change this!
```

### 3. Start MySQL Service
- **Windows**: MySQL service should start automatically
- **Linux/Mac**: `sudo systemctl start mysql` or `sudo service mysql start`

## 🚀 Backend Setup

### Option 1: Using Run Scripts (Recommended)

**Windows:**
```bash
cd backend
run.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x run.sh
./run.sh
```

### Option 2: Manual Setup

1. **Build the project:**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Run with embedded Tomcat:**
   ```bash
   mvn tomcat7:run
   ```

3. **Or deploy to external Tomcat:**
   - Copy `target/interview-portal.war` to `$TOMCAT_HOME/webapps/`
   - Start Tomcat: `$TOMCAT_HOME/bin/startup.sh` (Linux/Mac) or `$TOMCAT_HOME/bin/startup.bat` (Windows)

### 3. Verify Backend
- Backend API: `http://localhost:8080/interview-portal/`
- API Documentation: `http://localhost:8080/interview-portal/api/experiences`

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend  # or just stay in the root directory
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Verify Frontend
- Frontend: `http://localhost:5173/` (or the port shown in terminal)

## 🔗 Connecting Frontend to Backend

The frontend is already configured to connect to the backend. The API service (`src/services/api.js`) is set to:

```javascript
const API_BASE_URL = 'http://localhost:8080/interview-portal/api';
```

If you change the backend port or context path, update this URL accordingly.

## 📡 API Endpoints

### Experience Management
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/{id}` - Get experience by ID
- `GET /api/experiences/company/{company}` - Get experiences by company
- `GET /api/experiences/year/{year}` - Get experiences by year
- `GET /api/experiences/status/{status}` - Get experiences by status
- `GET /api/experiences/companies` - Get all companies
- `GET /api/experiences/years` - Get all years
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/{id}` - Update experience
- `DELETE /api/experiences/{id}` - Delete experience

### Alternative Endpoints
All endpoints are also available under `/api/reviews/*` for consistency.

## 🧪 Testing the Application

### 1. Start Both Services
```bash
# Terminal 1 - Backend
cd backend
./run.sh  # or run.bat on Windows

# Terminal 2 - Frontend
npm run dev
```

### 2. Test Features
1. **View Experiences**: Go to `http://localhost:5173/view`
2. **Write Review**: Go to `http://localhost:5173/write`
3. **Submit a review** and verify it appears in the list
4. **Click on an experience** to view details
5. **Use filters** to search by company, year, etc.

## 🐛 Troubleshooting

### Backend Issues

1. **Database Connection Error:**
   ```
   Error: Failed to establish database connection
   ```
   - Verify MySQL is running
   - Check credentials in `DatabaseUtil.java`
   - Ensure database `interview_portal` exists (created automatically)

2. **Port Already in Use:**
   ```
   Error: Port 8080 is already in use
   ```
   - Change Tomcat port in `server.xml`
   - Or stop other services using port 8080

3. **Build Errors:**
   ```bash
   mvn clean package
   ```
   - Ensure Java 11+ is installed
   - Ensure Maven 3.6+ is installed

### Frontend Issues

1. **CORS Errors:**
   ```
   Access to fetch at 'http://localhost:8080' from origin 'http://localhost:5173' has been blocked by CORS policy
   ```
   - Verify backend is running
   - Check CORS filter configuration

2. **API Connection Errors:**
   ```
   Failed to fetch
   ```
   - Verify backend URL in `api.js`
   - Ensure backend is running on correct port

### Database Issues

1. **MySQL Connection:**
   ```bash
   mysql -u root -p
   ```
   - Test connection manually
   - Verify database exists: `SHOW DATABASES;`

2. **Table Issues:**
   ```sql
   USE interview_portal;
   SHOW TABLES;
   SELECT * FROM experiences;
   ```

## 🔧 Configuration Options

### Backend Configuration

1. **Database Settings** (`DatabaseUtil.java`):
   - URL, username, password
   - Connection pool settings

2. **Server Settings** (`web.xml`):
   - Servlet mappings
   - Error pages
   - CORS filter

3. **Logging** (`logback.xml`):
   - Log levels
   - Output format

### Frontend Configuration

1. **API Base URL** (`src/services/api.js`):
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/interview-portal/api';
   ```

2. **Environment Variables** (`.env`):
   ```env
   VITE_API_BASE_URL=http://localhost:8080/interview-portal/api
   ```

## 📊 Sample Data

The backend automatically creates sample data when first run:

- Airbus - Software Test Engineer Intern
- Quince - SDE 2
- TCS - Java Developer
- Infosys - System Engineer

## 🚀 Production Deployment

### Backend Production
1. Build WAR file: `mvn clean package`
2. Deploy to production Tomcat
3. Configure production database
4. Set up reverse proxy (nginx/Apache)

### Frontend Production
1. Build: `npm run build`
2. Deploy to web server (nginx/Apache)
3. Configure API base URL for production

## 📝 Development Workflow

1. **Backend Changes:**
   - Edit Java files
   - Restart backend server
   - Test API endpoints

2. **Frontend Changes:**
   - Edit React components
   - Hot reload automatically
   - Test in browser

3. **Database Changes:**
   - Modify `DatabaseUtil.java`
   - Restart backend
   - Data migration if needed

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review logs in `$TOMCAT_HOME/logs/`
3. Verify all prerequisites are met
4. Check network connectivity between frontend and backend

---

**Happy Coding! 🎉** 