import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const initialState = {
  list: {},
  genres: [],
};

export const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.list = action.payload;
    },
    setGenre: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setDetail, setGenre } = detailSlice.actions;

export function fetchDetail(id) {
  return async (dispatch) => {
    try {
      // console.log(id, ">>>>>>>>>>");
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/anime/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      let genres = data.genre.slice("").join(", ");
      console.log(data, "?>>?>?>");
      dispatch(setGenre(genres));
      dispatch(setDetail(data));
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };
}

export default detailSlice.reducer;
