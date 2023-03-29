import { useState } from "react";

export default function Shopping() {

  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, qty, price };
    setCartItems([...cartItems, newItem]);
  }

  const handleIncrease = (index) => {
    const newItems = [...cartItems];
    newItems[index].qty++;
    setCartItems(newItems);
  }

  const handleDecrease = (index) => {
    const newItems = [...cartItems];
    if (newItems[index].qty > 1) {
      newItems[index].qty--;
      setCartItems(newItems);
    }
  }

  const handleRemoveItem = (index) => {
    const itemToRemove = cartItems[index];
    setCartItems(cartItems.filter((item) => item !== itemToRemove));
  }

  const totalBill = () => {
    let total = 0;
    for (let item of cartItems) {
      total += item.qty * item.price;
    }
    return total;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="name" value={cartItems.name} onChange={(e)=>setName(e.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="number" name="qty" value={cartItems.qty} onChange={(e)=>setQty(parseInt(e.target.value))} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={cartItems.price} onChange={(e)=>setPrice(parseInt(e.target.value))} />
        </label>
        <button type="submit">Add to Cart</button>
      </form>
      <div>
        <h2>Cart Items</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
             {item.name} Rs. {item.price}  
              <button onClick={() => handleDecrease(index)}>-</button>
               {item.qty} 
              <button onClick={() => handleIncrease(index)}>+</button>
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </li>
          ))}
        </ul>
        Total: Rs. {totalBill()}
      </div>
    </div>
  );
  }