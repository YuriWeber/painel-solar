import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'result',
  initialState: {
    showResult: false
  },
  reducers: {
    changeShowResult(state, { payload }) {
      return {...state, showResult: payload}
    }
  }
})

export const { changeShowResult } = slice.actions

export default slice.reducer