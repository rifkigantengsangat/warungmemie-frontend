import {useContext,useState,createContext,useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
const authContext = createContext();
export const Provider = ({children})=>{
    const [token,setToken] = useState(null)
    const [user,setUser] = useState('');
    const [disabled,setDisabled] =useState(true);
    const [identity,setIdentity] = useState([])
    const [data,setData] = useState([])
    const [cart,setCart] = useState([])

    const router = useRouter()
const register =async(name,email,password)=>{
const response = await axios.post('http://localhost:8000/api/auth/register',{
    name: name,
    email: email,
    password: password
})

 if(response.status=== 201){
    router.push('/login')
 }else{
    return false
 }
}
const login =  async(email, password) =>{
await axios.get('http://localhost:8000/sanctum/csrf-cookie',{withCredentials:true})
   const response =  await axios.post('http://localhost:8000/api/auth/login',{
        email: email,
        password: password
    })
    if(response.status === 200 && token===null){
        setToken(response?.data?.token)
        setIdentity(response?.data);
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
        window.localStorage.clear();
          router.push('/register')
        }else{
            return false;
        }
      } catch (error) {
        console.log(error)
      }
}
const handleDisable = (name,email,password)=>{
if(name.length>0 &&email.length>0 &&password.length>=8){
   setDisabled(false);
}else{
    setDisabled(true)
}
}

useEffect(() => {
    if (typeof window !== "undefined"){
        if (window.localStorage.getItem("token")) { 
     const datas =window.localStorage.getItem("token")
     const identitas = JSON.parse(window.localStorage.getItem("identity"))
     
         setUser(datas)
         setData(identitas)
     
        }
    }
 }, []);
 useEffect(()=>{
    if (typeof window !== "undefined"){
        if(token!==null){
            window.localStorage.setItem('token',token);  
            window.localStorage.setItem('identity',JSON.stringify(identity))
            window.localStorage.setItem('chart',JSON.stringify(chart))
        }    
    
    }
},[token,identity])
return(
    <authContext.Provider value={{register,login,user,Logout,handleDisable,disabled,data,setCart,cart}}>
        {children}
    </authContext.Provider>
)
}
export const User = ()=>{
    return useContext(authContext);
};