import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myheros: [],
  blockNumber: 1,
};

export const myHerosSlice = createSlice({
  name: "myheros",
  initialState,
  reducers: {
    add_myHero: (state, action) => {
      state.myheros.push(action.payload);
    },
    remove_myHero: (state, action) => {
      if(action.payload === 'all') {
        state.myheros = []
        return
      }
      let newState;
      if(state.myheros.length > 1) {
        newState = state.myheros.filter(
          (hero)=> hero.id !== action.payload
          );
      } else newState = []
      state.myheros = newState;
    },
    set_block_number: (state, action) => {
      state.blockNumber = action.payload;
    },
    init_myHeros : (state, action)=>{
      state.myheros = action.payload;
    }
  },
});

export const { add_myHero, remove_myHero, set_block_number, init_myHeros } =
  myHerosSlice.actions;

export default myHerosSlice.reducer;
