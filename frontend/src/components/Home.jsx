import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import ProductCard from "./productCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        const res = await axios.get(
          "https://fakestoreapi.com/products",
          config
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-custom-dark-blue min-h-screen flex flex-col justify-between items-center ">
      <Navbar />

      <p className=" text-cyan-500 text-2xl font-bold flex">Our Products</p>
      <div className="flex flex-wrap justify-center bg-custom-dark-blue gap-4 w-full p-4 mt-40 md:mt-28">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
