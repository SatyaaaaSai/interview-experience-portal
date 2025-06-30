@echo off
echo ========================================
echo Interview Experience Portal - Backend
echo ========================================
echo.

echo Checking prerequisites...
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 11 or higher
    pause
    exit /b 1
)

REM Try to find Maven in common locations
set MAVEN_CMD=mvn
where mvn >nul 2>&1
if errorlevel 1 (
    REM Try common Maven installation paths
    if exist "D:\Downloads\apache-maven-3.9.10\bin\mvn.cmd" (
        set MAVEN_CMD=D:\Downloads\apache-maven-3.9.10\bin\mvn.cmd
    ) else if exist "C:\Program Files\Apache\maven\bin\mvn.cmd" (
        set MAVEN_CMD=C:\Program Files\Apache\maven\bin\mvn.cmd
    ) else if exist "%USERPROFILE%\Downloads\apache-maven-3.9.10\bin\mvn.cmd" (
        set MAVEN_CMD=%USERPROFILE%\Downloads\apache-maven-3.9.10\bin\mvn.cmd
    ) else (
        echo ERROR: Maven is not installed or not in PATH
        echo Please install Maven 3.6 or higher
        echo Or add Maven to your PATH environment variable
        pause
        exit /b 1
    )
)

echo Prerequisites check passed!
echo Using Maven: %MAVEN_CMD%
echo.

echo Building the project...
call %MAVEN_CMD% clean package
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo Build successful! Deploying to Tomcat...
echo.

REM Set Tomcat paths
set TOMCAT_HOME=C:\Program Files\Apache Software Foundation\Tomcat 10.1
set CATALINA_HOME=%TOMCAT_HOME%
set WAR_FILE=target\interview-portal.war
set WEBAPPS_DIR=%TOMCAT_HOME%\webapps

REM Check if Tomcat is running and stop it
echo Stopping Tomcat if running...
call "%TOMCAT_HOME%\bin\shutdown.bat" >nul 2>&1
timeout /t 3 /nobreak >nul

REM Copy WAR file to webapps
echo Copying WAR file to Tomcat webapps...
copy "%WAR_FILE%" "%WEBAPPS_DIR%\" >nul
if errorlevel 1 (
    echo ERROR: Failed to copy WAR file to Tomcat
    pause
    exit /b 1
)

REM Start Tomcat
echo Starting Tomcat...
start "" "%TOMCAT_HOME%\bin\startup.bat"

echo.
echo Deployment successful!
echo The application will be available at:
echo - Backend API: http://localhost:3030/interview-portal/
echo - API Documentation: http://localhost:3030/interview-portal/api/experiences
echo.
echo Tomcat is starting up. Please wait a few moments...
echo.
echo To stop Tomcat, run: "%TOMCAT_HOME%\bin\shutdown.bat"
echo.

pause 