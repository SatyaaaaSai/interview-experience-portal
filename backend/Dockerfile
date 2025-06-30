# Use official Tomcat image
FROM tomcat:9.0

# Clean default apps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WAR file into Tomcat
COPY target/interview-portal.war /usr/local/tomcat/webapps/ROOT.war

# Optional: expose your custom port
EXPOSE 3030

