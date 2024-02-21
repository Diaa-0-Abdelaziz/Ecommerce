import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export let tokenContext = createContext();


export default function TokenContextProvider(props){
 let [token, setToken] = useState(null);
 let [decodeToken, setDecodeToken] = useState(null);
 let getToken = localStorage.getItem("token")

useEffect(() => {
    if(getToken){

        if(getToken){
            let {id} = jwtDecode(getToken)
            setDecodeToken(id)
        }
    }
}, [])

 return <tokenContext.Provider value={{token, setToken,decodeToken}}>
 {props.children}
 </tokenContext.Provider>
}