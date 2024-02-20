import React,{useState, useEffect, useContext} from 'react'
import styles from './AllOrders.module.css'
import axios from 'axios';
import { Triangle } from 'react-loader-spinner'
import { tokenContext } from '../../Context/TokenContext';
export default function AllOrders() {
  const [owner, setOwner] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {decodeToken} = useContext( tokenContext)
  async function getOrders(){
    try {
        const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodeToken}`,{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        if(data.status == 200){
          // console.log(data.data)
          setOwner(data.data)
          setIsLoading(false)
        }
    } catch (err) {
        console.log(err);
    }
}
useEffect(() => {
  getOrders()
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
  <div className="container mt-5 pt-1">
    <p className=' fw-bolder bg-dark text-main p-2 mb-0 mt-3 text-center fs-5'> You have {owner.length} orders</p>
    {owner? 
    <>
  {owner.map((data)=>
<div key={data._id} className="card my-3 border-5 border-dark-subtle">
  <div>
  {data.cartItems.map((productsOrder)=>


  <div className="row g-0 p-2 border-3 bg-gradient bg-success-subtle m-2 rounded-3">
    <div className="col-md-2">
      <img src={productsOrder.product.imageCover} className="img-fluid rounded-start w-100" alt={productsOrder.product.imageCover}/>
    </div>
    <div className="col-md-10 position-relative">
      <div className ="card-body">
        <h5 className="card-title fw-bolder position-absolute top-0 end-0 bg-main p-1 text-light">{productsOrder.product.title.split(" ").slice(0,3).join(' ')}</h5>
        <ul className=' list-unstyled'>
          <li className='fw-bolder mb-2'>Brand: <span className='color-main'>{productsOrder.product.brand.name}</span></li>
          <li className='fw-bolder mb-2'>Category: <span className='color-main'>{productsOrder.product.category.name}</span></li>
          <li className='fw-bolder mb-2'>Rating: <i className="fa fa-star rating-color"></i>{productsOrder.product.ratingsAverage}</li>
        </ul>
        <p className='fw-bolder'> Count: {productsOrder.count}</p>
        <p className='fw-bolder'> Price: {productsOrder.price} L.E</p>
        {/* <p className='fw-bolder position-absolute top-0 end-0 bg-main p-1 text-light'>Total: {(data.price)*(data.count)} L.E</p> */}
        {/* <i className="fa-solid fa-xmark p-2 close-btn rounded-2 position-absolute cursor-pointer bottom-0 end-0 m-3" onClick={()=>deleteItem(data.product._id)}></i> */}
      </div>
    </div>
</div>
  )}
   <div className=' bg-dark text-light p-2 m-2 rounded-2'>
    <p className=' text-center fw-bolder p-2 text-main rounded-2 fs-5'>Owner's info</p>
    <ul className=' list-unstyled fw-bolder'>
      <li><span className='text-main'>Name:</span> {data.user.name}</li>
      <li><span className='text-main'>Email:</span> {data.user.email}</li>
      <li><span className='text-main'>Phone:</span> +20{data.shippingAddress.phone}</li>
      <li><span className='text-main'>City:</span> {data.shippingAddress.city}</li>
      <li><span className='text-main'>Details:</span> {data.shippingAddress.details}</li>
    </ul>
   </div>
   <p className='badge bg-danger fw-light fs-6 mb-0 rounded-0'>{data.createdAt}</p>
  </div>
</div>
)}
</>
: <h2 className=' text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your cart</h2>}
  </div>
}
    </>
  )
}
