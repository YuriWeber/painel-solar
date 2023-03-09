import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'data',
  initialState: {
    result: false,
    monthlyConsumption: 0,
    kwhValue: 0,
  },
  reducers: {
    changeData(state, { payload }) {
      return {...state, 
        monthlyConsumption: payload.monthlyConsumption, 
        kwhValue: payload.kwhValue, 
        result: payload.result
      }
    }
  }
})

export const { changeData } = slice.actions

export const selectData = state => state

export default slice.reducer