import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const inferredHost = isBrowser ? window.location.hostname : 'localhost';
const rawBaseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || `http://${inferredHost}:5000`;
const normalizedBaseUrl = rawBaseUrl.endsWith('/api')
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

const API = axios.create({
    baseURL: normalizedBaseUrl,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

API.interceptors.response.use(
    (res) => res,
    async (error) => {
        const config = error?.config;
        const hasResponse = Boolean(error?.response);
        if (!config || hasResponse || config.__triedAltBaseUrl) {
            return Promise.reject(error);
        }

        try {
            const base = config.baseURL || normalizedBaseUrl;
            const url = new URL(base);
            const isLocal =
                url.hostname === 'localhost' ||
                url.hostname === '127.0.0.1' ||
                url.hostname === inferredHost;

            const port = url.port ? Number(url.port) : null;
            const altPort = port === 5000 ? 5001 : port === 5001 ? 5000 : null;
            if (!isLocal || !altPort) {
                return Promise.reject(error);
            }

            url.port = String(altPort);
            config.__triedAltBaseUrl = true;
            config.baseURL = url.toString().replace(/\/$/, '');
            return API.request(config);
        } catch {
            return Promise.reject(error);
        }
    }
);

// Auth
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Public Data
export const fetchProjects = () => API.get('/admin/projects');
export const fetchExperience = () => API.get('/admin/experience');
export const fetchEducation = () => API.get('/admin/education');
export const fetchSkills = () => API.get('/admin/skills');
export const fetchBlogs = () => API.get('/admin/blogs');
export const fetchBio = () => API.get('/admin/bio');

// Admin Data
export const createProject = (data) => API.post('/admin/projects', data);
export const updateProject = (id, data) => API.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/admin/projects/${id}`);

export const createExperience = (data) => API.post('/admin/experience', data);
export const updateExperience = (id, data) => API.put(`/admin/experience/${id}`, data);
export const deleteExperience = (id) => API.delete(`/admin/experience/${id}`);

export const createEducation = (data) => API.post('/admin/education', data);
export const updateEducation = (id, data) => API.put(`/admin/education/${id}`, data);
export const deleteEducation = (id) => API.delete(`/admin/education/${id}`);

export const createSkill = (data) => API.post('/admin/skills', data);
export const updateSkill = (id, data) => API.put(`/admin/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/admin/skills/${id}`);

export const createBlog = (data) => API.post('/admin/blogs', data);
export const updateBlog = (id, data) => API.put(`/admin/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/admin/blogs/${id}`);

export const updateBio = (data) => API.post('/admin/bio', data);

export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);

export const fetchContacts = () => API.get('/admin/contacts');
export const updateContact = (id, data) => API.put(`/admin/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/admin/contacts/${id}`);
export const submitContact = (data) => API.post('/contact', data);

export const fetchTeamMembers = () => API.get('/team');

// User -> Admin messages (reply to broadcasts)
export const sendUserMessageToAdmin = (data) => API.post('/messages/user', data);
export const fetchAdminInboxMessages = () => API.get('/messages/admin');
export const markAdminInboxMessageSeen = (id) => API.put(`/messages/admin/${id}`);

// Broadcasts (Admin -> User)
export const fetchBroadcasts = () => API.get('/admin/broadcasts');
export const createBroadcast = (data) => API.post('/admin/broadcasts', data);

// Users & Tasks
export const fetchUsers = () => API.get('/admin/users');
export const fetchTasks = () => API.get('/admin/tasks');
export const createTask = (data) => API.post('/admin/tasks', data);
export const updateTask = (id, data) => API.put(`/admin/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/admin/tasks/${id}`);
