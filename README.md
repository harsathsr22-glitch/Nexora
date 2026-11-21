# Nexora 🛍️
### Full Stack E-Commerce Website

Nexora is a full-stack e-commerce web application designed to provide a smooth and user-friendly online shopping experience.

## 🚀 Project Overview

Nexora brings together a shopping interface, product management, order management and backend services in one platform.

## ✨ Features

### Customer Side
- Home page
- Product browsing
- Product details
- Shopping cart
- Wishlist
- User registration and login
- Checkout page

### Admin Side
- Admin dashboard
- Product management
- Order management

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- Bootstrap

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- MongoDB Atlas

**Development Tools**
- Visual Studio Code
- Git
- GitHub

## 📁 Project Structure

```text
Nexora/
│
├── backend/
│   ├── models/
│   │   ├── order.js
│   │   └── products.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── Nexora_Frontend/
│       ├── images/
│       ├── css/
│       ├── js/
│       ├── index.html
│       ├── shopping.html
│       ├── product.html
│       ├── cart.html
│       ├── checkout.html
│       ├── wishlist.html
│       ├── login.html
│       ├── register.html
│       └── admin.html
│
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/harsathsr22-glitch/Nexora.git
```

### 2. Navigate to the Project

```bash
cd Nexora
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder and configure your MongoDB connection string using the variable name expected by `server.js`.

Never share your database credentials publicly.

### 5. Start the Backend Server

```bash
node server.js
```

The backend server runs on:

```text
http://localhost:3000
```

### 6. Run the Frontend

Open the `frontend/Nexora_Frontend` folder in Visual Studio Code and launch `index.html` using Live Server.

## 🎯 Project Goal

To develop a complete e-commerce application while exploring frontend development, backend integration, database management and API communication.

## 👨‍💻 Developer

**Harsath SR**

GitHub: [harsathsr22-glitch](https://github.com/harsathsr22-glitch)

---

*Built with curiosity, creativity and code.*
