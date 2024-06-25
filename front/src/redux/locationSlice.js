import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'location',
  initialState: {
    lat: null,
    lng: null,
    description: '',
  },
  reducers: {
    changeLocation(state, { payload }) {
      return {...state, lat: payload.lat, lng: payload.lng, description: payload.description}
    }
  }
})

export const { changeLocation } = slice.actions

export default slice.reducer