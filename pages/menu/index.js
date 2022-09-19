import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { User } from "../../Context";
import { useEffect } from "react";
import { formatRupiah } from "../../utils/FormatRp";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BiDrink } from "react-icons/bi";
import { GiNoodles } from "react-icons/gi";
export default function Menu({ datas }) {
  const router = useRouter();
  const { setCart, cart } = User();
  const api = "http://127.0.0.1:8000/api/menu";
  const fetcher = (url) => axios.get(url).then((response) => response.data);
  const { data, error } = useSWR(api, fetcher);
  if (error) return error;
  const addToChart = (menu) => {
    toast.success(`${menu.nama} telah Di tambahkan Ke Keranjang`, {
      position: "top-right",
      className: "w-11/12 h-10 absolute mx-auto text-md font-poppins",
      type:'default',
      pauseOnHover: false,
      closeOnClick:true,
      autoClose:1000,
    });
    setCart((cart) =>
      cart.some((item) => item.id === menu.id)
        ? cart.map((item) =>
            item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...cart, { ...menu, qty: (menu.qty = 1) }]
    );
  };
  useEffect(() => {
    if (window !== undefined) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  return (
    <div className="w-full bg-[#DAE2EE] h-screen px-2">
      <div className="w-11/12 mx-auto flex  items-center pt-4 text-[#000000]">
        <div>
          <span className="font-[20px] text-black text-[18px]">
            <HiOutlineMenuAlt2 />
          </span>
        </div>
        <div className="w-full">
          <span className="text-center block font-poppins text-[20px] font-medium ">
            Waroeng Memie
          </span>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex justify-between  my-8">
        {datas?.map((category,index) => {
          return (
            <div
              className="flex items-center justify-center w-24 bg-[#E7ECEE] h-12 rounded-md shadow-md" key={index}
              onClick={() => router.push("/menu/category/" + category?.slug)}
            >
              <div className="mr-2">
                <h1 className="text-md">
                  {category.slug === "mie" ? (
                    <GiNoodles />
                  ) : category.slug === "pangsit" ? (
                    <MdFastfood />
                  ) : (
                    <BiDrink />
                  )}
                </h1>
              </div>
              <div className="">
                <h1 className="font-poppins text-black font-medium text-sm">
                  {category.name_category}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className='h-[600px]'>
      <div className='mt-8 flex flex-row flex-wrap w-full gap-4 '>
      {data?.data?.map((menu,index)=>{
        return(
          <div className='w-44 bg-[#E7ECEE] h-[245px] rounded-md shadow-md ' key={index}>
           <div className='w-11/12 mx-auto h-32 rounded-md mt-2 relative'>
            <Image src={menu?.images?.url} layout='fill' className='rounded-md'/>
           </div>
            <div className ='flex-col flex mt-2 w-11/12 mx-auto'>
            <div className=''>
             <h1 className='font-poppins font-semibold '>{menu?.nama}</h1>
            </div>
            <div className=''>
             <h1 className='font-poppins font-mediun text-[11px] '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </h1>
            </div>
            <div className='flex justify-between mt-3 '>
              <h1 className ='font-poppins font-semibold'>{formatRupiah(menu.harga)}</h1>
             <div className='w-[80px] rounded-md  items-center  bg-[#FF1F00] flex cursor-pointer text-white' onClick={() =>addToChart(menu)} >
              <h1 className='px-2'><AiOutlineShoppingCart/></h1>
              <h1 className='font-poppins font-light text-sm'>Order</h1>
              <ToastContainer/>
             </div>
            </div>
            </div>
          </div>
        )
      })}

      </div>
      </div>
   
    </div>
   
  );
}
export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:8000/api/category");
  const datas = response.data;
  return {
    props: { datas },
  };
}
