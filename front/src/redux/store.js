import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'
import resultReducer from './resultSlice'
import dataReducer from './dataSlice'

export default configureStore({
  reducer: {
    location: locationReducer,
    result: resultReducer,
    data: dataReducer,
  }
})