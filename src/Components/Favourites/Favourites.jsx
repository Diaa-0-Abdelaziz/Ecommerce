import React,{ useContext, useState, useEffect} from 'react'
// import styles from './Favourites.module.css'
import axios from 'axios';
import { Triangle } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContext'
export default function Favourites() {
  const [showFavouriteItems, setShowFavouriteItems] = useState({})
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  let {getFavourItems} = useContext(cartContext)
  function deleteItem(id){
    console.log("delete", id)
    removeFromFavourite(id)
  }
   async function removeFromFavourite(id){
    setIsLoading(true)
  
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/` + id, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
           
        console.log(data.data)
        getFavourItems()
        // setShowFavouriteItems(data.data)
        favouriteItems()
        // setIsLoading(false)
}
  


  async function favouriteItems(){
    try {
      // setIsLoading(true)
      const {data} = await getFavourItems();
      
      setNumberOfItems(data.count)
      // setCountOfItems(data.data.numOfCartItems)
      // setShowCartItems(data.data.data.products)
      setShowFavouriteItems(data.data)
      setIsLoading(false)
        // console.log(data);
    } catch (err) {
        console.log(err);
    }

}
useEffect(() => {
  favouriteItems()
}, [])

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
    {numberOfItems>=1 ? <h2 className=' text-center my-3 bg-main text-light p-2 fw-bolder'>Favourites Items : {numberOfItems}</h2> : <h2 className=' text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your wishlist</h2>}
  {showFavouriteItems.map((data)=>
<div key={data.id} className="card my-3">
  <div className="row g-0">
    <div className="col-md-4">
      <img src={data.imageCover} className="img-fluid rounded-start w-100" alt={data.imageCover}/>
    </div>
    <div className="col-md-8 position-relative">
      <div className ="card-body">
        <h5 className="card-title mb-4 fw-bolder">{data.title.split(" ").slice(0,3).join(' ')}</h5>
        <ul className=' list-unstyled'>
          <li className='fw-bolder mb-2'>Brand: <span className='color-main'>{data.brand.name}</span></li>
          <li className='fw-bolder mb-2'>Category: <span className='color-main'>{data.category.name}</span></li>
          <li className='fw-bolder mb-2'>Rating: <i className="fa fa-star rating-color"></i>{data.ratingsAverage}</li>
        </ul>
        <p className='fw-bolder'> Price: {data.price} L.E</p>
        
        <i className="fa-solid fa-xmark p-2 close-btn rounded-2 position-absolute cursor-pointer bottom-0 end-0 m-3" onClick={()=>deleteItem(data.id)}></i>
      </div>
    </div>
</div>
</div>
)}
  </div>
}
    </>
  )
}
