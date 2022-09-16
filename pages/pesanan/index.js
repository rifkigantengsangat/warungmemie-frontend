import react, { useState, useEffect } from "react";
import {User} from '../../Context'
export default function Pesanan() {
  const [carts, setCarts] = useState([]);
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

  return (
    <div>
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
        <div>Cart Tidak Ada</div>
      )}
      <h1> Biaya Yang Perlu Dibayar adalah{handleTotal}</h1>
      <div>
        <button>{!user ? 'anda Wajib Login' : 'checkOut Sekrang'}</button>
      </div>
    </div>
  );
}
