# Real Estate Simple Backend API

A beginner-friendly Node.js + Express backend for Next.js learners.

This backend includes:

- Signup
- Login
- Logout
- Token-based authentication using JWT
- Real estate CRUD APIs
- Simple property filters
- JSON file storage, so students do not need MongoDB/PostgreSQL
- Windows 10/11 friendly setup

---

## 1. What students will learn

Frontend students can practice:

- Calling backend APIs from Next.js
- Sending POST, GET, PUT, DELETE requests
- Using authentication token
- Saving token in frontend
- Showing protected pages
- Creating property cards
- Editing and deleting property data
- Filtering properties by city, type, price, status, etc.

---

## 2. Requirements

Install these first:

### Node.js

Download and install Node.js LTS from:

```text
https://nodejs.org
```

After installing, check in PowerShell:

```powershell
node -v
npm -v
```

You should see versions like:

```powershell
v20.x.x
10.x.x
```

---

## 3. Project setup

### Step 1: Open terminal

Open PowerShell or VS Code terminal.

### Step 2: Go to your project folder

Example:

```powershell
cd Desktop
```

### Step 3: Install dependencies

```powershell
npm install
```

### Step 4: Create `.env` file

Copy `.env.example` and create a new file named `.env`.

In Windows PowerShell:

```powershell
copy .env.example .env
```

Your `.env` should look like this:

```env
PORT=5000
JWT_SECRET=change_this_secret_for_class_demo
JWT_EXPIRES_IN=7d
```

For class/demo, this is okay. For real production apps, use a strong secret.

---

## 4. Run the backend

For development:

```powershell
npm run dev
```

For normal start:

```powershell
npm start
```

Server should start at:

```text
http://localhost:5000
```

Test in browser:

```text
http://localhost:5000
```

You should see:

```json
{
  "message": "Real Estate Backend API is running"
}
```

---

## 5. API base URL

```text
http://localhost:5000/api
```

---

# Authentication APIs

## 6. Signup

### Endpoint

```http
POST /api/auth/signup
```

### Full URL

```text
http://localhost:5000/api/auth/signup
```

### Body

```json
{
  "name": "Aman Kumar",
  "email": "aman@example.com",
  "password": "123456"
}
```

### Success response

```json
{
  "message": "Signup successful",
  "user": {
    "id": "user-id",
    "name": "Aman Kumar",
    "email": "aman@example.com"
  },
  "token": "jwt-token-here"
}
```

---

## 7. Login

### Endpoint

```http
POST /api/auth/login
```

### Full URL

```text
http://localhost:5000/api/auth/login
```

### Body

```json
{
  "email": "aman@example.com",
  "password": "123456"
}
```

### Success response

```json
{
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "name": "Aman Kumar",
    "email": "aman@example.com"
  },
  "token": "jwt-token-here"
}
```

---

## 8. Logout

Because this project uses simple JWT token-based authentication, logout is handled mainly from frontend.

### Endpoint

```http
POST /api/auth/logout
```

### Full URL

```text
http://localhost:5000/api/auth/logout
```

### What frontend should do

Remove the token from localStorage/sessionStorage.

Example:

```js
localStorage.removeItem("token");
```

### Response

```json
{
  "message": "Logout successful. Please remove token from frontend storage."
}
```

---

# How to send token from frontend

For protected APIs, send the token in the request header:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

Example using fetch:

```js
const res = await fetch("http://localhost:5000/api/properties", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

---

# Real Estate Property APIs

## 9. Get all properties

This API is public. No token required.

### Endpoint

```http
GET /api/properties
```

### Full URL

```text
http://localhost:5000/api/properties
```

---

## 10. Get properties with filters

You can pass filters using query parameters.

### Examples

Filter by city:

```text
http://localhost:5000/api/properties?city=Pune
```

Filter by property type:

```text
http://localhost:5000/api/properties?type=Apartment
```

Filter by status:

```text
http://localhost:5000/api/properties?status=For Sale
```

Filter by min and max price:

```text
http://localhost:5000/api/properties?minPrice=3000000&maxPrice=9000000
```

Filter by bedrooms:

```text
http://localhost:5000/api/properties?bedrooms=2
```

Search by title, city, address, or description:

```text
http://localhost:5000/api/properties?search=lake
```

Combine filters:

```text
http://localhost:5000/api/properties?city=Pune&type=Apartment&maxPrice=8000000
```

Available filters:

| Filter | Example |
|---|---|
| `city` | `?city=Pune` |
| `type` | `?type=Apartment` |
| `status` | `?status=For Sale` |
| `minPrice` | `?minPrice=3000000` |
| `maxPrice` | `?maxPrice=9000000` |
| `bedrooms` | `?bedrooms=2` |
| `search` | `?search=luxury` |

---

## 11. Get single property

### Endpoint

```http
GET /api/properties/:id
```

### Example

```text
http://localhost:5000/api/properties/property-id-here
```

---

## 12. Create property

Protected API. Token required.

### Endpoint

```http
POST /api/properties
```

### Headers

```text
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

### Body

```json
{
  "title": "Modern 2BHK Apartment",
  "description": "Beautiful apartment near IT park with parking and balcony.",
  "price": 6500000,
  "city": "Pune",
  "address": "Hinjewadi Phase 1, Pune",
  "type": "Apartment",
  "status": "For Sale",
  "bedrooms": 2,
  "bathrooms": 2,
  "areaSqFt": 950,
  "imageUrl": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
}
```

---

## 13. Update property

Protected API. Only the owner who created the property can update it.

### Endpoint

```http
PUT /api/properties/:id
```

### Headers

```text
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

### Body

You can send all fields or only the fields you want to update.

```json
{
  "price": 6200000,
  "status": "For Sale"
}
```

---

## 14. Delete property

Protected API. Only the owner who created the property can delete it.

### Endpoint

```http
DELETE /api/properties/:id
```

### Headers

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

---

# Example frontend fetch calls

## Signup from Next.js

```js
async function signup() {
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Aman Kumar",
      email: "aman@example.com",
      password: "123456",
    }),
  });

  const data = await res.json();
  console.log(data);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
}
```

---

## Login from Next.js

```js
async function login() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "aman@example.com",
      password: "123456",
    }),
  });

  const data = await res.json();
  console.log(data);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
}
```

---

## Get all properties

```js
async function getProperties() {
  const res = await fetch("http://localhost:5000/api/properties");
  const data = await res.json();
  console.log(data);
}
```

---

## Create property

```js
async function createProperty() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: "Modern 2BHK Apartment",
      description: "Beautiful apartment near IT park.",
      price: 6500000,
      city: "Pune",
      address: "Hinjewadi Phase 1, Pune",
      type: "Apartment",
      status: "For Sale",
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 950,
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    }),
  });

  const data = await res.json();
  console.log(data);
}
```

---

## Delete property

```js
async function deleteProperty(propertyId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data);
}
```

---

# Testing with Postman / Thunder Client

Recommended order:

1. Signup
2. Copy token from response
3. Create property using token
4. Get all properties
5. Update property
6. Delete property
7. Logout

---

# Folder structure

```text
real-estate-simple-backend/
│
├── package.json
├── .env.example
├── .gitignore
├── README.md
│
└── src/
    ├── server.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── propertyController.js
    │
    ├── data/
    │   ├── properties.json
    │   └── users.json
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── propertyRoutes.js
    │
    └── utils/
        └── fileDb.js
```

---

# Important note for students

This backend is intentionally simple for learning.

It does not use:

- Cookies
- Sessions
- Database
- Refresh tokens
- Role-based access
- Email verification

Those things are important in real production apps, but they make the backend harder for beginners.

For this project, the goal is to help Next.js learners understand API calling, token auth, and CRUD operations.

---

# Common Windows issues

## Problem: `nodemon` is not recognized

Run:

```powershell
npm install
npm run dev
```

If still not working:

```powershell
npm start
```

---

## Problem: PowerShell script execution error

Use this command:

```powershell
npm run dev
```

If PowerShell blocks something, use Command Prompt or Git Bash.

---

## Problem: Port already in use

Change the port in `.env`:

```env
PORT=5001
```

Then run again:

```powershell
npm run dev
```

---

# Demo users/properties

The project starts with empty users and some sample properties.

Students can signup and create their own properties.
