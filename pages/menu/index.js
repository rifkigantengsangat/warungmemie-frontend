import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { User } from "../../Context";

export default function Menu({ datas }) {
  const router = useRouter();
  const {setCart,cart}= User();
  const api = 'http://localhost:8000/api/menu';
  const fetcher = url=> axios.get(url).then(response=>response.data);
  const {data,error} = useSWR(api,fetcher);
  if(error)return error;
  const addToChart =(menu)=>{
    let newCart;
   const alredyInCart = cart.find((item)=> item.id === menu.id);
     if(alredyInCart){
      newCart = cart.map((item)=>{
        if(item.id === alredyInCart.id){
          return{
            ...item,
            quantity : quantity + 1
          };
        }
        return item;
      });
      setCart(newCart);
     }
     setCart([...cart,item]);
  }
  
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
       <div className=''>
         <button onClick={()=>addToChart(menu)}>Add</button>
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
