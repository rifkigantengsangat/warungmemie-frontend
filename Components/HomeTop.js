import { useEffect, useState } from "react";
import { User } from "../Context";

export default function HomeTop() {
  const [date, setDate] = useState("");
  const { data, Logout } = User();
  const logout = async () => {
    await Logout();
  };
  function getTime() {
    const time = new Date();
    const hr = time.getHours();
    if (hr >= 0 && hr < 12) {
      setDate("Selamat Pagi");
    }else if(hr>12 && hr<=15){
      setDate("Selamat Siang")
    } else if ( hr > 15 &&hr<18) {
      setDate("Selamat Sore");
    } else {
      setDate("Selamat Malam");
    }
  }
  useEffect(() => {
    getTime();
  }, [date]);
  return (
    <div className="h-14 w-full">
        <h1>{`Hi ${data?.data?.name} ${date}`}</h1>
    </div>
  );
}
