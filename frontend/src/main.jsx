import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Category from "./routes/category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return fetch("http://127.0.0.1:8000/api/categories").then((res) =>
        res.json()
      );
    },
    children: [
      {
        path: "categories/:categoryId",
        element: <Category />,
        loader: async ({ params }) => {
          return fetch(
            `http://127.0.0.1:8000/api/categories/${params.categoryId}`
          );
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
