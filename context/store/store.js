import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./features/charactersRedux";
import favoritesReducer from "./features/favoritesRedux";
import myHerosReducer from './features/myherosRedux'
import loadingBarReducer from './features/loadingBarRedux'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    favorites: favoritesReducer,
    myheros: myHerosReducer,
  },
});
