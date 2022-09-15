import { useEffect, useState } from "react";
import { User } from "../Context";
import Image from "next/image";
import HomeBottom from "./HomeBottom";
import { formatRupiah } from "../utils/FormatRp";
export default function HomeTop({ datas }) {
  const [date, setDate] = useState("");
  const { data, Logout, user } = User();
  const logout = async () => {
    await Logout();
  };
 
  function getTime() {
    const time = new Date();
    const hr = time.getHours();
    if (hr >= 0 && hr < 12) {
      setDate("Selamat Pagi");
    } else if (hr >= 12 && hr <= 15) {
      setDate("Selamat Siang");
    } else if (hr > 15 && hr < 18) {
      setDate("Selamat Sore");
    } else {
      setDate("Selamat Malam");
    }
  }
  useEffect(() => {
    getTime();
  }, [date, data]);
  return (
    <div className="h-14 w-full  ">
      <div className="w-11/12 mx-auto  h-12 pt-10 flex justify-start items-center">
        <h1 className="text-black font-bold font-poppins text-sm ">
          {` Hi ${date} ${data?.data?.name} `}
          <span>&#128075;</span>
        </h1>
      </div>
      <div className="h-24 w-full flex justify-center items-center">
        <h1 className="font-poppins font-bold">
          Selamat Datang Di Warung Memie
        </h1>
      </div>

      <div className="flex w-full overflow-x-auto flex-row h-48 gap-5 mx-4">
        {datas?.map((data, index) => (
          <div className=" flex-shrink-0 w-56 h-11/12 relative " key={index}>
            <Image
              src={data?.images?.url}
              className="rounded-lg"
              height={150}
              width={200}
            />
            <div className="flex justify-around ">
              <div>
                <h1 className='text-poppins font-bold'>{data?.nama}</h1>
              </div>
              <div>
                <h1>{formatRupiah(data?.harga)}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HomeBottom/>
    </div>
  );
}
