import {useContext,useState,createContext,useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
const authContext = createContext();
export const Provider = ({children})=>{
    const [token,setToken] = useState(null)
    const [user,setUser] = useState('');

    const router = useRouter()
const register =async(name,email,password)=>{
const response = await axios.post('http://localhost:8000/api/auth/register',{
    name: name,
    email: email,
    password: password
})

 if(response.status=== 201){
    
 }
}
const login =  async(email, password) =>{
await axios.get('http://localhost:8000/sanctum/csrf-cookie',{withCredentials:true})
   const response =  await axios.post('http://localhost:8000/api/auth/login',{
        email: email,
        password: password
    })
    if(response.status === 200){
        setToken(response.data.token)
        router.push('/')
    }else{
        throw error();
    }

}
const Logout =async()=>{
    try {
        axios.defaults.withCredentials = true
        const config = {
          headers: { Authorization: `Bearer ${user}` }
        };
        const response = await axios.post('http://localhost:8000/api/logout',{},
         config
        );
        if(response.status === 200){
          window.localStorage.removeItem("token")
          router.push('/register')
        }
      } catch (error) {
        console.log(error)
      }
}

useEffect(() => {
    if (typeof window !== "undefined"){
        if (window.localStorage.getItem("token")) { 
     const Json =window.localStorage.getItem("token")
      if(Json){
        setUser(Json)
      }
        }
    }
 }, []);
 useEffect(()=>{
    if (typeof window !== "undefined"){
        if(token!==null){
            window.localStorage.setItem('token',token);  
        }else{
            return;
        }
    
    }
},[token])
return(
    <authContext.Provider value={{register,login,user,Logout}}>
        {children}
    </authContext.Provider>
)
}
export const User = ()=>{
    return useContext(authContext);
};