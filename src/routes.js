import Category from "./Pages/Category/Category";
import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";

import AdminPanel from "./Pages/AdminPanel/index";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminArticles from "./Pages/AdminPanel/Articles/Articles";
import AdminCourses from "./Pages/AdminPanel/Articles/Articles";
import Menus from "./Pages/AdminPanel/Menus/Menus";
import CoursesPAdmin from "./Pages/AdminPanel/Courses/Courses";
import CategoryAPanel from "./Pages/AdminPanel/Category/Category";

const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/course-info/:courseName",
    element: <CourseInfo />,
  },
  {
    path: "/category-info/:categoryName/:page",
    element: <Category />,
  },
  {
    path: "/article-info/:articleName",
    element: <ArticleInfo />,
  },
  {
    path: "/courses/:page",
    element: <Courses />,
  },
  {
    path: "/articles/:page",
    element: <Articles />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/search/:value",
    element: <Search />,
  },
  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "articles",
        element: <AdminArticles />,
      },
      {
        path: "courses",
        element: <CoursesPAdmin />,
      },
      {
        path: "menus",
        element: <Menus />,
      },
      {
        path: "categories",
        element: <CategoryAPanel />,
      },
    ],
  },
];
export default routes;
