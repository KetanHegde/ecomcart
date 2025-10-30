const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const connectDB = require("../config/db");

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 899,
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    stock: 3,
    discount: {
      type: "percentage",
      value: 15, // 15% off
    },
  },
  {
    name: "Smart Watch",
    price: 1299,
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
    stock: 30,
    discount: {
      type: "flat",
      value: 30, // ₹30 off
    },
  },
  {
    name: "Laptop Backpack",
    price: 459,
    description: "Water-resistant laptop backpack with USB charging port",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    stock: 2,
    discount: {
      type: "none",
      value: 0,
    },
  },
  {
    name: "Bluetooth Speaker",
    price: 1399,
    description: "Portable waterproof Bluetooth speaker with 360° sound",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300",
    stock: 75,
    discount: {
      type: "none",
      value: 0,
    },
  },
  {
    name: "Mechanical Keyboard",
    price: 399,
    description: "RGB mechanical gaming keyboard with cherry MX switches",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300",
    stock: 4,
    discount: {
      type: "flat",
      value: 20, // ₹20 off
    },
  },
  {
    name: "Wireless Mouse",
    price: 128,
    description: "Ergonomic wireless mouse with adjustable DPI",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
    stock: 120,
    discount: {
      type: "none",
      value: 0,
    },
  },
  {
    name: "Phone Case",
    price: 99,
    description: "Slim protective phone case with military-grade protection",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300",
    stock: 1,
    discount: {
      type: "percentage",
      value: 25, // 25% off
    },
  },
  {
    name: "USB-C Hub",
    price: 149,
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300",
    stock: 60,
    discount: {
      type: "flat",
      value: 10, // ₹10 off
    },
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Data imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ₹{error.message}`);
    process.exit(1);
  }
};

importData();
