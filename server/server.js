const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const startAvailabilityCron = require('./cron/availabilityCron');
const reviewsRouter = require('./routes/reviews');
const http = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket');
const { startBookingCleanupCron } = require('./cron/bookingCleanupCron');
const { generalLimiter, authLimiter } = require('./middleware/rateLimit');
const userRoutes = require('./routes/users');



const app = express();

const httpServer = http.createServer(app);
setupSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// app.use(bodyParser.json());



// use express app directly

// MongoDB connection

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.error("MongoDB Error:", err));


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

     startAvailabilityCron();
     startBookingCleanupCron();

    console.log("MongoDB Connected ✅");

  } catch (err) {
    console.error("MongoDB Connection Failed ❌:", err.message);

    // 🔥 AUTO RECONNECT AFTER 5 SEC
    setTimeout(connectDB, 5000);
  }
};

// CALL FUNCTION
connectDB();
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected ❌');

  // 🔥 TRY RECONNECT
  setTimeout(connectDB, 5000);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Reconnected ✅');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB Error:', err.message);
});

// Routes
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const roommateRoutes = require('./routes/roommateRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roommates', roommateRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewsRouter);
app.use('/api/messages', require('./routes/messages'));
app.use('/api/auth', authLimiter);
app.use('/api', generalLimiter);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

httpServer.listen(PORT, () => console.log(`Server  running on port ${PORT}`));