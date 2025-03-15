import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log("Resposta da API no login:", response.data);

        // Retorna os tokens e o usuário (se necessário)
        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            user: response.data.user, // Se o backend retornar informações do usuário
        };
    } catch (error) {
        if (error.response) {
            console.error('Erro no login:', error.response.data);
            console.error('Status do erro:', error.response.status);
            console.error('Cabeçalhos do erro:', error.response.headers);
            throw new Error(error.response.data.message || 'Erro ao fazer login. Tente novamente.');
        } else if (error.request) {
            console.error('Erro de rede:', error.request);
            throw new Error('Erro de conexão. Verifique sua conexão com a internet e tente novamente.');
        } else {
            console.error('Erro na configuração da requisição:', error.message);
            throw new Error('Erro ao configurar a requisição. Tente novamente mais tarde.');
        }
    }
};

export const register = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post('/auth/register', {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
            role: "CLIENT",
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
