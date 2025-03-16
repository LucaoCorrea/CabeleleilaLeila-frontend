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

        localStorage.setItem('access_token', response.data.access_token);

        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            user: response.data.user,
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

export const getAppointments = async (userId = null) => {
    try {
        const endpoint = userId ? `/appointments/user/${userId}` : '/appointments';
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            throw new Error("Você não tem permissão para acessar esses agendamentos.");
        } else {
            console.error('Error fetching appointments:', error);
            throw error;
        }
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