import React, { useContext, useEffect } from 'react'
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Products from "./Components/Products/Products"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"
import Cart from "./Components/Cart/Cart"
import Categories from "./Components/Categories/Categories"
import Favourites from "./Components/Favourites/Favourites"
import Notfound from "./Components/Notfound/Notfound"
import Details from './Components/Details/Details'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { tokenContext } from './Context/TokenContext'
import ProtectedPath from './Components/ProtectedPath/ProtectedPath'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth'
export default function App() {
  let {setToken} = useContext(tokenContext)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  }, [])
  let routes =  createBrowserRouter([
    {
      path:"",
      element:<Layout/>,
      children:[
        {index:true, element:<ProtectedPath><Home/></ProtectedPath>},
        {path:'products', element:<ProtectedPath><Products/></ProtectedPath>},
        {path:'register', element:<ProtectedAuth><Register/></ProtectedAuth>},
        {path:'login', element:<ProtectedAuth><Login/></ProtectedAuth>},
        {path:'categories', element:<ProtectedPath><Categories/></ProtectedPath>},
        {path:'favourites', element:<ProtectedPath><Favourites/></ProtectedPath>},
        {path:'cart', element:<ProtectedPath><Cart/></ProtectedPath>},
        {path:'details/:id', element:<ProtectedPath><Details/></ProtectedPath>},
        {path:'*', element:<Notfound/>}
      ]
    }
  ])
  return (
   <RouterProvider router={routes}></RouterProvider>
  )
}
