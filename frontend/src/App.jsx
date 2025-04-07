import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/sign-up",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
