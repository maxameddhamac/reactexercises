import { useState } from "react";

export default function CartApp() {
  const [totalItems, setTotalItems] = useState(0);

  const products = [
    { id: 1, name: "Widget", price: 19.99 },
    { id: 2, name: "Gadget", price: 29.99 },
  ];

  const handleAddToCart = () => {
    setTotalItems((prevCount) => prevCount + 1);
  };

  return (
    <div className="p-8 font-serif">
      {products.map((product) => (
        <div key={product.id} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl mb-3">Price: ${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1 border border-black rounded bg-gray-100 hover:bg-gray-200 text-base"
          >
            Add to Cart
          </button>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Cart Summary</h2>
        <p className="text-xl">Total Items: {totalItems}</p>
      </div>
    </div>
  );
}
