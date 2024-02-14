
import axios from "axios";
import { createContext} from "react";
export let cartContext = createContext()
async function AddToCart(id){
    console.log("hello",id)
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }

}
export default function CartContextProvider(props){

    return <cartContext.Provider value={{AddToCart}}>
       {props.children}
    </cartContext.Provider>
}