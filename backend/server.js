const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const socketIO = require('socket.io');
const { createDefaultAdmin } = require('./controllers/adminAuthController');

dotenv.config();
connectDB();

// Create default admin account (run once)
createDefaultAdmin();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gigs', require('./routes/gigRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'SkillBridge API running ✅' });
});

// Socket.io Chat
const users = {};

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user-joined', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  socket.on('send-message', (data) => {
    const { to, from, message, gigId } = data;
    const receiverSocketId = users[to];
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive-message', {
        from,
        message,
        gigId,
        timestamp: new Date()
      });
    }
  });

  socket.on('disconnect', () => {
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));