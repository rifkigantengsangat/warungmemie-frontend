import { useEffect, useState } from "react";
import { User } from "../Context";
import Image from "next/image";
import HomeBottom from "./HomeBottom";
export default function HomeTop({ datas }) {
  const [date, setDate] = useState("");
  const { data, Logout, user } = User();
  const logout = async () => {
    await Logout();
  };
  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
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
                <h1>{formatRupiah(data?.harga, "Rp")}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HomeBottom/>
    </div>
  );
}
