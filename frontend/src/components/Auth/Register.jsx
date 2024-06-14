import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
      if (password !== rePassword) {
        setAlert({ visible: true, message: error.response.data.msg });
      }

      const res = await axios.post("http://localhost:5000/api/user/register", {
        username,
        email,
        password,
        rePassword,
      });
      localStorage.setItem("token", res.data.token);
      // setIsAuthenticated(true);
      navigate("/login");
    } catch (error) {
      setAlert({ visible: true, message: ":( Invalid Credentials" });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient p-4">
      {alert.visible && (
        <div className="absolute top-4 bg-red-500 text-white p-4 rounded shadow-md">
          {alert.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md flex flex-col"
      >
        <h1 className="text-2xl mb-4 font-bold underline flex justify-center items-center">
          Register
        </h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
            className="w-full p-2 border rounded mb-4 outline-none"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your E-mail"
            className="w-full p-2 border rounded mb-4 outline-none"
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
            className="w-full p-2 border rounded mb-4 outline-none"
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={rePassword}
            required
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Confirm Your Password"
            className="w-full p-2 border rounded mb-4 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>

      <p className=" text-white flex justify-center items-center gap-2">
        Already have an account?{" "}
        <span>
          <button
            onClick={handleLogin}
            className=" pt-1.5 pb-1.5 px-4 bg-black text-white flex justify-center items-center rounded text-center"
          >
            Log In
          </button>
        </span>
      </p>
    </div>
  );
};

export default Register;
