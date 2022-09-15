import react, { useState, useEffect } from "react";
import {User} from '../../Context'
export default function Pesanan() {
  const [cart, setCart] = useState([]);
  const {user} = User();
  useEffect(() => {
    if (window.localStorage.getItem("cart")) {
      const JsonParsing = JSON.parse(window.localStorage.getItem("cart"));
      setCart(JsonParsing);
    }
  }, []);
  const handleMinus = (carts) => {
    console.log(carts.qty);
  };

  const handleTotal = cart.reduce((acc, item) => {
    return acc + item.qty * Number(item.harga);
  }, 0);

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((carts, index) => {
          return (
            <div key={index}>
              <p>{carts.nama}</p>
              <p>{carts.qty}</p>
              <button onClick={() => handleMinus(carts)}>+</button>
            </div>
          );
        })
      ) : (
        <div>Cart Tidak Ada</div>
      )}
      <h1> Biaya Yang Perlu Dibayar adalah{handleTotal}</h1>
      <div>
        <button>{!user ? 'anda Wajib Login' : 'checkOut Sekrang'}</button>
      </div>
    </div>
  );
}
