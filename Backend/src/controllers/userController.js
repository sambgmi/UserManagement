import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};


export const createUser = async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;


    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: "User with this phone number already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      company,
      address
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Create User Error:', error); 

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    if (error.code === 11000) { 
      return res.status(400).json({ 
        message: "Duplicate value error", 
        details: error.keyValue 
      });
    }
    res.status(500).json({ 
      message: "Server Error", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
