import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Category from "./routes/category";
import Categories from "./routes/categories";
import Profile from "./routes/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users/:userName",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/categories/",
    element: <Categories />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":categoryId",
        element: <Category />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
