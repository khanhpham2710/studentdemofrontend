import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:8080/api/student";


export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (page, thunkApi) => {
    try {
      const response = await axios.get(`${baseUrl}/pagination`, {
        params: {
          page: page,
          size: 3
        }
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
);

export const addNewStudents = createAsyncThunk(
  'students/addNewStudents',
  async (student, thunkApi) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, student)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteStudents = createAsyncThunk(
  'students/deleteStudents',
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const updateStudents = createAsyncThunk(
  'students/updateStudents',
  async ({id,student}, thunkApi) => {
    try {
      const response = await axios.put(`${baseUrl}/update/${id}`, student)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const searchStudents = createAsyncThunk(
  'students/searchStudents',
  async ({name,orderBy,page}, thunkApi) => {
    try {
      const response = await axios.get(`${baseUrl}/search`,{
        params: {
          name: name,
          orderBy: orderBy,
          page: page,
          size: 3
        }
      })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const searchThanThanh = createAsyncThunk(
  'students/searchThanThanh',
  async ({name,studentRank, startYear, endYear, page}, thunkApi) =>{
    try {
      const response = await axios.get(`${baseUrl}/searchthanthanh`,{
        params: {
          name: name,
          studentRank: studentRank,
          startYear: startYear,
          endYear: endYear,
          page: page,
          size: 3
        }
      })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const uploadImage = createAsyncThunk(
  'student/uploadImage',
  async ({id,formData},thunkApi) =>{
    try {
      const response = await axios.post(`${baseUrl}/updateImage/${id}`, formData,{
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      return response.data
    } catch (error){
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getImages = createAsyncThunk(
  'students/getImage',
  async (id, thunkApi) =>{
    try {
      const response = await axios.get(`${baseUrl}/getAllImages/${id}`)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)





const initialState = {
  entities: [],
  loading: 'start',
  message: null,
  status: null,
  error: null,
  totalPages: 0,
  images: []
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    resetStatusAndMessage: (state) =>{
      state.error = null;
      state.message = null;
      state.status = null;
      state.loading = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = 'start';
        state.entities = action.payload.data.students;
        state.totalPages = action.payload.data.totalPages 
        state.status = action.payload.status
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.error.data; 
        state.status = action.payload.status
      })
      .addCase(searchStudents.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.loading = 'start';
        state.entities = action.payload.data.students;
        state.totalPages = action.payload.data.totalPages
        state.status = action.payload.status
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.error.data;
        state.status = action.payload.status
      })
      .addCase(addNewStudents.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(addNewStudents.rejected, (state, action) => {
        state.status = action.payload.status
        state.message = action.payload.data
      })
      .addCase(deleteStudents.fulfilled, (state, action) => {
        state.entities = state.entities.filter(item => item.id !== action.meta.arg)
        state.status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(deleteStudents.rejected, (state, action) => {
        state.status = action.payload.status
        state.message = action.payload.message
      })
      .addCase(updateStudents.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.message = action.payload.message
        state.entities = state.entities.map(item => {
          if (item.id === action.meta.arg.id) {
            return { ...item, ...action.payload.data };
          }
          return item;
        })
      })
      .addCase(updateStudents.rejected, (state, action) => {
        state.message = action.payload.data
        state.status = action.payload.status
      })
      .addCase(searchThanThanh.fulfilled, (state, action) => {
        state.loading = 'start';
        state.entities = action.payload.data.students;
        state.totalPages = action.payload.data.totalPages 
        state.status = action.payload.status
      })
      .addCase(searchThanThanh.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.error.data; 
        state.status = action.payload.status
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = 'start';
        state.entities = action.payload.data
        state.status = action.payload.status
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = 'start';
        // state.message = action.payload.data.message
        state.images = action.payload.data
        state.status = action.payload.status
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.error.data; 
        state.status = action.payload.status
      })
  },
});

export default studentSlice.reducer;
export const { resetStatusAndMessage } = studentSlice.actions