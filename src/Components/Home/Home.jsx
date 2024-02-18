import React, { useContext } from 'react'
import styles from './Home.module.css'
import { tokenContext } from '../../Context/TokenContext'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import SliderHome from '../SliderHome/SliderHome'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
 const {token} = useContext(tokenContext)
//  console.log(token)
  return (
    <>
    <MainSlider/>
    <SliderHome/>
    <FeatureProducts/>
    </>
  )
}
