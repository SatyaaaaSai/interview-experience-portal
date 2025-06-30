package com.interviewportal.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

// @WebServlet("/api/reviews/*")
public class ReviewServlet extends HttpServlet {
    
    // This servlet acts as an alias for ExperienceServlet to maintain API consistency
    // All requests are forwarded to ExperienceServlet
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Forward to ExperienceServlet
        request.getRequestDispatcher("/api/experiences" + (request.getPathInfo() != null ? request.getPathInfo() : "")).forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Forward to ExperienceServlet
        request.getRequestDispatcher("/api/experiences").forward(request, response);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Forward to ExperienceServlet
        request.getRequestDispatcher("/api/experiences" + (request.getPathInfo() != null ? request.getPathInfo() : "")).forward(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Forward to ExperienceServlet
        request.getRequestDispatcher("/api/experiences" + (request.getPathInfo() != null ? request.getPathInfo() : "")).forward(request, response);
    }
} 