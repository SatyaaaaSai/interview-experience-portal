package com.interviewportal.model;

import java.time.LocalDateTime;

public class Experience {
    private int id;
    private String name;
    private boolean anonymous;
    private int year;
    private String company;
    private String role;
    private int technicalRounds;
    private int hrRounds;
    private String technicalQuestions;
    private String hrQuestions;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public Experience() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Constructor with all fields
    public Experience(int id, String name, boolean anonymous, int year, String company, 
                     String role, int technicalRounds, int hrRounds, String technicalQuestions, 
                     String hrQuestions, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.anonymous = anonymous;
        this.year = year;
        this.company = company;
        this.role = role;
        this.technicalRounds = technicalRounds;
        this.hrRounds = hrRounds;
        this.technicalQuestions = technicalQuestions;
        this.hrQuestions = hrQuestions;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAnonymous() {
        return anonymous;
    }

    public void setAnonymous(boolean anonymous) {
        this.anonymous = anonymous;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getTechnicalRounds() {
        return technicalRounds;
    }

    public void setTechnicalRounds(int technicalRounds) {
        this.technicalRounds = technicalRounds;
    }

    public int getHrRounds() {
        return hrRounds;
    }

    public void setHrRounds(int hrRounds) {
        this.hrRounds = hrRounds;
    }

    public String getTechnicalQuestions() {
        return technicalQuestions;
    }

    public void setTechnicalQuestions(String technicalQuestions) {
        this.technicalQuestions = technicalQuestions;
    }

    public String getHrQuestions() {
        return hrQuestions;
    }

    public void setHrQuestions(String hrQuestions) {
        this.hrQuestions = hrQuestions;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Experience{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", anonymous=" + anonymous +
                ", year=" + year +
                ", company='" + company + '\'' +
                ", role='" + role + '\'' +
                ", technicalRounds=" + technicalRounds +
                ", hrRounds=" + hrRounds +
                ", technicalQuestions='" + technicalQuestions + '\'' +
                ", hrQuestions='" + hrQuestions + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
} 