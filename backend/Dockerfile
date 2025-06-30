# Use official Tomcat image
FROM tomcat:9.0

# Clean default apps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your WAR file into Tomcat
COPY backend/target/interview-portal.war /usr/local/tomcat/webapps/ROOT.war
