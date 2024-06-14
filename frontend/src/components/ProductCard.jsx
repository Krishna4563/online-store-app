import axios from "axios";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      products: [
        {
          imageUrl: product.image,
          name: product.title,
          price: product.price,
          quantity: 1,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        data,
        config
      );
      console.log("Adding product to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="w-[70%] md:w-80 border p-4 rounded shadow flex flex-col bg-white transition transform hover:scale-105">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="flex flex-col justify-between h-full bg-white">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <div className="flex flex-col">
          <button className=" bg-green-400 text-white rounded justify-center items-center p-2">
            <p className="text-lg font-semibold">${product.price}</p>
          </button>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
