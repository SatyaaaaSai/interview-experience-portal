package com.interviewportal.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SimpleJDBCUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/interview_portal";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "satya";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
} 