# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
  





## ✅ Objective
You're building a full-stack e-commerce application where users can:

1. Register and log in
2. Browse products
3. View product details
4. Add items to cart
5. Checkout (with dummy payment integration)
6. View order history (optional)

## ⚙️ Technology Stack to be used

🖥️ Frontend (client)
-Vite + React – Fast build tool with React for UI
-React Router DOM – For page routing
-Axios – To make HTTP requests to the backend
-React Toastify – For notification messages
-Tailwind CSS – For styling



🗄️ Backend (Server)
-Node.js + Express – Web server and API endpoints
-MongoDB + Mongoose – Database and data modeling
-JWT (JSON Web Tokens) – User authentication
-Dotenv – For environment configuration
-Stripe or Paystack (optional) – For handling payments



## 🔐 Authentication Flow
1. A new user signs up via /register (POST).
2. User logs in via /login, backend returns a JWT token.
3. Token is saved in localStorage and sent with every protected request (e.g., /checkout).
4. Middleware checks token and grants access.



## 📦 APIs You’ll Create
/api/auth
-POST /register – Create user
-POST /login – Authenticate user

/api/products
-GET / – Get all products
-GET /:id – Get single product details

/api/orders
-POST / – Checkout and create order
-GET /my-orders – Get user’s order history (optional)





## 💳 Payment Integration (Optional)
If you want to integrate payments:
-Use Stripe/Paystack test mode
-Users can enter card info
-You get a mock success/fail response





## 🔄 Frontend Flow Summary
-Home.jsx – Fetch and show products
-Login.jsx / Register.jsx – Auth forms
-ProductDetails.jsx – Show product info
-Checkout.jsx – Collect user data and payment
-Navbar.jsx – Dynamic links (Cart, Logout, etc.)





## 🔥 What You'll Learn
Organizing a full-stack project
Working with React & Vite
Connecting frontend and backend
REST API design
JWT authentication
Building responsive UIs with Tailwind
Managing state and user sessions