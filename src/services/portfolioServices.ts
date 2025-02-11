import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { Card } from '../misc/types';
import { handleAxiosError } from '../misc';

const BASE_API = `${import.meta.env.PORTAL_BACKEND_API_URL}/api`


export const createCollection = createAsyncThunk(
    "portfolio/createCollection",
    async ({ name }: { name: string }, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/add-collection`, {name},config);

        return response.data
      
      
      } catch (error) {
          const handledError = handleAxiosError(error);
          return rejectWithValue(handledError);

      }
    }
)


export const deleteCollection = createAsyncThunk(
    "portfolio/deleteCollection",
    async (collectionId: string, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/delete-collection?collectionId=${collectionId}`, null,config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
          return rejectWithValue(handledError);
      }
    }
)

export const editCollection = createAsyncThunk(
    "portfolio/editCollection",
    async ({name, collectionId}: {name: string, collectionId: string}, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/edit-collection?collectionId=${collectionId}`, {name},config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
          return rejectWithValue(handledError);
      }
    }
)





export const createCard = createAsyncThunk(
    "portfolio/createCard",
    async ({card, collectionId}: {card: Card, collectionId: string}, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/add-card?collectionId=${collectionId}`, {
            card
        },config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
      }
    }
)

export const deleteCard = createAsyncThunk(
    "portfolio/deleteCard",
    async ({cardId, collectionId}: {cardId: string, collectionId: string}, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/delete-card?collectionId=${collectionId}&cardId=${cardId}`, null,config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
          return rejectWithValue(handledError);
      }
    }
)


export const updateCard = createAsyncThunk(
    "portfolio/updateCard",
    async ({cardId, collectionId, card}: {cardId: string, collectionId: string, card: Card }, { rejectWithValue }) => {
      
        try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/edit-card?collectionId=${collectionId}&cardId=${cardId}`, {card},config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
          return rejectWithValue(handledError);
      }
    }
)