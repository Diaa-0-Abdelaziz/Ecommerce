import axios from 'axios'
import React, { useEffect, useState, useContext} from 'react'
import { Triangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";
// import styles from './Details.module.css'
import { cartContext } from '../../Context/CartContext'
export default function Details() {
  let {AddToCart} = useContext(cartContext)
  function addCart(id){
    AddToCart(id)
  }
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  let {id}= useParams()
  async function getDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id)
    setDetails(data.data)
    setIsLoading(false)
  }
  useEffect(()=>{
    getDetails(id)
  },[])
  return (
    <>
    {isLoading? <div className='loading d-flex align-items-center justify-content-center'>
         <Triangle
          visible={true}
          height="80"
          width="80"
          color="var(--main-color)"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""/> </div>: 
    <div className="container">
    <div className="card card-details mb-3">
  <div className="row g-0">
    <div className="col-md-4 position-relative">
    <SimpleImageSlider
        width="100%"
        height={504}
        images={details.images.map((img)=> img)}
        autoPlay= {true}
      />
    </div>
    <div className="col-md-8 d-flex align-items-center">
      <div className="card-body">
        <p className="fw-bolder text-main top-0 end-0 position-absolute rounded-0 badge fs-6 bg-main text-light">{details.category.slug}</p>
        <h5 className="card-title fw-bolder">{details.title}</h5>
        <p className="card-text text-muted">{details.description}</p>
        <p className="fw-bolder text-main rounded-0 badge fs-6 bg-main text-light">{details.brand.name}</p>
        <p className="fw-bolder">Quantity: <span className='color-main'>{details.quantity}</span></p>
        <div className='d-flex justify-content-between'>
                {
                  details.priceAfterDiscount?
                  
                    <div className='fw-bolder'>Price: 
                <span className='text-muted text-decoration-line-through'>{details.price}</span> 
                L.E / <span className='color-main'>{details.priceAfterDiscount}</span> L.E
                </div> : <div className='fw-bolder'>Price: 
                <span className='text-main'>{details.price}</span> 
                L.E
                </div>
                  
                  
                }
                <div><i className="fa fa-star rating-color"></i>{details.ratingsAverage}</div>
              </div>
              <div className='details-btn cursor-pointer rounded-2' onClick={()=>addCart(details.id)}><i className="fa-solid fa-cart-plus"></i> Add to cart</div>
      </div>
    </div>
  </div>
</div>
    </div>
   }
    </>
  )
}
