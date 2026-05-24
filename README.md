# CourseHub Backend API

A secure, production-ready backend for the CourseHub learning management system. Built with Express.js, MongoDB, and JWT authentication.

## 🎯 Features

### Authentication & Security

- **User Registration**: Create accounts with secure password hashing
- **Login/Logout**: JWT-based session management
- **Password Hashing**: Bcryptjs with salt rounds
- **Protected Routes**: Middleware-based authorization
- **Error Handling**: Comprehensive error middleware
- **Input Validation**: Express-validator for all inputs

### Course Management

- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Course Categories**: Programming, Design, Business, Other
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Publishing**: Draft and published states
- **Metadata**: Timestamps, pricing, instructor info

### User Roles

- **User**: Can view courses
- **Instructor**: Can create and manage their own courses
- **Admin**: Full access to all resources

## 🛠️ Tech Stack

- **Runtime**: Node.js v16+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose 7.5
- **Authentication**: JWT (jsonwebtoken 9.0.0)
- **Password Security**: bcryptjs 2.4.3
- **Validation**: express-validator 7.0.0
- **Utilities**: Cookie-parser 1.4.6, CORS 2.8.5
- **Dev Tools**: Nodemon 3.0.1

## 📋 Project Structure

```
Final - Backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── controllers/        # Business logic
│   │   ├── auth.controller.js
│   │   └── course.controller.js
│   ├── db/
│   │   └── db.js           # MongoDB connection
│   ├── middlewares/        # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── models/             # Mongoose schemas
│   │   ├── user.model.js
│   │   └── course.model.js
│   ├── routes/             # API routes
│   │   ├── auth.routes.js
│   │   └── course.routes.js
│   ├── utils/              # Utility functions
│   │   ├── jwt.util.js
│   │   └── password.util.js
│   └── validators/         # Validation rules
│       └── index.js
├── .env                    # Environment variables
├── server.js               # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Navigate to backend directory**

   ```bash
   cd "Final - Backend"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/coursehub
   NODE_ENV=development
   JWT_SECRET=your_secure_jwt_secret_key_minimum_32_chars
   JWT_EXPIRE=24h
   ```

4. **Start the server**

   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response 200:
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Course Endpoints

#### Get All Courses

```http
GET /api/courses

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Introduction to React",
      "description": "Learn React from scratch",
      "instructor": "Jane Smith",
      "category": "programming",
      "level": "beginner",
      "price": 49.99,
      "isPublished": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

#### Get Course by ID

```http
GET /api/courses/:id

Response 200:
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Introduction to React",
    ...
  }
}
```

#### Create Course (Protected - Instructor/Admin only)

```http
POST /api/courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Introduction to React",
  "description": "Learn React from scratch",
  "instructor": "Jane Smith",
  "category": "programming",
  "level": "beginner",
  "price": 49.99,
  "isPublished": true
}

Response 201:
{
  "success": true,
  "data": { ... },
  "message": "Course created successfully"
}
```

#### Update Course (Protected - Owner/Admin only)

```http
PUT /api/courses/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Advanced React",
  "price": 79.99,
  ...
}

Response 200:
{
  "success": true,
  "data": { ... },
  "message": "Course updated successfully"
}
```

#### Delete Course (Protected - Owner/Admin only)

```http
DELETE /api/courses/:id
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Course deleted successfully"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User logs in/registers
2. Server returns JWT token
3. Client sends token in `Authorization: Bearer {token}` header
4. Server verifies token on protected routes
5. Token expires after 24 hours (default)

### Token Storage

- Tokens are stored in httpOnly cookies (secure)
- Also returned in response for localStorage (optional)
- Include in every protected request

## 📊 Database Models

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['user', 'instructor', 'admin'], default: 'user'),
  timestamps: true
}
```

### Course Schema

```javascript
{
  title: String (required),
  description: String,
  instructor: String (required),
  category: String (enum: ['programming', 'design', 'business', 'other']),
  level: String (enum: ['beginner', 'intermediate', 'advanced']),
  price: Number (default: 0),
  isPublished: Boolean (default: false),
  timestamps: true
}
```

## 🛡️ Security Features

- **Password Hashing**: Bcryptjs with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **CORS**: Cross-origin request handling
- **Input Validation**: All inputs validated before processing
- **Error Handling**: Comprehensive error middleware
- **MongoDB Injection Protection**: Mongoose schema validation
- **Cookie Security**: httpOnly, secure flags

## 🧪 Testing with Postman/cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

### Get All Courses

```bash
curl http://localhost:5000/api/courses
```

### Create Course (Protected)

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Course","instructor":"Me","category":"programming","level":"beginner"}'
```

## 📝 Environment Variables

| Variable    | Description               | Example                             |
| ----------- | ------------------------- | ----------------------------------- |
| PORT        | Server port               | 5000                                |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/coursehub |
| NODE_ENV    | Environment               | development, production             |
| JWT_SECRET  | JWT signing secret        | your_secret_key_min_32_chars        |
| JWT_EXPIRE  | Token expiration          | 24h                                 |

## 🚨 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## 🐛 Troubleshooting

### Connection Issues

- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check PORT is not in use

### Authentication Issues

- Verify JWT_SECRET is set
- Check token format in requests
- Ensure token not expired

### Validation Errors

- Check all required fields
- Verify email format
- Check password strength
- Ensure category/level enums match

## 📚 Available Scripts

- `npm start` - Run production server
- `npm run dev` - Run development server with auto-reload

## 🔄 API Response Format

All responses follow this format:

```javascript
{
  success: Boolean,
  message?: String,
  data?: Object|Array,
  error?: String,
  total?: Number
}
```

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET` (min 32 characters)
3. Use cloud MongoDB URI
4. Deploy to Heroku, AWS, or similar
5. Update frontend `VITE_API_BASE_URL` to production URL

## 📞 Support

For issues:

1. Check terminal for error logs
2. Verify database connection
3. Check API requests in DevTools
4. Review validation messages

## 📄 License

MIT - See LICENSE file for details

- `GET /api/auth/me` - Get current user

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (protected)
- `PUT /api/courses/:id` - Update course (protected)
- `DELETE /api/courses/:id` - Delete course (protected)

## 🏗️ Project Structure

```

project/
├── src/
│ 	├── controllers/
│ 	│   ├── auth.controller.js
│ 	│   └── course.controller.js
│ 	├── db/
│ 	│   └── db.js
│ 	├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│ 	│   └── validation.middleware.js
│ 	├── models/
│ 	│   ├── course.model.js
│ 	│   └── user.model.js
│ 	├── routes/
│ 	│   ├── auth.routes.js
│ 	│   └── course.routes.js
│ 	├── utils/
│   │   ├── jwt.util.js
│ 	│   └── password.util.js
│ 	├── validators/
│   │   └── index.js
│ 	└── app.js
├── .env
└── server.js

```

## 💡 Key Concepts

### Password Hashing Process

```
Plain Password → Add Salt → Hash → Store in DB
```

### Pre-save Hook (Automatic Hashing)

```javascript
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

### Instance Method (Password Comparison)

```javascript
userSchema.methods.comparePassword = async function (passwordToCompare) {
  return await bcrypt.compare(passwordToCompare, this.password);
};

// Usage in login
const isMatch = await user.comparePassword(password);
```

### Bcrypt Concepts

**Salt Rounds**: Controls hashing cost

- 10 rounds = good balance (default)
- Higher = slower (more secure, slower login)
- Lower = faster (less secure, faster login)

**Hash Format**: `$2a$rounds$salt+hash`

- Each password gets unique salt
- Same password produces different hash each time

## 🔐 Security Best Practices

1. **Never Store Plain Passwords**: Always hash before storing
2. **Use Salt**: Makes rainbow table attacks ineffective
3. **Never Log Passwords**: Even in development
4. **Use HTTPS**: Protect passwords in transit
5. **Never Send Passwords**: Only send when setting/changing

## 🧪 Testing

### Register (password automatically hashed)

```bash
curl -X POST http://localhost:5005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login (password compared against hash)

```bash
curl -X POST http://localhost:5005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Wrong password attempt

```bash
curl -X POST http://localhost:5005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

Response:

```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

## 📊 Hash Example

Database storage:

```
User: john@example.com
Password: $2a$10$N9qo8uLOickgx2ZMRZoMye8K2yGFW3LWn7GYRqMV7Ci3VjvGKKnvW
```

When logging in:

1. Get plain password from user: "password123"
2. Compare with stored hash using bcrypt.compare()
3. bcrypt handles everything - no need to understand the hash

## ⚠️ Important Notes

- Pre-save hook automatically hashes passwords
- Passwords are excluded from most responses using `.select('-password')`
- Never hash a password twice (the hook checks `isModified()`)
- Bcrypt comparison is safe against timing attacks

## 📝 Next Steps

Proceed to **Module 07** to learn about:

- Jest testing framework
- Supertest for API testing
- Unit and integration tests
- Test coverage
#   M E R N - S e s s i o n  
 