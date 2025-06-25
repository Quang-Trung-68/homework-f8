import { useCallback, useState } from "react";
import CartItem from "./CartItem.jsx";
const initCart = [
  { id: 1, name: "Áo thun", quantity: 1 },
  { id: 2, name: "Quần jeans", quantity: 2 },
  { id: 3, name: "Nón lưỡi trai", quantity: 1 },
];
function CartUI() {
  const [dataCarts, setDataCarts] = useState(initCart);

  const onIncrease = useCallback((id) => {
    console.log("Increase quantity component ",id);
    setDataCarts((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const onDecrease = useCallback((id) => {
    console.log("Decrease quantity component ",id);
    setDataCarts((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const onRemove = useCallback((id) => {
    console.log("Remove component ",id);
    setDataCarts((prevCart) => [...prevCart].filter((item) => item.id !== id));
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>🛒 Giỏ hàng</h2>
      {dataCarts.length > 0 ? dataCarts.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove = {onRemove}
        />
      )) : "Giỏ hàng của bạn đang trống!"}
    </div>
  );
}

export default CartUI;
