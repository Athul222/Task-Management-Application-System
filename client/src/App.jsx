import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Header from "./controllers/Header"
import Home from "./controllers/Home"
import Login from "./controllers/Login"
import Register from "./controllers/Register"
import Task  from "./controllers/Task"
import NewTask from "./controllers/NewTask"
import UpdateTask from "./controllers/UpdateTask"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header /><Home /></>
    },
    {
      path: "/login",
      element : <><Header /><Login /></>
    },
    {
      path: "/register",
      element : <><Header /><Register /></>
    },
    {
      path: "/tasks/all",
      element: <><Header/><Task /></>
    },
    {
      path: "/add-task",
      element: <><Header /><NewTask /></>
    },
    {
      path: "/update-task",
      element: <><Header /><UpdateTask /></>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
