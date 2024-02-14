import React, { useContext } from 'react'
import styles from './Home.module.css'
import { tokenContext } from '../../Context/TokenContext'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import SliderHome from '../SliderHome/SliderHome'
export default function Home() {
 const {token} = useContext(tokenContext)
//  console.log(token)
  return (
    <>
    <SliderHome/>
    <FeatureProducts/>
    </>
  )
}
