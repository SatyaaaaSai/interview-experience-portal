# Use official Tomcat 10 image
FROM tomcat:10.1

# Remove default apps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WAR into Tomcat
COPY target/interview-portal.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

