import {User} from '../../AuthContext/AuthContext'
import React ,{useState} from 'react';
export default function Register(){
    const {register,login} = User();

    const [form,setForm] =useState({
        name:'',
        email:'',
        password:'',
    })
    const {name,email,password} = form;
    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit =async(e)=>{
     e.preventDefault()
     try {
        await register(name,email,password); 
     } catch (error) {
        console.log(error)
     }
    }
    const handleSubmit2 =async(e)=>{
        e.preventDefault()
        try {
           await login(email,password); 
        } catch (error) {
           console.log(error)
        }
       }
   

    return(
        <div className='bg-black w-full h-32'>
           <form onSubmit={handleSubmit}>
            <input name='name' onChange={(e)=>handleChange(e)} className='mx-2'/>
            <input name='email' onChange={(e)=>handleChange(e)} className='mx-2'/>
            <input name='password' onChange={(e)=>handleChange(e)} className='mx-2'/>
            <button type='submit' className='bg-white'>register</button>
            </form> 
            <form onSubmit={handleSubmit2}>
            <input name='email' onChange={(e)=>handleChange(e)} className='mx-2'/>
            <input name='password' onChange={(e)=>handleChange(e)} className='mx-2'/>
            <button type='submit' className='bg-white'>login</button>
            </form> 
        </div>
    )
}