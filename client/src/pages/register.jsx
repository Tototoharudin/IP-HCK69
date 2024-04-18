import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newInput = {
      ...input,
    };

    newInput[name] = value;

    setInput(newInput);
  };
  console.log(input, "<<<< INI INPUT");
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "POST",
        url: `http://localhost:3000/register`,
        data: input,
      });

      navigate("/login");
      Swal.fire({
        title: "Success Register",
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

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/ninja-logo-template-with-details_23-2148995971.jpg?t=st=1713258206~exp=1713261806~hmac=78bbd889a6a550f6ffcfc65b6e1a9ae06c3716f5cff970c422e486bfa0a58b0f&w=740)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide"></h1>
            <p className="text-3xl my-4"></p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/ninja-logo-template-with-details_23-2148995971.jpg?t=st=1713258206~exp=1713261806~hmac=78bbd889a6a550f6ffcfc65b6e1a9ae06c3716f5cff970c422e486bfa0a58b0f&w=740)",
            }}
          >
            <div className="absolute bg-white opacity-60 inset-0 z-0" />
          </div>
          <div className="w-full py-6 z-20">
            <div className="flex flex-col items-center justify-center px-24">
              <div className="my-6 flex items-center">
                <img
                  src="https://img.freepik.com/free-vector/ninja-logo-template-with-details_23-2148995971.jpg?t=st=1713258206~exp=1713261806~hmac=78bbd889a6a550f6ffcfc65b6e1a9ae06c3716f5cff970c422e486bfa0a58b0f&w=740"
                  alt="logo"
                  className="w-auto h-16 lg:h-20 mr-2"
                />
                <h1 className="text-6xl font-bold">WibuLovers</h1>
              </div>
              <div className="px-8 md:px-64 lg:px-52" id="buttonDiv"></div>
              <br />
              <p className="text-gray-100 text-2xl">Sign Up Here</p>
              <br />
            </div>
            <form
              onSubmit={handleRegister}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  onChange={handleInputChange}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                  Sign Up
                </button>
              </div>
              <div className="mt-4 text-sm text-center font-semibold">
                <p>
                  Already Have Account ? &nbsp;
                  <Link to={"/Login"}>
                    <span className="text-white hover:underline hover:text-blue-700">
                      Login Here
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
