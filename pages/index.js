import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {User} from '../AuthContext/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import axios from 'axios'
export default function Home() {
  const router = useRouter();
  const {user,Logout} = User();
  console.log(user)
useEffect(()=>{
  if(!user){
    console.log('Please select a user')
  }else{
    console.log('anda User')
  }
},[user])
const logout=async()=>{
  await Logout();

}

  return (
  <div>
    <button onClick={()=>logout()}>Logout</button>
  </div>
  )
}
