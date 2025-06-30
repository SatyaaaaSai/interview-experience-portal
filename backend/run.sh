#!/bin/bash

echo "========================================"
echo "Interview Experience Portal - Backend"
echo "========================================"
echo

echo "Checking prerequisites..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 11 or higher"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven 3.6 or higher"
    exit 1
fi

echo "Prerequisites check passed!"
echo

echo "Building the project..."
mvn clean package
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi

echo
echo "Build successful! Starting the application..."
echo
echo "The application will be available at:"
echo "- Backend API: http://localhost:8080/interview-portal/"
echo "- API Documentation: http://localhost:8080/interview-portal/api/experiences"
echo
echo "Press Ctrl+C to stop the server"
echo

mvn tomcat10:run 