# MyShop - E-commerce Platform

A modern e-commerce platform built with React frontend and PHP backend, featuring product browsing, user authentication, shopping cart functionality, and responsive design.

## 🎥 Demo Video
Watch the MyShop demo: [MyShop E-commerce Platform Demo](https://www.youtube.com/watch?v=3LiD29OtA_I)


## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI framework
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **CSS3**: Custom styling with responsive design

### Backend
- **PHP**: Server-side logic
- **MySQL**: Database management
- **PDO**: Database connectivity
- **JSON**: API responses

## 📁 Project Structure

```
MyShop/
├── react-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js    # Navigation and search
│   │   │   ├── Sidebar.js   # Filters and sorting
│   │   │   ├── ProductGrid.js # Product display
│   │   │   ├── ProductDetail.js # Product details
│   │   │   ├── LoginModal.js # Authentication
│   │   │   └── CartModal.js # Shopping cart
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   ├── App.js           # Main application
│   │   └── App.css          # Main styles
│   └── package.json
└── php-backend/             # PHP backend API
    ├── api/
    │   ├── products.php     # Product endpoints
    │   ├── categories.php   # Category endpoints
    │   ├── login.php        # Authentication
    │   ├── signup.php       # User registration
    │   ├── cart.php         # Cart operations
    │   └── add_to_cart.php  # Add to cart
    └── config/
        └── db.php           # Database configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- XAMPP (includes Apache, MySQL, PHP)

### XAMPP Installation & Setup

#### 1. Install XAMPP
1. Download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Run the installer and follow the setup wizard
3. Start XAMPP Control Panel
4. Start Apache and MySQL services

#### 2. Backend Setup
1. **Copy backend files to htdocs:**
   ```bash
   # Copy the php-backend folder to your XAMPP htdocs directory
   # Windows: C:\xampp\htdocs\
   # macOS: /Applications/XAMPP/htdocs/
   # Linux: /opt/lampp/htdocs/
   
   # Copy the entire php-backend folder to htdocs
   cp -r php-backend/ C:\xampp\htdocs\myshop-backend\
   ```

2. **Configure Database:**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create a new database named `myshop`
   - Import your database schema or create tables manually

3. **Update Database Configuration:**
   - Edit `C:\xampp\htdocs\php-backend\config\db.php`
   - Update database credentials if needed:
   ```php
   $host = 'localhost';
   $dbname = 'myshop';
   $username = 'root';
   $password = ''; // Default XAMPP password is empty
   ```

4. **Test Backend API:**
   - Visit: `http://localhost/php-backend/api/products.php`
   - You should see JSON response with products

### Frontend Setup
```bash
cd react-frontend
npm install
npm start
```

### API Base URL Configuration
Update the API base URL in `react-frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost/php-backend/api';
```

### Database Tables
The application requires the following tables:
- `products`: Product information
- `categories`: Product categories
- `users`: User accounts
- `carts`: Shopping cart items

## 🔧 API Endpoints

### Products
- `GET /products.php` - Get all products with optional filtering
- `GET /products.php?id={id}` - Get specific product
- `GET /products.php?search={term}` - Search products
- `GET /products.php?sort={sort_type}` - Sort products
- `GET /products.php?category={category_id}` - Filter by category

### Categories
- `GET /categories.php` - Get all categories

### Authentication
- `POST /login.php` - User login
- `POST /signup.php` - User registration

### Cart
- `GET /cart.php?user_id={id}` - Get user's cart
- `POST /add_to_cart.php` - Add item to cart

## 🎯 Key Features

### Product Management
- Dynamic product loading from database
- Real-time search with suggestions
- Advanced filtering and sorting
- Pagination for large product catalogs

### User Experience
- Seamless navigation between pages
- Persistent user sessions
- Real-time cart updates
- Responsive design for all devices

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart data
- Total calculation

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

**MyShop** - Building the future of e-commerce, one component at a time.
