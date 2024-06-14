import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ visible: false, message: "" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);

      navigate("/home", { state: { loginDetail: email } });
    } catch (error) {
      setAlert({ visible: true, message: ":( Invalid Credentials" });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient">
      {alert.visible && (
        <div className="absolute top-4 bg-red-500 text-white p-4 rounded shadow-md">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4 bg-white font-bold underline flex justify-center items-center">
          Login
        </h1>
        <div>
          <label className="bg-white">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your E-mail"
            className="w-full p-2 border rounded mb-4 bg-white outline-none"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full p-2 border rounded mb-4 bg-white outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded "
        >
          Login
        </button>
      </form>

      <p className="text-white flex justify-center items-center gap-2">
        Don't have an account?{" "}
        <span>
          <button
            onClick={handleRegister}
            className=" pt-1.5 pb-1.5 px-4 bg-black text-white flex justify-center items-center rounded text-center"
          >
            Register
          </button>
        </span>
      </p>
    </div>
  );
};

export default Login;
