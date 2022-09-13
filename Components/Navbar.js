import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import Link from "../utils/Link";
import {IoFastFoodOutline} from 'react-icons/io5'
import {BsBasket} from 'react-icons/bs'
const Navbar = () => {
  const router = useRouter();
  
const pathname = router.pathname;
  return (
    <div className="w-11/12 mx-auto h-14 bg-black fixed bottom-3 left-0 right-0 z-10 rounded-full shadow-xl">
      <div className="flex flex-row w-5/6 mx-auto items-center my-1 h-4/5 gap-4 justify-around">
        <div className={` ${pathname ==='/menu'? 'w-14 h-14 bg-gray-300': ''} rounded-full flex justify-center items-center `}>
          <Link href={"/menu"}>
            <div>
              <IoFastFoodOutline className={`${pathname ==='/menu' ? 'text-white text-lg' : 'text-gray-700 text-xl'} transition-opacity duration-700`}/>
            </div>
          </Link>
        </div>
        <div className={` ${pathname ==='/'? 'w-14 h-14 bg-gray-300': ''} rounded-full flex justify-center items-center `}>
          <Link href={"/"}>
            <div>
              < AiFillHome className={`${pathname ==='/' ? 'text-white text-lg' : 'text-gray-700 text-xl'} transition-opacity duration-700`} />
            </div>
          </Link>
        </div>
        <div className={` ${pathname ==='/pesanan'? 'w-14 h-14 bg-gray-300': ''} rounded-full flex justify-center items-center `}>
          <Link href={"/pesanan"}>
            <div>
              <BsBasket className={`${pathname ==='/pesanan' ? 'text-white text-lg' : 'text-gray-700 text-xl'} transition-opacity duration-700`} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
