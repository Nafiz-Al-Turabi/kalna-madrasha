import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import AdminPanel from "../Pages/Admin/Admin";
import Dashboard from "../AdminComponents/Dashboard/Dashboard";
import AddTeacher from "../AdminComponents/AddTeacher/AddTeacher";
import AddNotice from "../AdminComponents/AddNotice/AddNotice";
import AddResult from "../AdminComponents/AddResult/AddResult";
import AddRoutine from "../AdminComponents/AddRoutine/AddRoutine";
import AddStudent from "../AdminComponents/AddStudent/AddStudent";
import AddCommitte from "../AdminComponents/AddCommitte/AddCommitte";
import Contact from "../Pages/Contact/Contact";
import AddNews from "../AdminComponents/AddNews/AddNews";
import AcademicResult from "../Pages/Result/AcademicResult";
import Others from "../AdminComponents/Others/Others";
import ELibrary from "../Components/ELibrary/ELibrary";
import StudentsInformation from "../Components/StudentsInformation/StudentsInformation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'/academicResult',
        element:<AcademicResult></AcademicResult>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:'elibrary',
        element:<ELibrary></ELibrary>
      },
      {
        path:'studentsInformation',
        element:<StudentsInformation></StudentsInformation>
      }
    ]

  },
  {
    path: '/admin',
    element: <AdminPanel></AdminPanel>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: 'addTeacher',
        element: <AddTeacher></AddTeacher>
      },
      {
        path: 'addStudent',
        element: <AddStudent></AddStudent>
      },
      {
        path: 'addNotice',
        element: <AddNotice></AddNotice>
      },
      {
        path: 'addResult',
        element: <AddResult></AddResult>
      },
      {
        path: 'addRoutine',
        element: <AddRoutine></AddRoutine>
      },
      {
        path:'addCommitte',
        element:<AddCommitte></AddCommitte>
      },
      {
        path:'addNews',
        element:<AddNews></AddNews>
      },
      {
        path:'others',
        element:<Others></Others>
      }
    ]
  }
]);