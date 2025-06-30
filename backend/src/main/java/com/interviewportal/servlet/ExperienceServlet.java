package com.interviewportal.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.interviewportal.model.Experience;
import com.interviewportal.util.SimpleJDBCUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

// @WebServlet("/api/experiences/*")
public class ExperienceServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(ExperienceServlet.class);
    private final ObjectMapper objectMapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String pathInfo = request.getPathInfo();
        System.out.println("[DEBUG] Entered doGet in ExperienceServlet");
        if (pathInfo != null && pathInfo.matches("/\\d+")) {
            // Fetch individual experience by ID
            try (var conn = SimpleJDBCUtil.getConnection();
                 var stmt = conn.prepareStatement("SELECT * FROM experiences WHERE id = ?")) {
                int id = Integer.parseInt(pathInfo.substring(1));
                stmt.setInt(1, id);
                try (var rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        Experience exp = new Experience();
                        exp.setId(rs.getInt("id"));
                        exp.setName(rs.getString("name"));
                        exp.setAnonymous(rs.getBoolean("anonymous"));
                        exp.setYear(rs.getInt("year"));
                        exp.setCompany(rs.getString("company"));
                        exp.setRole(rs.getString("role"));
                        exp.setTechnicalRounds(rs.getInt("technical_rounds"));
                        exp.setHrRounds(rs.getInt("hr_rounds"));
                        exp.setTechnicalQuestions(rs.getString("technical_questions"));
                        exp.setHrQuestions(rs.getString("hr_questions"));
                        exp.setStatus(rs.getString("status"));
                        // createdAt and updatedAt can be handled as strings or converted if needed
                        String jsonResponse = objectMapper.writeValueAsString(exp);
                        out.print(jsonResponse);
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\": \"Experience not found\"}");
                    }
                }
            } catch (Exception e) {
                System.out.println("[ERROR] Exception in doGet (by id): " + e.getMessage());
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"error\": \"Internal server error\"}");
                logger.error("Error processing GET request (by id)", e);
            }
        } else {
            // Return all experiences (existing code)
            try (var conn = SimpleJDBCUtil.getConnection();
                 var stmt = conn.createStatement();
                 var rs = stmt.executeQuery("SELECT * FROM experiences")) {
                System.out.println("[DEBUG] Database connection established and query executed");
                var experiences = new java.util.ArrayList<Experience>();
                while (rs.next()) {
                    Experience exp = new Experience();
                    exp.setId(rs.getInt("id"));
                    exp.setName(rs.getString("name"));
                    exp.setAnonymous(rs.getBoolean("anonymous"));
                    exp.setYear(rs.getInt("year"));
                    exp.setCompany(rs.getString("company"));
                    exp.setRole(rs.getString("role"));
                    exp.setTechnicalRounds(rs.getInt("technical_rounds"));
                    exp.setHrRounds(rs.getInt("hr_rounds"));
                    exp.setTechnicalQuestions(rs.getString("technical_questions"));
                    exp.setHrQuestions(rs.getString("hr_questions"));
                    exp.setStatus(rs.getString("status"));
                    // createdAt and updatedAt can be handled as strings or converted if needed
                    experiences.add(exp);
                }
                System.out.println("[DEBUG] Experiences fetched: " + experiences.size());
                String jsonResponse = objectMapper.writeValueAsString(experiences);
                out.print(jsonResponse);
            } catch (Exception e) {
                System.out.println("[ERROR] Exception in doGet: " + e.getMessage());
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"error\": \"Internal server error\"}");
                logger.error("Error processing GET request", e);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try {
            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String jsonBody = sb.toString();
            Experience experience = objectMapper.readValue(jsonBody, Experience.class);
            try (var conn = SimpleJDBCUtil.getConnection();
                 var stmt = conn.prepareStatement(
                    "INSERT INTO experiences (name, anonymous, year, company, role, technical_rounds, hr_rounds, technical_questions, hr_questions, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    java.sql.Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, experience.getName());
                stmt.setBoolean(2, experience.isAnonymous());
                stmt.setInt(3, experience.getYear());
                stmt.setString(4, experience.getCompany());
                stmt.setString(5, experience.getRole());
                stmt.setInt(6, experience.getTechnicalRounds());
                stmt.setInt(7, experience.getHrRounds());
                stmt.setString(8, experience.getTechnicalQuestions());
                stmt.setString(9, experience.getHrQuestions());
                stmt.setString(10, experience.getStatus());
                int affectedRows = stmt.executeUpdate();
                if (affectedRows == 0) {
                    throw new SQLException("Creating experience failed, no rows affected.");
                }
                try (var generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int id = generatedKeys.getInt(1);
                        response.setStatus(HttpServletResponse.SC_CREATED);
                        out.print("{\"id\": " + id + ", \"message\": \"Experience created successfully\"}");
                    } else {
                        throw new SQLException("Creating experience failed, no ID obtained.");
                    }
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid request data\"}");
            logger.error("Error creating experience", e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        if (pathInfo == null || !pathInfo.matches("/\\d+")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid ID\"}");
            return;
        }
        try {
            int id = Integer.parseInt(pathInfo.substring(1));
            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String jsonBody = sb.toString();
            Experience experience = objectMapper.readValue(jsonBody, Experience.class);
            experience.setId(id);
            try (var conn = SimpleJDBCUtil.getConnection();
                 var stmt = conn.prepareStatement(
                    "UPDATE experiences SET name=?, anonymous=?, year=?, company=?, role=?, technical_rounds=?, hr_rounds=?, technical_questions=?, hr_questions=?, status=? WHERE id=?")) {
                stmt.setString(1, experience.getName());
                stmt.setBoolean(2, experience.isAnonymous());
                stmt.setInt(3, experience.getYear());
                stmt.setString(4, experience.getCompany());
                stmt.setString(5, experience.getRole());
                stmt.setInt(6, experience.getTechnicalRounds());
                stmt.setInt(7, experience.getHrRounds());
                stmt.setString(8, experience.getTechnicalQuestions());
                stmt.setString(9, experience.getHrQuestions());
                stmt.setString(10, experience.getStatus());
                stmt.setInt(11, experience.getId());
                int affectedRows = stmt.executeUpdate();
                if (affectedRows > 0) {
                    out.print("{\"message\": \"Experience updated successfully\"}");
                    logger.info("Updated experience with ID: {}", id);
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print("{\"error\": \"Experience not found\"}");
                    logger.warn("Experience not found for update with ID: {}", id);
                }
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid ID format\"}");
            logger.error("Invalid ID format in update request", e);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid request data\"}");
            logger.error("Error updating experience", e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        if (pathInfo == null || !pathInfo.matches("/\\d+")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid ID\"}");
            return;
        }
        try {
            int id = Integer.parseInt(pathInfo.substring(1));
            try (var conn = SimpleJDBCUtil.getConnection();
                 var stmt = conn.prepareStatement("DELETE FROM experiences WHERE id=?")) {
                stmt.setInt(1, id);
                int affectedRows = stmt.executeUpdate();
                if (affectedRows > 0) {
                    out.print("{\"message\": \"Experience deleted successfully\"}");
                    logger.info("Deleted experience with ID: {}", id);
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print("{\"error\": \"Experience not found\"}");
                    logger.warn("Experience not found for deletion with ID: {}", id);
                }
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid ID format\"}");
            logger.error("Invalid ID format in delete request", e);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Internal server error\"}");
            logger.error("Error deleting experience", e);
        }
    }
} 