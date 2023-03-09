import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'location',
  initialState: {
    positionX: 0,
    positionY: 0,
    locationDesc: '',
  },
  reducers: {
    changeLocation(state, { payload }) {
      return {...state, positionX: payload.positionX, positionY: payload.positionY, locationDesc: payload.locationDesc}
    }
  }
})

export const { changeLocation } = slice.actions

export default slice.reducer