import { configureStore } from '@reduxjs/toolkit';
import studentReduce from "./studentSlice"

const store = configureStore({
  reducer: {
    students: studentReduce,
  },
});


export default store