import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { setPortfolio } from '../redux/portfolioSlice';
import { Education, Position, ProfileData, Service } from '../misc/types';
import { handleAxiosError } from '../misc';

const BASE_API = `${import.meta.env.PORTAL_BACKEND_API_URL}/api`


export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (profile: ProfileData, { rejectWithValue }) => {
      
        try {

        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}`, profile,config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
        }
    }
)


export const editProfileImage = createAsyncThunk(
    "user/editProfileImage",
    async (details: {image: File | null, userName: string, imageId?: string}, { rejectWithValue }) => {

        const {image, userName, imageId = ""} = details

        const formData = new FormData();
        image && formData.append("image", image); 
        formData.append("userName", userName); 
        formData.append("imageId", imageId);

        try {


        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            };

        const response = await axios.post(`${BASE_API}/edit-profile-image`, formData ,config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
      }
    }
)



export const fetchUserPortfolio = createAsyncThunk(
    "user/fetchUserPortfolio",
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
  
        const response = await axios.get(`${BASE_API}`, config);

        if (response.data?.portfolio?.collections) {
          dispatch(setPortfolio(response.data.portfolio.collections));
        } 
          
        return response.data;
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
      }
    },
  );
  
  export const fetchPortfolioPreview = createAsyncThunk(
    "user/fetchPortfolioPreview",
    async (username: string , { dispatch, rejectWithValue }) => {
      try {
        // Construct the URL properly using the username parameter
        const response = await axios.get(`${BASE_API}/profile/${username}`);

        dispatch(setPortfolio(response.data.portfolio.collections))

        return response.data; // Return the data on success
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);      }
    }
  );

  export const fetchProfileServices = createAsyncThunk(
    "user/fetchProfileServices",
    async (username: string , { rejectWithValue }) => {
      try {
        // Construct the URL properly using the username parameter
        const response = await axios.get(`${BASE_API}/services/${username}`);

        return response.data; // Return the data on success
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);    
        }
    }
  );



  export const createAbout = createAsyncThunk(
    "user/createAbout",
    async (about: string, { rejectWithValue }) => {
      
        try {

        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            };

        const response = await axios.post(`${BASE_API}/save-about`, {about},config);

        return response.data
      
      
      } catch (error) {
        const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
      }
    }
)



export const createPosition = createAsyncThunk(
  "user/createPosition",
  async (position: Position, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/add-position`, position,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)



export const deletePosition = createAsyncThunk(
  "user/deletePosition",
  async (positionId: string, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/delete-position?positionId=${positionId}`, null,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)


export const updatePosition = createAsyncThunk(
  "user/updatePosition",
  async ({positionId, position}: {positionId: string, position: Position}, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/edit-position?positionId=${positionId}`, position,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)



export const createEducation = createAsyncThunk(
  "user/createEducation",
  async (education: Education, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/add-education`, education,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)


export const deleteEducation = createAsyncThunk(
  "user/deleteEducation",
  async (educationId: string, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/delete-education?educationId=${educationId}`, null,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)


export const updateEducation = createAsyncThunk(
  "user/updateEducation",
  async ({educationId, education}: {educationId: string, education: Education}, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/edit-education?educationId=${educationId}`, education,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)



export const createService = createAsyncThunk(
  "user/createService",
  async (service: Service, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/add-service`, service,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)



export const deleteService = createAsyncThunk(
  "user/deleteService",
  async (serviceId: string, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/delete-service?serviceId=${serviceId}`, null,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)


export const updateService = createAsyncThunk(
  "user/updateService",
  async ({serviceId, service}: {serviceId: string,service: Service }, { rejectWithValue }) => {
    
      try {
      const config = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          };

      const response = await axios.post(`${BASE_API}/edit-service?serviceId=${serviceId}`, service,config);

      return response.data
    
    
    } catch (error) {
      const handledError = handleAxiosError(error);
        return rejectWithValue(handledError);
    }
  }
)
