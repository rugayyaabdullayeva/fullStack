const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
const { Schema } = mongoose;

const userSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

// Add New User
app.post("/users", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const user = new User({
      title,
      description,
      image,
    });
    user.save();
    res.status(201).json({ message: "success", data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get User By Id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


const PORT = process.env.PORT;
const DB = process.env.DB_URL;
mongoose.connect(DB).then(() => console.log("Connected!"));

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});