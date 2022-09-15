import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { User } from "../../Context";
import { useEffect } from "react";
import { formatRupiah } from "../../utils/FormatRp";
export default function Menu({ datas }) {
  const router = useRouter();
  const {setCart,cart}= User();
  const api = 'http://localhost:8000/api/menu';
  const fetcher = url=> axios.get(url).then(response=>response.data);
  const {data,error} = useSWR(api,fetcher);
  if(error)return error;
  const addToChart =(menu)=>{
    toast.success(`${menu.nama} telah Di tambahkan Ke Keranjang`,{
      position:"bottom-right",
    })
    setCart(
      cart=> cart.some(item => item.id === menu.id)
        ? cart.map(item => item.id === menu.id
            ? { ...item, qty: item.qty + 1 } 
            : item 
          )
        : [ ...cart,{...menu,qty: menu.qty =1} ]
    )
  }
 useEffect(() => {
  if(window !== undefined) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }
 },[cart])
  return (
    <div className="w-full h-[1400px] bg-[#EEF2FF] px-4">
      <div className=" w-full h-20 pt-10">
        <div className="w-full text-center  h-12  ">
          <h1 className="font-bold font-poppins text-lg">
            Menu-Menu Dapoer Memie
          </h1>
        </div>
      </div>
      <div className="w-full h-8 mt-2">
        <h1 className="font-poppins font-semibold">Categori Menu </h1>
      </div>
      <div className="w-full h-20 flex justify-between">
        {datas?.map((category,index)=>(
          <div className='w-24 h-12 bg-white shadow-md rounded-lg cursor-pointer' onClick={()=>router.push(`/menu/category/${category.slug}`)} key={index}>
          <div className='flex justify-center items-center h-full'>
            <h1 className='font-semibold font-poppins text-sm'>{category.name_category}</h1>
          </div>
          </div>
        ))}
      </div>
      <div className='w-full h-4/5'>
        <div className='w-full h-10'>
        <h1 className="font-poppins font-semibold">Semua Menu</h1>
        </div>
    <div className="flex flex-col">
     {data?.data?.map((menu,index)=>(
      <div key={index} className='w-11/12 mx-auto h-72 bg-white shadow lg rounded-lg my-2 overflow-hidden'>
       <div className='w-full h-4/6 relative '>
        <Image className='w-full h-full' src={menu?.images?.url}
        layout='fill'
        
        />
       </div>
       <div className='w-full h-24 mt-4 '>
         <div className='w-full flex justify-between px-5'>
          <div>
            <h1>{menu?.nama}</h1>
          </div>
          <div>
            <h1>{formatRupiah(menu?.harga)}</h1>
          </div>
         </div>
         <div>
          <button className='w-11/12 mx-auto block text-center px-3 py-2  rounded-lg  bg-gray-200' onClick={()=>addToChart(menu)}>Tambahkan Ke Keranjang</button>
          <ToastContainer/>
         </div>
       </div>
      </div>
     ))}
    </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8000/api/category");
   const datas = response.data
  return {
    props: { datas },
  };
}
