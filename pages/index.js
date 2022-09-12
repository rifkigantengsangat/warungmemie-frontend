import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import {User} from '../Context'
import axios from 'axios'
import Homes from '../Components/Homes';
import Navbar from '../Components/Navbar';
export default function Home({datas}) {

  const router = useRouter();
  const {user,Logout} = User();

const logout=async()=>{
  await Logout();

}

  return (
  <>
  <Navbar/>
  <Homes datas={datas}/>
  </>
  )
  
}
export async function getServerSideProps(){
  const {data} = await axios.get('http://localhost:8000/api/menu');
   const datas = data.data
  return{
    props: {datas}
  }
}

