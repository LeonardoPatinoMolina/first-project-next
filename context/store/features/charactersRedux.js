import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  character: [],
  isChargeReady: false,
  blockNumber: 1,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    add_character: (state, action) => {
      state.character.push(action.payload);
    },
    set_charge_ready: (state, action) => {
      state.isChargeReady = action.payload;
    },
    set_block_number: (state, action) => {
      state.blockNumber = action.payload;
    },
    init_characters: (state, action) => {
      state.character = action.payload;
      state.isChargeReady = true;
    },
  },
});

export const {
  add_character,
  set_charge_ready,
  set_block_number,
  init_characters,
} = charactersSlice.actions;

export default charactersSlice.reducer;
