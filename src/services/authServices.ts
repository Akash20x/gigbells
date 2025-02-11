import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { handleAxiosError } from '../misc';

const BASE_API = `${import.meta.env.PORTAL_BACKEND_API_URL}/api/auth`

export const signUp = createAsyncThunk(
    "user/signUp",
    async (details : {name: string, email: string, password: string, userName: string}, { rejectWithValue }) => {

        const {name, email, password, userName} = details
      
        try {
        const response = await axios.post(`${BASE_API}/register`, {
            name,
            email,
            password,
            userName
        });

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
      }
    }
)


export const signIn = createAsyncThunk(
    "user/signIn",
    async (details:  { email: string; password: string }, { rejectWithValue }) => {

        const {email, password} = details
      
        try {
        const response = await axios.post(`${BASE_API}/login`, {
            email,
            password,
        });

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);

      }
    }
)


export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const response = await axios.get(`${BASE_API}/profile`, config);

      return response.data;
    } catch (error) {
      const handledError = handleAxiosError(error);
      return rejectWithValue(handledError);

    }
  },
);
