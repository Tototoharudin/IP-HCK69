/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchFav } from "../feature/anime/favSlice";

const Favorite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);

  const deleteData = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:3000/favorite/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      dispatch(fetchFav());

      favorites.map((el) => {
        Swal.fire({
          title: `${el.Anime.title} Deleted From Your Favorites`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchFav());
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"
      />
      <div className="flex flex-wrap mt-16 justify-center">
        <div className="w-full max-w-full px-32 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-3xl">
                    My Anime List
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All anime in your favorite list
                  </span>
                </h3>
              </div>
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">
                          IMAGE / TITLE
                        </th>
                        <th className="pb-3 text-end min-w-[100px]">TYPE</th>
                        <th className="pb-3 pr-12 text-end min-w-[175px]">
                          SCORE
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          STATUS
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          EPISODE
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          TAG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {favorites &&
                        favorites.map((item) => (
                          <tr className="border-b border-dashed last:border-b-0">
                            <td className="p-3 pl-0">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={item.Anime.imgUrl}
                                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <Link>
                                    <h1 className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                      {item.Anime.title}
                                    </h1>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 pr-0 text-end">
                              <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-warning bg-warning-light rounded-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-full h-1 my-4"
                                ></svg>{" "}
                                {item.Anime.type}
                              </span>
                            </td>
                            <td className="p-3 pr-12 text-end">
                              <h1>
                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-danger bg-danger-light rounded-lg">
                                  {item.Anime.Score.name}
                                </span>
                              </h1>
                            </td>
                            <td className="p-3 pr-12 text-end">
                              {item.Anime.status === "Complete" ? (
                                <span className="text-center uppercase align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-success bg-success-light rounded-lg">
                                  {item.Anime.status}
                                </span>
                              ) : (
                                <span className="text-center uppercase align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                  {item.Anime.status}
                                </span>
                              )}
                            </td>
                            <td className="p-3 pr-12 text-end">
                              <h1>
                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-black bg-primary-light rounded-lg">
                                  {item.Anime.episode}
                                </span>
                              </h1>
                            </td>
                            <td className="p-3 pr-12 text-end">
                              <Link to={`/edit-fav/${item.Anime.id}`}>
                                <button
                                  // onClick={handleLogout}
                                  className="bg-yellow-400 text-gray-200 border border-gray-300 p-2 mr-2 rounded-xl hover:bg-yellow-600 hover:text-gray-100"
                                >
                                  Edit
                                </button>
                              </Link>
                              <button
                                onClick={() => {
                                  // {console.log(item.Anime.id, "<<<<<<>>>>>>???");}
                                  deleteData(item.id);
                                }}
                                className="bg-red-600 text-gray-200 border border-gray-300 p-2 rounded-xl hover:bg-red-800 hover:text-gray-100"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorite;
