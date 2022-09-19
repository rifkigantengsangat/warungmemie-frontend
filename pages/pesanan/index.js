import axios from "axios";
import react, { useState, useEffect } from "react";
import {User} from '../../Context'
import ModalPesanan from "./ModalPesanan";
export default function Pesanan() {
  const [carts, setCarts] = useState([]);
  const [open,setOpen] = useState(false);
  const [noHp,setNoHp] = useState();
  const [identity,setIdentity] = useState([]);
  const { user} = User();
  useEffect(() => {
    if (window.localStorage.getItem("cart")) {
      const JsonParsing = JSON.parse(window.localStorage.getItem("cart"));
      setCarts(JsonParsing);
    }
  }, []);
  const handlePlus= (menu) => {
    setCarts((cart) =>
    cart.some((item) => item.id === menu.id)
      ? cart.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty += 1 } : item
        )
      : [...cart, { ...menu, qty: (menu.qty = 1) }]
  );
  };
  const handleMinus= (menu) => {
    setCarts((cart) =>
    cart.some((item) => item.id === menu.id)
      ? cart.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty == 0 ? item.qty = 0: item.qty -=1 } : item
        )
      : [...cart, { ...menu, qty: (menu.qty = 1) }]
  );
  };
  const handleTotal = carts.reduce((acc, item) => {
    return acc + item.qty * Number(item.harga);
  }, 0);
  const handleTotalQty = carts.reduce((acc, item) =>{
    return acc = acc +item.qty;
  }, 0)
  console.log(handleTotalQty);
  useEffect(()=>{
     if(window.localStorage.getItem('identity')){
      const JsonParsing = JSON.parse(window.localStorage.getItem('identity'));
      setIdentity(JsonParsing);
     }
  },[])
  const addToCart=async()=>{
    const config = {
      user_id : identity.data.id,
      menu_id : carts_id,
      total_harga : handleTotal,
      jumlah_pesanan : handleTotalQty,
      no_hp :noHp,
    }
    const storingData = await axios.post('http://127.0.0.1:8000/pesanan',config);
    console.log(storingData);

  }



  return (  
    <>
    <div className={`${open? 'blur-sm	':'blur-none' } w-full h-64`}>
      {carts.length > 0 ? (
        carts.map((carts, index) => {
          return (
            <div key={index}>
              <p>{carts.nama}</p>
              <p>{carts.qty}</p>
              <button onClick={() => handlePlus(carts)}>+</button>
              <button onClick={() => handleMinus(carts)}>-</button>

            </div>
          );
        })
      ) : (
        <div>Anda Belum Pesan Apapun</div>
      )}
      <h1> Biaya Yang Perlu Dibayar adalah{handleTotal}</h1>
      <div>
        
  
        
       <button onClick={()=>setOpen(true)}>{!user ? 'anda Wajib Login' : 'checkOut Sekrang'}</button>
      </div>
    </div>
    {open && <ModalPesanan open={open} setOpen={setOpen} addToCart={addToCart}/> }
    </>
  );
}
