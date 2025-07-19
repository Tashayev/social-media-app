import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isTextVisible: false
}

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    showText: (state) => { state.isTextVisible = true },
    hideText: (state) => { state.isTextVisible = false },
  }
});

export const {showText, hideText} = linksSlice.actions

export default linksSlice.reducer