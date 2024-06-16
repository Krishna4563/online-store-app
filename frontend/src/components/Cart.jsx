import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart/myCart"
        );
        console.log("Response from server:", response.data);

        const { cartItems } = response.data;
        console.log("Cart items:", cartItems);

        // let allProducts = [];

        // if (Array.isArray(cartItems)) {
        //   cartItems.forEach((item) => {
        //     if (Array.isArray(item.products)) {
        //       allProducts = [...allProducts, ...item.products];
        //     }
        //   });
        // }

        // console.log("All products:", allProducts);

        setCartItems(cartItems);
        setTotalAmount(response.data.totalAmount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items / Cart Empty !");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleOnClick = () => {
    navigate("/home");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRemoveToCart = () => {
    console.log("Removed from cart");
  };

  return (
    <div className="bg-custom-dark-blue min-h-screen flex flex-col flex-wrap gap-2  justify-center  p-6  ">
      <div
        className=" flex top-1 left-1 justify-start mb-10 font-bold text-cyan-300 gap-2 items-center hover:cursor-pointer"
        onClick={handleOnClick}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        Home
      </div>

      {cartItems.length === 0 ? (
        <div>No items in the cart.</div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {cartItems.map((product) => (
            <div
              className="w-[100%] md:w-[80%] p-4 rounded shadow transition transform hover:scale-105 bg-white  min-h-96 flex flex-wrap m-auto border border-red-500"
              key={product._id}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="flex flex-col justify-between bg-white  w-full">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="flex flex-col">
                  <button className="bg-green-400 text-white rounded justify-center items-center p-2">
                    <p className="text-lg font-semibold">${product.price}</p>
                  </button>
                </div>
              </div>
              <div className="w-full">
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
                  onClick={handleRemoveToCart}
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className=" mt-4 bg-white w-[90%] md:w-[30%] flex flex-col justify-center items-center m-auto p-6 rounded">
        <h1 className=" mb-4 font-bold">Checkout</h1>

        <div className=" flex justify-between w-full">
          <p>Total items purchased:</p>
          <p className=" font-bold">{cartItems.length}</p>
        </div>
        <div className=" flex justify-between w-full">
          <p>Total Amount:</p>
          <p className=" font-bold">${totalAmount}</p>
        </div>

        <div className=" border border-b-1 border-black w-full mt-3"></div>

        <div className=" flex justify-between w-full mt-4">
          <p>Total amount to be paid:</p>
          <p className=" font-bold">${totalAmount}</p>
        </div>

        <button className="bg-green-400 text-white rounded justify-center items-center p-2 mt-6">
          <p className="text-md font-semibold">Proceed to checkout</p>
        </button>
      </div>
    </div>
  );
};

export default Cart;
