import Root from "../pages/client/Root";
import Home from "../pages/client/Home";
import Blog from "../pages/client/Blog";
import Portfolio from "../pages/client/Portfolio";
import Level from "../pages/client/Level";
import About from "../pages/client/About";
import Shop from "../pages/client/Shop";
import AdminRoot from "../pages/admin/AdminRoot";
import Dashboard from "../pages/admin/Dashboard";

export const ROUTES = [
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/level",
        element: <Level />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      }
    ],
  },
];