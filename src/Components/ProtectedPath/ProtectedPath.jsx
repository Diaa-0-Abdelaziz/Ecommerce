import React from 'react'
// import styles from './ProtectedPath.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedPath(props) {
 if(localStorage.getItem("token")){
  return props.children
 }else{
  return <Navigate to={"/login"}/>
 }
}
