import { useRoutes } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import MainLayout from "../Layout/MainLayout";
import Categories from "../../pages/Categories";
import Thread from "../../pages/Thread/Thread";
import NotFound from "../../pages/NotFound";
import PostThread from "../../pages/Thread/PostThread";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import ForgotPassword from "../../pages/ForgotPassword";
import Threads from "../../pages/Threads";

const MainRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "category/:categoryId", element: <Categories /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "thread",
          children: [
            { path: ":threadId", element: <Thread /> }, 
            { path: "new", element: <PostThread /> }, 
          ],
        },
        { path: "threads", element: <Threads /> },
        { path: "*", element: <NotFound /> },
      ],
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
      path: "/forgot-password",
      element: <ForgotPassword />
    }
  ]);
  return routes;
};

export default MainRoutes;
