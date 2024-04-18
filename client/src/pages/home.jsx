import { useEffect, useState } from "react";
import Card from "../components/card";
import axios from "axios";

const HomePage = () => {
  const [anime, setAnime] = useState(null);
  const [param, setParam] = useState(null);
  const [page, setPage] = useState(null);

  const search = (input) => {
    setParam({ ...param, search: input });
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    search(value);
  };
  const handlePage = (number) => {
    setParam({ ...param, "page[number]": number });
  };
  async function fetchData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/anime`,
        params: param,
      });
      setAnime(data.data);
      setPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  }
  let totalPage = [];
  for (let i = 1; i <= page; i++) {
    totalPage.push(i);
  }

  useEffect(() => {
    fetchData();
  }, [param]);
  return (
    <>
      <div className="relative mt-6 max-w-lg mx-auto">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4 bg">
            {anime && anime.map((item) => <Card key={item.id} Anime={item} />)}
          </div>
          <div className="flex justify-center">
            <div className="flex rounded-md mt-8">
              {page &&
                totalPage.map((el, index) => (
                  <button
                    key={index}
                    className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
                    name="page[number]"
                    onClick={() => {
                      handlePage(el);
                    }}
                  >
                    <span>{el}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-600">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a
            disabled
            className="text-xl font-bold text-gray-200 hover:text-gray-200"
          >
            WibuLovers
          </a>
          <p className="py-2 text-gray-200 sm:py-0">All Anime List</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
