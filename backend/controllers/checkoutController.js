const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Public
exports.processCheckout = async (req, res, next) => {
  try {
    const {
      cartItems,
      customerName,
      customerEmail,
      deliveryCharge = 0,
      finalTotal,
      userId = "guest",
    } = req.body;

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product._id || item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}. Only ${product.stock} available.`,
        });
      }

      // Use discounted price if available
      const itemPrice = product.discountedPrice || product.price;

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: itemPrice,
      });

      subtotal += itemPrice * item.quantity;

      // Reduce stock after order
      product.stock -= item.quantity;
      await product.save();
    }

    const total = subtotal + (deliveryCharge || 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = await Order.create({
      customerName,
      customerEmail,
      items: orderItems,
      total,
      orderNumber,
      status: "confirmed",
    });

    // Clear cart after successful checkout
    await Cart.findOneAndUpdate({ userId }, { items: [], total: 0 });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderNumber: order.orderNumber,
        total: order.total,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge || 0,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        timestamp: order.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
