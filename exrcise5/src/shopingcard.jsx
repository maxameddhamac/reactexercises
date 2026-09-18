import { useState } from "react";

const ShoppingCart = () => {
  // 1. Initial State for Cart Items
  const [cart, setCart] = useState([
    { id: 1, name: "Shirt", price: 15, quantity: 1 },
    { id: 2, name: "Pants", price: 25, quantity: 2 },
  ]);

  // State for Input Fields
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  // 2. Add New Product (Immutable Update)
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !priceInput || Number(priceInput) <= 0) return;

    const newProduct = {
      id: crypto.randomUUID(),
      name: nameInput.trim(),
      price: parseFloat(priceInput),
      quantity: 1,
    };

    setCart([...cart, newProduct]);
    setNameInput("");
    setPriceInput("");
  };

  // 3. Update Quantity (Increase / Decrease)
  const handleIncrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // 4. Remove Product
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 5. Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Shopping Cart</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "80px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Add to Cart
        </button>
      </form>

      {/* Product List */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <div>
                <strong>{item.name}</strong> - ${item.price} x {item.quantity}
              </div>

              <div>
                <button
                  onClick={() => handleDecrease(item.id)}
                  disabled={item.quantity <= 1}
                  style={{ marginRight: "5px" }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item.id)}
                  style={{ marginLeft: "5px", marginRight: "10px" }}
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.id)}
                  style={{ color: "red" }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Total Price Display */}
      <h3 style={{ marginTop: "20px" }}>
        Total Price: ${totalPrice.toFixed(2)}
      </h3>
    </div>
  );
};

export default ShoppingCart;
