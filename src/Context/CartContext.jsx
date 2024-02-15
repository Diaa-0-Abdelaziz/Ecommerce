
import axios from "axios";
import { createContext, useState} from "react";
import toast from "react-hot-toast";
export let cartContext = createContext()
export default function CartContextProvider(props){
    const [countOfItems, setCountOfItems] = useState(0)
async function AddToCart(id){
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        // console.log(data.data.numOfCartItems)
        setCountOfItems(data.data.numOfCartItems)
        return (
            successMessage(data.data.message)
            
        )
    } catch (err) {
        console.log(err);
        errorMessage(err)
    }
    
}
async function getCartItems(){
    try {
        const data = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCountOfItems(data.data.numOfCartItems)
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function AddToFavourite(id){
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        console.log(data)
        // setCountOfItems(data.data.numOfCartItems)
        return (
            successMessage(data.data.message)
            
        )
    } catch (err) {
        console.log(err);
        errorMessage(err)
    }

}


async function getFavourItems(){
    try {
        const data = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCountOfItems(data.data.numOfCartItems)
        return data;
    } catch (err) {
        console.log(err);
    }
}












function successMessage(data){
    toast.success(data)
  }
function errorMessage(data){
    toast.error(data)
  }

    return <cartContext.Provider value={{AddToCart, countOfItems, getCartItems, AddToFavourite, getFavourItems}}>
       {props.children}
    </cartContext.Provider>
}