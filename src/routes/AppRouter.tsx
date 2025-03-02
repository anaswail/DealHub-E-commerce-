import { createBrowserRouter, RouterProvider } from "react-router-dom";

// route pages
import MainLayout from "@layouts/mainLayout/MainLayout";
import Home from "@pages/Home";
import Products from "@pages/Products";
import Categories from "@pages/Categories";
import About from "@pages/About";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error";
import Cart from "@pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "categories/products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found ",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
