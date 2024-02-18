import React, { useContext } from 'react'
// import styles from './Navbar.module.css'
import logo from '../images/freshcart-logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { cartContext } from '../../Context/CartContext'
export default function Navbar() {
  let location = useLocation()
  let {token,setToken} = useContext(tokenContext)
  let navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  let {countOfItems, countOfFavourItems} = useContext(cartContext)
// console.log(countOfItems)
  function checkForLogout(){
    MySwal.fire({
      title: "Are you sure ! ",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire(
          {
            title: "You are logout",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          }
        );
      }
    });
  }


  function logout(){
   localStorage.removeItem("token")
   setToken(null)
   navigate("/login")
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
      <img src={logo} alt={logo} />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`path-Link ${location.pathname === '/' ? 'color-main' : ''}`} aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`path-Link ${location.pathname === '/products' ? 'color-main' : ''}`} aria-current="page" to="products">Products</Link>
        </li>
        <li>
        <Link className={`path-Link ${location.pathname === '/categories' ? 'color-main' : ''}`} aria-current="page" to="categories">Categories</Link>
        </li>
        <li>
        <Link className={`path-Link ${location.pathname === '/brands' ? 'color-main' : ''}`} aria-current="page" to="brands">Brands</Link>
        </li>
        <li>
        <Link className={`path-Link ${location.pathname === '/cart' ? 'color-main' : ''}`} to="cart">Cart <span className="badge bg-main">{countOfItems}</span></Link>
        
        </li>
        <li className="nav-item">
          <Link className={`path-Link ${location.pathname === '/favourites' ? 'color-main' : ''}`} to="favourites">Wishlist <span className="badge bg-danger">{countOfFavourItems}</span></Link>
        </li>
      </ul>:''}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {token?<li className="nav-item">
          <button className="btn SignOut fw-bold" onClick={checkForLogout}>SignOut</button>
        </li>: <>
        <li className="nav-item">
          <Link className={`path-Link ${location.pathname === '/login' ? 'bg-main' : ''}`} aria-current="login" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className={`path-Link ${location.pathname === '/register' ? 'bg-main' : ''}`} to="register">Register</Link>
        </li>
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
