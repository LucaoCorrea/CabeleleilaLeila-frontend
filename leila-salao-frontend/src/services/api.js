import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post('/auth/register', {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
            role: "MANAGER",
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getAppointments = async () => {
    try {
        const response = await api.get('/appointments');
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

export const updateAppointment = async (id, appointmentData) => {
    try {
        const response = await api.put(`/appointments/${id}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

export const getAppointmentById = async (id) => {
    try {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error;
    }
};