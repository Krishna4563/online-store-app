import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart/myCart"
        );
        console.log("Response from server:", response.data); // Check response data

        const { cartItems } = response.data;
        console.log("Cart items:", cartItems); // Verify cartItems structure

        let allProducts = [];

        if (Array.isArray(cartItems)) {
          cartItems.forEach((item) => {
            if (Array.isArray(item.products)) {
              allProducts = [...allProducts, ...item.products];
            }
          });
        }

        console.log("All products:", allProducts); // Check final allProducts array

        setCartItems(allProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items. Please try again later.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Optional: Display error message
  }

  return (
    <div className="bg-custom-dark-blue min-h-screen flex flex-wrap gap-2 border border-red-500 justify-center items-center">
      {cartItems.length === 0 ? (
        <div>No items in the cart.</div>
      ) : (
        cartItems.map((product) => (
          <div
            className="w-[70%] md:w-80 p-4 rounded shadow flex flex-wrap transition transform hover:scale-105 bg-white border border-red-500 h-fit"
            key={product._id}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="flex flex-col justify-between bg-white">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <div className="flex flex-col">
                <button className="bg-green-400 text-white rounded justify-center items-center p-2">
                  <p className="text-lg font-semibold">${product.price}</p>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
