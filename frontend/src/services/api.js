// API service for connecting to the Java backend
const API_BASE_URL = 'http://localhost:3030/interview-portal/api/experiences';

class ApiService {
  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response.json();
  }

  // Get all experiences
  async getAllExperiences() {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  }

  // Get experience by ID
  async getExperienceById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
  }

  // Get experiences by company
  async getExperiencesByCompany(company) {
    try {
      const response = await fetch(`${API_BASE_URL}/company/${encodeURIComponent(company)}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching experiences by company:', error);
      throw error;
    }
  }

  // Get experiences by year
  async getExperiencesByYear(year) {
    try {
      const response = await fetch(`${API_BASE_URL}/year/${year}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching experiences by year:', error);
      throw error;
    }
  }

  // Get experiences by status
  async getExperiencesByStatus(status) {
    try {
      const response = await fetch(`${API_BASE_URL}/status/${encodeURIComponent(status)}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching experiences by status:', error);
      throw error;
    }
  }

  // Get all companies
  async getAllCompanies() {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }

  // Get all years
  async getAllYears() {
    try {
      const response = await fetch(`${API_BASE_URL}/years`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching years:', error);
      throw error;
    }
  }

  // Create new experience
  async createExperience(experienceData) {
    try {
      const response = await fetch(`${API_BASE_URL}` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  }

  // Update experience
  async updateExperience(id, experienceData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  }

  // Delete experience
  async deleteExperience(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 