import {useContext,useState,createContext,useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
const authContext = createContext();
export const Provider = ({children})=>{
    const [token,setToken] = useState('')
    const [user,setUser] = useState('');
    const router = useRouter()
const register =async(name,email,password)=>{
const response = await axios.post('http://localhost:8000/api/auth/register',{
    name: name,
    email: email,
    password: password
})
console.log(response);

 if(response.status=== 201){
    
 }
}
const login = async (email, password) =>{
    const response = await axios.post('http://localhost:8000/api/auth/login',{
        email: email,
        password: password
    })
    console.log(response)
    setToken(response.data.token)
    if(response.status == 200){
      
    }

}
useEffect(()=>{
    if (typeof window !== "undefined"){
        window.localStorage.setItem('token',token);  
    }
},[token])
useEffect(() => {
    if (window.localStorage.getItem("token")) { 
      const Json =  window.localStorage.getItem("token")
      setUser(Json);
    }else{
        console.log("User not found")
    }
 }, []);
return(
    <authContext.Provider value={{register,login,user}}>
        {children}
    </authContext.Provider>
)
}
export const User = ()=>{
    return useContext(authContext);
};