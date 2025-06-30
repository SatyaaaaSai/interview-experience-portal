<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Experience Portal - Backend</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 1.1em;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .api-section {
            margin-bottom: 40px;
        }
        .api-section h2 {
            color: #4facfe;
            border-bottom: 2px solid #4facfe;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .endpoint {
            background: #f8f9fa;
            border-left: 4px solid #4facfe;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }
        .method {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 0.9em;
            margin-right: 10px;
        }
        .get { background: #28a745; color: white; }
        .post { background: #007bff; color: white; }
        .put { background: #ffc107; color: black; }
        .delete { background: #dc3545; color: white; }
        .url {
            font-family: 'Courier New', monospace;
            background: #e9ecef;
            padding: 5px 10px;
            border-radius: 3px;
            color: #495057;
        }
        .description {
            margin-top: 10px;
            color: #6c757d;
        }
        .status {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .database-info {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }
        .tech-badge {
            background: #4facfe;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Interview Experience Portal</h1>
            <p>Backend API Server</p>
            <div class="tech-stack">
                <span class="tech-badge">Java 11</span>
                <span class="tech-badge">Servlet</span>
                <span class="tech-badge">JSP</span>
                <span class="tech-badge">JDBC</span>
                <span class="tech-badge">MySQL</span>
                <span class="tech-badge">Maven</span>
            </div>
        </div>
        
        <div class="content">
            <div class="status">
                <strong>✅ Server Status:</strong> Running successfully on port 8080
            </div>
            
            <div class="database-info">
                <strong>🗄️ Database:</strong> MySQL connection established and tables initialized
            </div>
            
            <div class="api-section">
                <h2>📡 Available API Endpoints</h2>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences</span>
                    <div class="description">Retrieve all interview experiences</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/{id}</span>
                    <div class="description">Retrieve a specific experience by ID</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/company/{company}</span>
                    <div class="description">Retrieve experiences by company name</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/year/{year}</span>
                    <div class="description">Retrieve experiences by year</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/status/{status}</span>
                    <div class="description">Retrieve experiences by status (Accepted/Rejected/Pending)</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/companies</span>
                    <div class="description">Retrieve list of all companies</div>
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <span class="url">/api/experiences/years</span>
                    <div class="description">Retrieve list of all years</div>
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <span class="url">/api/experiences</span>
                    <div class="description">Create a new interview experience</div>
                </div>
                
                <div class="endpoint">
                    <span class="method put">PUT</span>
                    <span class="url">/api/experiences/{id}</span>
                    <div class="description">Update an existing experience</div>
                </div>
                
                <div class="endpoint">
                    <span class="method delete">DELETE</span>
                    <span class="url">/api/experiences/{id}</span>
                    <div class="description">Delete an experience</div>
                </div>
            </div>
            
            <div class="api-section">
                <h2>🔄 Alternative Endpoints</h2>
                <p>All endpoints are also available under <code>/api/reviews/*</code> for consistency with frontend naming.</p>
            </div>
            
            <div class="api-section">
                <h2>📝 Sample Request Body (POST/PUT)</h2>
                <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
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
}</pre>
            </div>
            
            <div class="api-section">
                <h2>🔧 Configuration</h2>
                <p><strong>Database:</strong> MySQL running on localhost:3306</p>
                <p><strong>Database Name:</strong> interview_portal</p>
                <p><strong>Username:</strong> root</p>
                <p><strong>Password:</strong> password (update in DatabaseUtil.java)</p>
                <p><strong>Server Port:</strong> 8080</p>
            </div>
        </div>
    </div>
</body>
</html> 