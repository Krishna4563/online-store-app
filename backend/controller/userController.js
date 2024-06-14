//register, login, getUsers;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser || password !== rePassword) {
      res
        .status(403)
        .json({ message: "User Already Exists/Invalid Credentials!" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const payload = { user: { id: newUser.id } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ message: "New User created successfully !", token });
    });
  } catch (err) {
    res.status(403).json({ message: "Error in Registering!", err });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Error while Login!" });
    }

    if (user.password !== password) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ message: "Logged in Successfully !", token });
    });
  } catch (err) {
    res.status(403).json({ message: "Error while Login!", err });
  }
};

module.exports = {
  Register,
  Login,
};
