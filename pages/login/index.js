import {User} from '../../Context'
import React ,{useEffect, useState} from 'react';
import {BsFillEyeSlashFill} from 'react-icons/bs'
import {IoEyeSharp} from 'react-icons/io5'
import { useRouter } from 'next/router';
export default function login(){
    const [form,setForm] =useState({
        email:'',
        password:'',
    })
    const router = useRouter();
    const {user} =User()
    useEffect(()=>{
      if(user){
         router.push('/')
      }else{
        router.push('/login')
      }
    },[user])
    const [disabled,setDisabled] = useState(true);
    const [type,setType] = useState('password')
    const {login} = User();
    const {email,password} =form;
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
           await login(email,password); 
        } catch (error) {
           console.log(error)
        }
       }
       const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleDisable = ()=>{
        if( email.length>0 &&password.length>=8){
           setDisabled(false);
        }else{
            setDisabled(true)
        }
        }
        useEffect(()=>{
            handleDisable();
        },[form])
   
        const hideAndSeePassword =()=>{
            if(type==="password")
            {
             setType("text")
            }else{
            setType("password")
            }
          }
 return(

    <div className='w-full h-screen bg-[#FF6363] flex justify-center items-center'>
    <div className='w-4/5 mx-auto h-3/5 bg-[#FAF5E4] rounded-lg shadow-xl'>
      <div className='w-4/5 mx-auto h-14'>
        <h1 className='font-poppins font-bold text-lg text-center pt-5 text-[#323232]'>Login</h1>
      </div>
      <div className='w-4/5 mx-auto h-3/5 flex flex-col '>
        <form onSubmit={handleSubmit} autoComplete="off">
        <div className='w-full h-1/5 mt-5 '>
        <label className='font-poppins mb-2'>Email</label>
          <input className='w-full font-poppins py-2 rounded-lg bg-black text-white' name='email' onChange={(e)=>handleChange(e)}/>
        </div>
        <div className='w-full h-1/5 mt-10 relative'>
        <label className='font-poppins mb-2'>Password</label>
          <input className='w-full font-poppins py-2 rounded-lg bg-black  text-white'name='password' type={type} onChange={(e)=>handleChange(e)}/>
          <button type='button' onClick={()=>hideAndSeePassword()} className='absolute right-3 top-10 text-white  '>{type === 'password' ? <IoEyeSharp/> :<BsFillEyeSlashFill/> }</button>
        </div>
        <div className='w-full h-1/5 mt-10 '>
             <button  type='submit'className={`block w-full  text-center ${disabled? 'bg-black text-white opacity-50 cursor-not-allowed'  : 'bg-black text-white opacity-100'} py-2 rounded-lg `}disabled={disabled}>Register</button>
        </div>
        </form>  
      </div>
    </div>
   </div>
 )
}