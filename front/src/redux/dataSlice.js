import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'data',
  initialState: {
    monthlyProduction: 0,
    yearlyProduction: 0,
    estimatedSavings: 0,
    weight: 0,
    requiredArea: 0
  },
  reducers: {
    changeData(state, { payload }) {
      return {...state, 
        monthlyProduction: parseFloat(payload.monthlyProduction), 
        yearlyProduction: parseFloat(payload.yearlyProduction), 
        estimatedSavings: parseFloat(payload.estimatedSavings), 
        weight: payload.weight,
        requiredArea: payload.requiredArea
      }
    }
  }
})

export const { changeData } = slice.actions

export default slice.reducer