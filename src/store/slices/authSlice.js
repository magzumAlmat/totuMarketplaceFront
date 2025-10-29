// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Базовый URL из .env
const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'https://totu.kz/api/store';
console.log('API_BASE:', API_BASE); // Для дебага

// Путь к логину (относительно API_BASE)
const LOGIN_ENDPOINT = '/auth/login'; // <-- Это даст https://totu.kz/api/store/auth/login
console.log('LOGIN_ENDPOINT:', LOGIN_ENDPOINT);

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const url = `${API_BASE}${LOGIN_ENDPOINT}`;
      console.log('Полный URL для логина:', url); // Проверьте в консоли

      const response = await axios.post(url, { username, password });

      const { token, user } = response.data;

      if (!token || !user?.id || !user?.username) {
        throw new Error('Некорректный ответ сервера');
      }

      const userData = { id: user.id, username: user.username };
      dispatch(setAuth({ token, user: userData }));

      return response.data;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Ошибка входа';
      console.error('Ошибка логина:', {
        message: msg,
        status: err.response?.status,
        details: err.response?.data,
      });
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

// Остальной код без изменений...
const initialState = {
  isAuth: false,
  currentUser: null,
  authToken: null,
  error: null,
  uploadProgress: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      const { token, user } = payload;
      if (typeof window !== 'undefined') localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      state.authToken = token;
      state.currentUser = user;
      state.isAuth = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUploadProgress: (state, { payload }) => {
      state.uploadProgress = payload;
    },
    clearUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
    logout: (state) => {
      if (typeof window !== 'undefined') localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      state.authToken = null;
      state.currentUser = null;
      state.isAuth = false;
      state.error = null;
    },
  },
});

export const { setAuth, setError, clearError, setUploadProgress, clearUploadProgress, logout } = authSlice.actions;

export const checkAuth = () => async (dispatch) => {
  if (typeof window === 'undefined') return;
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
    return;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) throw new Error('expired');
    const user = { id: decoded.id, username: decoded.username };
    dispatch(setAuth({ token, user }));
  } catch {
    localStorage.removeItem('token');
    dispatch(logout());
  }
};

export const logoutAction = () => (dispatch) => dispatch(logout());

export default authSlice.reducer;