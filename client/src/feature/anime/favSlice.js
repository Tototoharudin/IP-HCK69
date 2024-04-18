import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFavorite } = favoriteSlice.actions;

export function fetchFav() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/favorite`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      dispatch(setFavorite(data));
      //   setAnime(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export default favoriteSlice.reducer;
