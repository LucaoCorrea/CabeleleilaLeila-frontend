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

// Função para login
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log("Resposta da API no login:", response.data);

        // Salva o token no localStorage
        localStorage.setItem('access_token', response.data.access_token);

        // Retorna os tokens e o usuário (se necessário)
        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            user: response.data.user, // Se o backend retornar informações do usuário
        };
    } catch (error) {
        if (error.response) {
            console.error('Erro no login:', error.response.data);
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

// Função para registro
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

// Função para buscar agendamentos
export const getAppointments = async (userId = null) => {
    try {
        const endpoint = userId ? `/appointments/user/${userId}` : '/appointments';
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

// Função para criar um agendamento
// Função para criar um agendamento
export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

// Função para atualizar um agendamento
export const updateAppointment = async (id, appointmentData) => {
    try {
        const response = await api.put(`/appointments/${id}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

// Função para deletar um agendamento
export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

// Função para buscar um agendamento por ID
export const getAppointmentById = async (id) => {
    try {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error;
    }
};