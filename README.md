# NestFind 🏠

A modern, full-stack real estate property listing platform built with **React**, **Express.js**, and **MongoDB**. Features real-time chat, property management, and admin controls.

---

## 🎯 Key Features

### ✨ Frontend Features
- **Modern UI with Tailwind CSS** - Responsive, beautiful design
- **Property Search & Filters** - Search by title, location, price range
- **Property Cards** - Beautiful card layout with images, pricing, location
- **Favorites/Wishlist** - Save properties locally (localStorage)
- **Authentication** - Login/Register with JWT support
- **Navigation** - Modern navbar with mobile responsiveness
- **Real-time Chat** - Socket.io integration for instant messaging
- **Property Details** - Detailed view of individual properties
- **Add Property** - Form to list new properties with validation
- **User Reviews** - Rating and review system for properties

### 🔧 Backend Features
- **Express.js Server** - RESTful API architecture
- **MongoDB** - NoSQL database for properties, users, bookings, and reviews
- **Authentication** - JWT-based auth system with bcrypt password hashing
- **Socket.io** - Real-time chat functionality
- **CORS Enabled** - Secure cross-origin requests
- **Environment Configuration** - Dotenv for secure configuration
- **Rate Limiting** - Protection against abuse
- **Cron Jobs** - Automated availability and booking cleanup
- **Email Service** - Nodemailer integration for notifications
- **Cloudinary Integration** - Image upload and management
- **Admin Dashboard** - Manage users, properties, and bookings

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
  - OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### External Services Required

- **Cloudinary Account** - For image hosting - [Sign up](https://cloudinary.com/)
- **Gmail Account** - For email notifications - [Setup App Password](https://support.google.com/accounts/answer/185833)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/NestFind.git
cd NestFind
```

### 2️⃣ Backend Setup

#### Navigate to the server directory:
```bash
cd server
```

#### Install dependencies:
```bash
npm install
```

#### Create `.env` file from template:
```bash
# Copy the example file
cp .env.example .env
```

#### Configure your `.env` file:
Edit the `.env` file and add your configuration:

```env
# Required: MongoDB Connection String
MONGO_URI=mongodb://127.0.0.1:27017/smart-real-estate

# Required: JWT Secret (generate a strong random key)
JWT_SECRET=your_strong_jwt_secret_here

# Required: Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Required: Email Configuration
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# URLs
PORT=5000
CLIENT_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

#### MongoDB Setup

**Option A: Local MongoDB**
- Start MongoDB service on your system
- Default connection: `mongodb://127.0.0.1:27017/smart-real-estate`

**Option B: MongoDB Atlas (Cloud)**
1. Create an account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get your connection string
4. Update `MONGO_URI` in `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-real-estate
   ```

### 3️⃣ Frontend Setup

#### Navigate to the client directory (from root):
```bash
cd client
```

#### Install dependencies:
```bash
npm install
```

#### Create `.env` file:
```bash
cp .env.example .env
```

#### Configure your `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server:
```bash
cd server
npm run dev
```
✅ Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend:
```bash
cd client
npm start
```
✅ Frontend will open on `http://localhost:3000`

### Production Build

```bash
# Build frontend
cd client
npm run build

# Set NODE_ENV to production
export NODE_ENV=production  # On Windows: set NODE_ENV=production

# Start backend
cd server
npm start
```

---

## 👨‍💼 Admin Setup (Important!)

### Creating an Admin User

After you configure your backend `.env` (copy `server/.env.example` → `server/.env` and set `MONGO_URI`), run the script below to create or upgrade an account to an admin:

Windows (PowerShell / CMD):

```powershell
cd server
node create_admin.js --email=admin@example.com --password=SecurePass123 --fullName="Admin User"
```

macOS / Linux / WSL:

```bash
cd server
node create_admin.js --email=admin@example.com --password=SecurePass123 --fullName="Admin User"
```

Notes:
- The script reads `MONGO_URI` from your environment. If `MONGO_URI` is missing you will see `MONGO_URI not set in .env`.
- The `User` model hashes the plain password on save, so provide the desired plaintext password; it will be stored hashed.
- If a user with the given email exists, the script updates that user's `fullName`, `password` (replaced and hashed) and sets `role = 'admin'`. Otherwise it creates a new admin user.

### Verify the Admin User

Use the MongoDB shell (`mongosh`) or Atlas UI to verify the new admin record.

Example using `mongosh` (replace the URI and DB name as needed):

```bash
# connect to your DB
mongosh "<your-MONGO_URI>"

# switch to the database (example name: nestfind-db)
use nestfind-db

# find the admin user
db.users.findOne({ email: "admin@example.com" })
```

You should see a document with `role: "admin"` (the `password` field will be present but hashed).

Alternatively, view the `users` collection in MongoDB Atlas or run any admin-only API endpoint (if available) to confirm elevated access.

### Troubleshooting

- Error: `MONGO_URI not set in .env` — copy `server/.env.example` to `server/.env`, set `MONGO_URI`, and rerun the command in the same shell.
- Connection errors — ensure MongoDB is running (local `mongod`) or that your Atlas URI is valid and your IP is whitelisted.
- On Windows, if MongoDB service is not running, open a terminal "Run as Administrator" and run:
  ```powershell
  net start mongodb
  ```
- Permission denied / authentication errors — double-check credentials in `MONGO_URI` for Atlas.

### Example Full Flow

```powershell
# 1. copy env template
cd server
copy .env.example .env        # Windows
# or on macOS/Linux: cp .env.example .env

# 2. edit .env and set MONGO_URI, JWT_SECRET, etc.

# 3. create admin
node create_admin.js --email=admin@yourdomain.com --password=MySecurePassword456 --fullName="John Admin"

# 4. verify in mongosh or Atlas
```

## 🔒 Protecting Admin Creation (Recommended)

Creating an admin account is a privileged operation. By default `create_admin.js` will run when executed and will read `MONGO_URI` from your environment. Consider one of the following protections before running this script on a shared or production host:

- Quick / Operational (no code changes):
  - Run the script only from a secure machine (your development machine) that has access to the database.
  - Do not store plaintext admin passwords in shared places. Use a password manager.
  - Restrict who can SSH or run commands on the server.

- Safer / Recommended (small code change):
  - Add an authorization token check to `create_admin.js` so the script only runs when a matching `ADMIN_CREATION_TOKEN` environment variable is present. Example (concept):

```js
// example snippet to add at the top of create_admin.js
const expected = process.env.ADMIN_CREATION_TOKEN;
const provided = process.argv.find(a => a.startsWith('--token='))?.split('=')[1];
if (!expected || provided !== expected) {
  console.error('Admin creation not authorized. Set ADMIN_CREATION_TOKEN in env and pass --token=...');
  process.exit(1);
}
```

  - Then export the token in your shell or add it to a protected `.env` (do not commit `.env`). Example (bash):

```bash
export ADMIN_CREATION_TOKEN=my-secret-token
node create_admin.js --token=my-secret-token --email=admin@example.com --password=Secret
```

  - On Windows PowerShell:

```powershell
$env:ADMIN_CREATION_TOKEN = 'my-secret-token'
node create_admin.js --token=my-secret-token --email=admin@example.com --password=Secret
```

These steps help prevent accidental or unauthorized admin creation on production databases.

---

## 📁 Project Structure

```
NestFind/
├── .gitignore                           # Git ignore rules
├── README.md                            # This file
│
├── client/                              # React Frontend
│   ├── .env.example                     # Environment template
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/                  # Reusable UI components
│       │   ├── Navbar.js
│       │   ├── PropertyCard.js
│       │   ├── ChatWindow.js
│       │   ├── MapView.js
│       │   └── ...
│       ├── pages/                       # Page components
│       │   ├── Home.js
│       │   ├── PropertyDetails.js
│       │   ├── Login.js
│       │   ├── AdminDashboard.js
│       │   └── ...
│       ├── context/                     # React Context
│       │   └── AuthContext.js
│       ├── hooks/                       # Custom React hooks
│       │   ├── useSocket.js
│       │   └── useScrollRestoration.js
│       └── utils/
│           └── api.js                   # Axios API calls
│
├── server/                              # Express Backend
│   ├── .env.example                     # Environment template
│   ├── package.json
│   ├── server.js                        # Main server file
│   ├── socket.js                        # Socket.io configuration
│   ├── create_admin.js                  # Admin user creation script
│   ├── seed.js                          # Database seed script
│   │
│   ├── models/                          # MongoDB Models
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── Message.js
│   │
│   ├── routes/                          # API Routes
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── messages.js
│   │   └── ...
│   │
│   ├── middleware/                      # Express Middleware
│   │   ├── auth.js                      # JWT verification
│   │   └── rateLimit.js                 # Rate limiting
│   │
│   ├── services/                        # Business Logic
│   │   └── emailService.js
│   │
│   ├── cron/                            # Scheduled Jobs
│   │   ├── availabilityCron.js
│   │   └── bookingCleanupCron.js
│   │
│   └── ai_service/
│       └── recommend.py                 # AI recommendations
```

---

## 🔐 Environment Variables Explained

### Backend `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/smart-real-estate` |
| `PORT` | Backend server port | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `CLOUD_NAME` | Cloudinary cloud name | `my_cloud` |
| `CLOUD_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `secret_key` |
| `GMAIL_USER` | Gmail address for emails | `user@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail app-specific password | `xxxx xxxx xxxx xxxx` |

### Frontend `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🧪 Testing

### Run Tests (Backend)
```bash
cd server
npm test
```

### Run Tests (Frontend)
```bash
cd client
npm test
```

---

## 📝 Available Scripts

### Backend Scripts
```bash
npm run dev      # Development mode with nodemon (auto-reload)
npm start        # Production mode
npm test         # Run tests
```

### Frontend Scripts
```bash
npm start        # Development server
npm build        # Production build
npm test         # Run tests
npm eject        # Eject from Create React App (irreversible)
```

---

## 🔧 Configuration Files

### Backend Configuration
- **server.js** - Express server setup, MongoDB connection, middleware
- **socket.js** - Socket.io configuration for real-time chat
- **middleware/auth.js** - JWT authentication middleware
- **middleware/rateLimit.js** - Rate limiting for API protection

### Frontend Configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration

---

## 📚 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Add new property (authenticated)
- `PUT /api/properties/:id` - Update property (owner/admin)
- `DELETE /api/properties/:id` - Delete property (owner/admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Reviews
- `GET /api/reviews/:propertyId` - Get property reviews
- `POST /api/reviews` - Create review

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongoDB Connection Failed: connect ECONNREFUSED
```
**Solution:** 
- Ensure MongoDB is running
- Check your `MONGO_URI` in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change the `PORT` in `.env`
- Or kill the process using port 5000

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check `CLIENT_URL` and `FRONTEND_URL` in backend `.env`
- Ensure they match your frontend URL

### Images Not Uploading
```
Cloudinary configuration error
```
**Solution:**
- Verify `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET`
- Check Cloudinary account settings

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👥 Support

For support, email your contact email or open an issue on GitHub.

---

## 🙏 Acknowledgments

- React.js community
- Express.js documentation
- MongoDB documentation
- Socket.io for real-time communication
- Tailwind CSS for styling
- Cloudinary for image hosting

---

**Happy coding! 🚀**
