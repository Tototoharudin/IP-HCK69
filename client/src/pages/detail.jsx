import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../feature/anime/detailSlice";

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details.list);
  const genres = useSelector((state) => state.details.genres);

  const handleAdd = async () => {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:3000/favorite/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      Swal.fire({
        title: `Added ${detail.title} To Favorite List`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
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
  console.log(detail, "<<<<");

  useEffect(() => {
    dispatch(fetchDetail(id));
    // fetchDetail()
  }, [id]);

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-slate-700-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="pict"
              className="lg:w-2/5 w-full object-cover object-center rounded border border-gray-200"
              src={detail.imgUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-white tracking-widest font-semibold">
                WibuLovers
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {detail.title}
              </h1>
              <div className="flex mb-4 pt-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-white ml-1">
                    {detail.rating} Ratings
                  </span>
                </span>
                <h1 className="flex ml-3 pl-3 py-2 border-l-2 text-xl text-white">
                  {detail.type}
                </h1>
              </div>
              <h1 className="text-2xl pb-2 text-white font-serif">
                Synopsis :{" "}
              </h1>
              <p className="leading-relaxed text-white">{detail.synopsis}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3 text-white font-mono font-bold">
                    Genres : {genres}
                  </span>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-xl text-white">
                  {detail.episode} Episodes
                </span>
                <Link to={-1}>
                  <button className="flex lg:ml-48 ml-96 text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-slate-800 rounded">
                    Back
                  </button>
                </Link>
                <a
                  href={detail.trailer}
                  className="flex ml-1  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Trailer
                </a>
                {localStorage.status === "Premium" ? (
                  <button
                    onClick={() => {
                      handleAdd(detail.id);
                    }}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                ) : (
                  <h1 className="text-xl inline-flex items-center justify-center ml-2">
                    ❌
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailPage;
