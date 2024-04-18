import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./feature/anime/favSlice";
import detailSlice from "./feature/anime/detailSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteSlice,
    details: detailSlice,
  },
});
