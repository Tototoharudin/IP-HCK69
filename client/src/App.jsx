import { useState } from "react";
// import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Register from "./pages/register";
import HomePage from "./pages/home";
import DetailPage from "./pages/detail";
import MainLayout from "./components/mainLayout";
import Favorite from "./pages/favorite";
import { store } from "./store";
import { Provider } from "react-redux";
import EditPage from "./pages/editFav";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (localStorage.access_token) {
        return null;
      }
      return redirect("/login");
    },
    children: [
      {
        path: "/anime/:id",
        element: <DetailPage />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "edit-fav/:id",
        element: <EditPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
