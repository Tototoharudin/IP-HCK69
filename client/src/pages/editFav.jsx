/* eslint-disable no-undef */
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [score, setScore] = useState(null);
  const [input, setInput] = useState({
    ScoreId: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value, "<<>>>");
    const newInput = {
      ...input,
      [name]: value,
    };

    setInput(newInput);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:3000/favorite/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: input,
      });
      //   console.log(input < "<< INPUTS");
      navigate("/favorite");

      Swal.fire({
        title: `Success Update Your Fav List`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataById = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/anime/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setInput(data);
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };
  const fetchDataScore = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/score`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setScore(data);
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };
  //   console.log(input, "<<< INI INPUT");
  useEffect(() => {
    fetchDataById();
  }, []);
  useEffect(() => {
    fetchDataScore();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleUpdate}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="fName"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    TItle
                  </label>
                  <input
                    disabled
                    value={input.title}
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="lName"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Type
                  </label>
                  <input
                    disabled
                    value={input.type}
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Status
                  </label>
                  <select
                    onChange={handleInputChange}
                    name="status"
                    value={input.status}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {input.status === "Complete" ? (
                      <>
                        <option value="Watching" disabled>
                          Watching
                        </option>
                        <option value="Complete" selected>
                          Complete
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Watching">Watching</option>
                        <option value="Complete">Complete</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="time"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Score
                  </label>
                  <select
                    name="ScoreId"
                    onChange={handleInputChange}
                    value={input.ScoreId}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {score &&
                      score.map((el) => (
                        <option value={el.id}>{el.name}⭐</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="justify-center">
              <button className="hover:bg-blue-900 rounded-md bg-[#6A64F1] py-3 px-8  text-base font-semibold text-white outline-none">
                Submit
              </button>
              <Link to={-1}>
                <button className="hover:bg-gray-700 rounded-md bg-gray-500 py-3 px-8 ml-6  text-base font-semibold text-white outline-none">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPage;
