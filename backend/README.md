# Interview Experience Portal - Backend

A Java-based backend for the Interview Experience Portal using JDBC (MySQL) + Servlet + JSP technology stack.

## 🚀 Technology Stack

- **Java 11**
- **Servlet 4.0**
- **JSP 2.3**
- **JDBC (MySQL 8.0)**
- **Maven 3.6+**
- **Apache Tomcat 9.0+**
- **Jackson (JSON processing)**
- **SLF4J + Logback (Logging)**

## 📋 Prerequisites

1. **Java 11 or higher**
2. **MySQL 8.0 or higher**
3. **Apache Tomcat 9.0 or higher**
4. **Maven 3.6 or higher**

## 🗄️ Database Setup

1. **Install MySQL** if not already installed
2. **Create a database user** (or use root with password)
3. **Update database configuration** in `src/main/java/com/interviewportal/util/DatabaseUtil.java`:

```java
private static final String URL = "jdbc:mysql://localhost:3306/interview_portal?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
private static final String USERNAME = "root";
private static final String PASSWORD = "your_password_here";
```

4. **Start MySQL service**

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/interviewportal/
│   │   │       ├── dao/
│   │   │       │   └── ExperienceDAO.java
│   │   │       ├── filter/
│   │   │       │   └── CORSFilter.java
│   │   │       ├── model/
│   │   │       │   └── Experience.java
│   │   │       ├── servlet/
│   │   │       │   ├── ExperienceServlet.java
│   │   │       │   └── ReviewServlet.java
│   │   │       └── util/
│   │   │           └── DatabaseUtil.java
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   └── web.xml
│   │       ├── error/
│   │       │   ├── 404.jsp
│   │       │   └── 500.jsp
│   │       └── index.jsp
│   └── test/
├── pom.xml
└── README.md
```

## 🚀 Building and Running

### Option 1: Using Maven and Tomcat

1. **Build the project:**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Deploy to Tomcat:**
   - Copy `target/interview-portal.war` to `$TOMCAT_HOME/webapps/`
   - Start Tomcat: `$TOMCAT_HOME/bin/startup.sh` (Linux/Mac) or `$TOMCAT_HOME/bin/startup.bat` (Windows)

3. **Access the application:**
   - Backend API: `http://localhost:8080/interview-portal/`
   - API Documentation: `http://localhost:8080/interview-portal/api/experiences`

### Option 2: Using Maven Tomcat Plugin

1. **Run directly with embedded Tomcat:**
   ```bash
   cd backend
   mvn tomcat7:run
   ```

2. **Access the application:**
   - Backend API: `http://localhost:8080/interview-portal/`

## 📡 API Endpoints

### Experience Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experiences` | Get all experiences |
| GET | `/api/experiences/{id}` | Get experience by ID |
| GET | `/api/experiences/company/{company}` | Get experiences by company |
| GET | `/api/experiences/year/{year}` | Get experiences by year |
| GET | `/api/experiences/status/{status}` | Get experiences by status |
| GET | `/api/experiences/companies` | Get all companies |
| GET | `/api/experiences/years` | Get all years |
| POST | `/api/experiences` | Create new experience |
| PUT | `/api/experiences/{id}` | Update experience |
| DELETE | `/api/experiences/{id}` | Delete experience |

### Alternative Endpoints

All endpoints are also available under `/api/reviews/*` for consistency.

## 📝 Request/Response Examples

### Create Experience (POST)

**Request:**
```json
{
  "name": "John Doe",
  "anonymous": false,
  "year": 2025,
  "company": "Google",
  "role": "Software Engineer",
  "technicalRounds": 3,
  "hrRounds": 1,
  "technicalQuestions": "DSA questions, system design, coding challenges",
  "hrQuestions": "Tell me about yourself, why this company?",
  "status": "Accepted"
}
```

**Response:**
```json
{
  "id": 1,
  "message": "Experience created successfully"
}
```

### Get All Experiences (GET)

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "anonymous": false,
    "year": 2025,
    "company": "Google",
    "role": "Software Engineer",
    "technicalRounds": 3,
    "hrRounds": 1,
    "technicalQuestions": "DSA questions, system design, coding challenges",
    "hrQuestions": "Tell me about yourself, why this company?",
    "status": "Accepted",
    "createdAt": "2025-01-15T10:30:00",
    "updatedAt": "2025-01-15T10:30:00"
  }
]
```

## 🔧 Configuration

### Database Configuration

Update the database connection details in `DatabaseUtil.java`:

```java
private static final String URL = "jdbc:mysql://localhost:3306/interview_portal?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
private static final String USERNAME = "your_username";
private static final String PASSWORD = "your_password";
```

### CORS Configuration

The application includes a CORS filter that allows cross-origin requests. You can modify the CORS settings in `CORSFilter.java` if needed.

## 🗃️ Database Schema

The application automatically creates the following table:

```sql
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    anonymous BOOLEAN DEFAULT FALSE,
    year INT NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(500) NOT NULL,
    technical_rounds INT DEFAULT 0,
    hr_rounds INT DEFAULT 0,
    technical_questions TEXT,
    hr_questions TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_company (company),
    INDEX idx_year (year),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

## 🔗 Frontend Integration

To connect your React frontend to this backend:

1. **Update API base URL** in your frontend to point to the backend:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/interview-portal/api';
   ```

2. **Update your frontend API calls** to use the new endpoints:
   ```javascript
   // Get all experiences
   fetch(`${API_BASE_URL}/experiences`)
   
   // Create new experience
   fetch(`${API_BASE_URL}/experiences`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(experienceData)
   })
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Verify MySQL is running
   - Check database credentials in `DatabaseUtil.java`
   - Ensure database `interview_portal` exists

2. **Port Already in Use:**
   - Change Tomcat port in `server.xml`
   - Or stop other services using port 8080

3. **CORS Issues:**
   - Verify CORS filter is properly configured
   - Check browser console for CORS errors

### Logs

Check Tomcat logs in `$TOMCAT_HOME/logs/` for detailed error information.

## 📄 License

This project is part of the Interview Experience Portal application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request 