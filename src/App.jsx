import React from "react";

// ==================> IMPORT NAVIGATION <==================
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Footer from "./layouts/footer/Footer";
import Profil from "./components/dashboard/profil";
import Page from "./components/page/Page";
import Show from "./components/Places/ShowPlaces";
// ==================> IMPORT CSS <==================
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Page/:value",
      element: <Page />,
    },
    {
      path: "/dashboard",
      element: <Profil />,
    },
    {
      path: "/show/:value",
      element: <Show />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
