import {User} from '../../Context'
import React ,{useState,useEffect} from 'react';
import {BsFillEyeSlashFill} from 'react-icons/bs'
import {IoEyeSharp} from 'react-icons/io5'
export default function Register(){
    const {register,handleDisable,disabled} = User();
    const [form,setForm] =useState({
        name:'',
        email:'',
        password:'',
    })
    const [type,setType] = useState('password')
    const {name,email,password} = form;
    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const hideAndSeePassword =()=>{
        if(type==="password")
        {
         setType("text")
        }else{
        setType("password")
        }
      }
    const handleSubmit =async(e)=>{
     e.preventDefault()
     try {
        await register(name,email,password); 
     } catch (error) {
        
     }
    }
   
   useEffect(() => {
    handleDisable(name,email,password)
   },[form])

    return(
       <div className='w-full h-screen bg-[#FF6363] flex justify-center items-center'>
        <div className='w-4/5 mx-auto h-3/5 bg-[#FAF5E4] rounded-lg shadow-xl'>
          <div className='w-4/5 mx-auto h-14'>
            <h1 className='font-poppins font-bold text-lg text-center pt-5 text-[#323232]'>Register</h1>
          </div>
          <div className='w-4/5 mx-auto h-3/5 flex flex-col '>
            <form onSubmit={handleSubmit} autoComplete="off">
            <div className='w-full h-1/5 mt-8'>
                <label className='font-poppins mb-2'>Username</label>
              <input className='w-full font-poppins py-2 rounded-lg bg-black text-white'name='name'onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='w-full h-1/5 mt-5 '>
            <label className='font-poppins mb-2'>Email</label>
              <input className='w-full font-poppins py-2 rounded-lg bg-black text-white' name='email' onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='w-full h-1/5 mt-5 relative'>
            <label className='font-poppins mb-2'>Password</label>
              <input className='w-full font-poppins py-2 rounded-lg bg-black  text-white'name='password' type={type} onChange={(e)=>handleChange(e)}/>
              <button type='button' onClick={()=>hideAndSeePassword()} className='absolute right-3 top-10 text-white  '>{type === 'password' ? <IoEyeSharp/> :<BsFillEyeSlashFill/> }</button>
            </div>
            <div className='w-full h-1/5 mt-5 '>
                 <button  type='submit'className={`block w-full  text-center ${disabled? 'bg-black text-white opacity-50 cursor-not-allowed'  : 'bg-black text-white opacity-100'} py-2 rounded-lg `}disabled={disabled}>Register</button>
            </div>
            </form>  
          </div>
        </div>
       </div>
    )
}