import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart/myCart"
        );

        const ans = response.data.cartItems;
        let allProducts = [];

        ans.forEach((item) => {
          allProducts = [...allProducts, ...item.products];
        });

        setCartItems(allProducts);
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="bg-custom-dark-blue min-h-screen flex flex-wrap gap-2 border border-red-500 justify-center items-center">
      {cartItems.map((product) => (
        <div
          className="w-[70%] md:w-80 p-4 rounded shadow flex flex-wrap  transition transform hover:scale-105 bg-white border border-red-500 h-fit"
          key={product._id}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          <div className="flex flex-col justify-between  bg-white">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <div className="flex flex-col">
              <button className=" bg-green-400 text-white rounded justify-center items-center p-2">
                <p className="text-lg font-semibold">${product.price}</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
