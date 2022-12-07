import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  blockNumber: 1,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add_favorite: (state, action) => {
      state.favorites.push(action.payload);
      try {
        const newFav = JSON.stringify(state.favorites);
        window.localStorage.setItem("FavoritesState", newFav);
      } catch (error) {
        console.log(error);
      }
    },
    remove_favorite: (state, action) => {
      if (action.payload === "all") {
        state.favorites = [];
        try {
          window.localStorage.setItem("FavoritesState", "[]");
        } catch (error) {
          console.log(error);
        }
        return;
      }
      let newFavorites;
      if (state.favorites.length > 1) {
        newFavorites = state.favorites.filter(
          (fav) => fav.id !== action.payload
        );
      } else newFavorites = [];

      state.favorites = newFavorites;
      try {
        let newSaveFav;
        if (state.favorites.length < 1) newSaveFav = "[]";
        else newSaveFav = JSON.stringify(newFavorites);
        window.localStorage.setItem("FavoritesState", newSaveFav);
      } catch (error) {
        console.log(error);
      }
    },
    set_block_number: (state, action) => {
      state.blockNumber = action.payload;
    },
    init_favorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {
  add_favorite,
  remove_favorite,
  set_block_number,
  init_favorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
