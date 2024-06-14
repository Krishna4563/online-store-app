//Mom

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const dotenv = require("dotenv").config();
const { connectDB } = require("../backend/config/db");

const PORT = process.env.PORT || 5000;
connectDB();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

//routing

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/cart", require("./routes/cartRoute"));

//final api endpoint looks like this :- https://localhost:5000/api/user/register

app.listen(PORT, (req, res) => {
  console.log(`App running on PORT ${PORT}`);
});
