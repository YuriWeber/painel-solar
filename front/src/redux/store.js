import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'
import resultReducer from './resultSlice'

export default configureStore({
  reducer: {
    location: locationReducer,
    result: resultReducer,
    // data: dataReducer,
  }
})