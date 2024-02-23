import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export let tokenContext = createContext();


export default function TokenContextProvider(props){
 let [token, setToken] = useState(null);
 let [decodeToken, setDecodeToken] = useState(null);
 let [userToken, setUserToken] = useState(null);
 let getToken = localStorage.getItem("token")

useEffect(() => {
    if(getToken){

        if(getToken){
            let {id,name,role} = jwtDecode(getToken)
            setDecodeToken(id)
            setUserToken(name)
            console.log(id,name,role)
        }
    }
}, [])

 return <tokenContext.Provider value={{token, setToken,decodeToken,userToken}}>
 {props.children}
 </tokenContext.Provider>
}