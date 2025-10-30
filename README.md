# 🛒 E-Commerce Cart Application

A full-stack e-commerce shopping cart application built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- 🎨 Modern, responsive UI with React 18  
- 🛍️ Product catalog with images and descriptions  
- 💰 Discount system (percentage & flat discounts)  
- 🛒 Shopping cart with real-time updates  
- 📦 Stock management and inventory tracking  
- 🚚 Smart delivery charges (Free shipping above ₹500)  
- ✅ Order processing and confirmation  
- 📱 Mobile-friendly responsive design  

---

## 🚀 Quick Start (Manual Setup)

### Prerequisites

- **Node.js** (v18 or higher)  
- **MongoDB** (running locally or on a remote server like MongoDB Atlas)  
- **npm** (Node Package Manager)

---

### 🧩 Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-cart
   ```

2. **Create `.env` files**  
   Create `.env` files in both `backend` and `frontend` directories as shown in their respective `.env.example` files.

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run seed
   npm run start
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

5. **Access the Application**
   - 🌐 Frontend: http://localhost:3000  
   - 🔧 Backend API: http://localhost:5000  
   - 📊 API Health: http://localhost:5000/health

---

## 📊 Sample Data

The application comes pre-loaded with 8 sample products including:
- Wireless Headphones (15% off)
- Smart Watch (₹30 off)
- Bluetooth Speaker (20% off)
- Mechanical Keyboard (₹20 off)
- And more...

---

## 🔍 API Endpoints

### Products
- `GET /api/products` - Get all products  
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart?userId=guest` - Get cart  
- `POST /api/cart` - Add item to cart  
  ```json
  {
    "productId": "product_id",
    "quantity": 1,
    "userId": "guest"
  }
  ```
- `PUT /api/cart/:itemId` - Update cart item quantity  
- `DELETE /api/cart/:itemId?userId=guest` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process order  
  ```json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "cartItems": [...],
    "deliveryCharge": 50,
    "finalTotal": 599.99,
    "userId": "guest"
  }
  ```

---

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│   MongoDB   │
│   (React)   │     │ (Express)   │     │ (Database)  │
│ Port: 3000  │     │ Port: 5000  │     │ Port: 27017 │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 🧱 Technology Stack

**Frontend:**
- React 18
- Context API for state management
- Axios for API calls
- Lucide React for icons
- CSS3 for styling

**Backend:**
- Node.js 18
- Express.js
- Mongoose ODM
- REST API architecture

**Database:**
- MongoDB 7.0

---

## 📂 Project Structure

```
ecommerce-cart/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   └── productRoutes.js
│   ├── seeders/
│   │   └── productSeeder.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── .env.example
└── README.md
```

---

## 🔐 Security Notes

**For Development:**
- Default credentials are fine for local testing

**For Production:**
1. Change MongoDB credentials in `.env`
2. Use strong passwords (min 12 characters, mixed case, numbers, symbols)
3. Don’t commit `.env` files to version control
4. Use environment-specific configurations
5. Enable HTTPS/SSL
6. Configure CORS properly
7. Add rate limiting
8. Implement authentication/authorization

---

## 📄 License

MIT License — Feel free to use this project for learning or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues or questions:  
- Create a GitHub issue  
- Contact: support@yourapp.com

---

**Made with ❤️ using React, Node.js, and MongoDB**  

**Happy Shopping! 🛍️**
