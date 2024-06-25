import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'result',
  initialState: {
    showResult: false,
    error: false,
  },
  reducers: {
    changeShowResult(state, { payload }) {
      return {...state, showResult: payload, error: !payload}
    }
  }
})

export const { changeShowResult } = slice.actions

export default slice.reducer