# Shop API

## Project Overview

This repository contains the source for a full-stack e-commerce API built with **Node.js**, **Express.js**, **Sequelize**, and **MySQL**. The backend exposes RESTful endpoints for managing products, categories, orders, and users. Key features include JWT authentication, role-based authorization, image uploads, and robust business logic for order placement and inventory tracking.

## User Roles

- **Guest** – browse the catalog of products
- **Registered User** – place orders and view order history
- **Admin** – full create, read, update, and delete (CRUD) access to all resources

## Data Models (ERD)

- **User**: `name`, `email`, `password`, `role`
- **Category**: `name`, `slug`
- **Product**: `name`, `price`, `description`, `stock`, `image`, `categoryId`
- **Order**: `userId`, `total`, `status`
- **OrderItem**: `orderId`, `productId`, `quantity`, `price`

## Entity Relationships

- **One-to-Many** – `Category` has many `Product`
- **Many-to-Many** – `Order` and `Product` through `OrderItem`
- **One-to-Many** – `User` has many `Order`

## Folder Structure

```
├── models/        # Sequelize model definitions
├── controllers/   # Request handlers and business logic
├── routes/        # Express route definitions
├── middleware/    # Auth, role checks, and other middleware
├── uploads/       # Uploaded product images
├── utils/         # Helper utilities (pagination, filtering, etc.)
└── ...
```

## Codex Prompts

Below are sample prompts you can provide to Codex to generate this API backend. Each prompt assumes an English description of the desired code.

1. **Sequelize Models**

   > "Create Sequelize models for User, Category, Product, Order, and OrderItem using MySQL. Include associations and add any necessary field validations."

2. **Controllers**

   > "Generate Express controllers to handle CRUD operations for products, categories, orders, and users. Include business logic for updating stock when an order is placed."

3. **Authentication**

   > "Implement JWT-based authentication with registration and login endpoints. Passwords should be hashed using bcrypt."

4. **Middleware**

   > "Write Express middleware to verify JWT tokens and ensure an admin role before accessing admin-only routes."

5. **Product Filtering and Pagination**

   > "Add product listing endpoints with support for category filtering, search by name, and pagination."

6. **Order Placement with Transactions**

   > "Develop an endpoint to place an order. Use Sequelize transactions to deduct product stock and create order items atomically."

7. **File Uploads**

   > "Use multer to upload product images to the `uploads/` directory and store the file path on the product model."

## ðŸ§° Codex Prompts â€“ E-Commerce Utilities & Helpers

1. **Pagination Helper**

   ```
   Create a utility function for paginating Sequelize queries.

   Input:
   - req.query.page (default 1)
   - req.query.limit (default 10)

   Output:
   - limit and offset values for Sequelize query
   - currentPage and totalPages if totalCount is passed
   ```

2. **Error Handler Middleware**

   ```
   Create an Express error handling middleware.

   Behavior:
   - Catches any thrown errors
   - Logs the error to console
   - Sends a response with status 500 and JSON: { message: "Internal Server Error" }
   - If the error has a 'statusCode' or 'message' property, use them instead
   ```

3. **JWT Authentication Middleware**

   ```
   Create Express middleware to authenticate users using JWT.

   Steps:
   - Read token from Authorization header
   - Verify the token using jsonwebtoken
   - Attach user info to req.user
   - Return 401 if token is missing or invalid
   ```

4. **Admin-Only Middleware**

   ```
   Create an Express middleware that allows access only to admin users.

   Behavior:
   - Check if req.user.role is 'admin'
   - If not, respond with 403 Forbidden
   ```

5. **Multer Upload Config**

   ```
   Create a Multer configuration to handle single file upload.

   Behavior:
   - Accepts only image files (jpg, jpeg, png)
   - Stores them in the /uploads directory
   - Saves original filename or generates a unique one
   - Limits file size to 2MB
   ```

## Final Notes

This README acts as both a business and technical reference for the project. With these requirements and prompts, Codex can generate a full backend system implementing authentication, product management, order handling, and more.

