const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require("http");
const socketIo = require("socket.io");
const path = require('path')

const connectDB = require("./config/db");
const UserRoutes = require("./routes/userRoutes")
const TaskRoutes =  require("./routes/taskRoutes");
const CommentRoutes = require("./routes/commentRoutes");

// Initialize
connectDB();
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors:
     { origin: "*" || `${process.env.FRONTEND_URL}`,
       methods: ["GET", "POST", 'PUT', "DELETE"],
       credentials: true,
     }
});

// Middleware
app.use(cors({
    origin: "*" || `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/users', UserRoutes)
app.use("/api/tasks", TaskRoutes);
app.use("/api/comments", CommentRoutes);


// Online Users Handling
let onlineUsers = new Map();
let userTaskRelations = new Map();

io.on("connection", (socket) => {
  socket.on("userConnected", ({ userId, name, sharedTaskUsers, createdTasks }) => {
    onlineUsers.set(userId, { socketId: socket.id, name });
    
    // Store which users this user shares tasks with
    userTaskRelations.set(userId, { 
      sharedWith: sharedTaskUsers || [],
      createdTasks: createdTasks || []
    });
    
     // Get all users who should see this user online
     const relevantUsers = new Set();
    
     // 1. Users who share tasks with this user
     sharedTaskUsers?.forEach(id => relevantUsers.add(id));
     
     // 2. Users who have tasks created by this user
     onlineUsers.forEach((_, onlineUserId) => {
       const theirRelations = userTaskRelations.get(onlineUserId) || {};
       if (theirRelations.createdTasks?.includes(userId)) {
         relevantUsers.add(onlineUserId);
       }
     });
     
     // 3. Users who this user has tasks created by them
     createdTasks?.forEach(creatorId => {
       if (onlineUsers.has(creatorId)) {
         relevantUsers.add(creatorId);
       }
     });
     
     // Notify only relevant users
     relevantUsers.forEach(id => {
       const userSocket = onlineUsers.get(id)?.socketId;
       if (userSocket) {
         io.to(userSocket).emit("updateOnlineUsers", getRelevantOnlineUsers(id));
       }
     });
  });
    
  socket.on("disconnect", () => {
    let disconnectedUserId = null;
    
    // Find and remove disconnected user
    for (let [userId, socketInfo] of onlineUsers.entries()) {
      if (socketInfo.socketId === socket.id) {
        onlineUsers.delete(userId);
        disconnectedUserId = userId;
        break;
      }
    }
    
    if (disconnectedUserId) {
      // Notify users who shared tasks with this user
      const usersToNotify = new Set();
      
      onlineUsers.forEach((_, onlineUserId) => {
        const theirRelations = userTaskRelations.get(onlineUserId) || {};
        if (theirRelations.sharedWith.includes(disconnectedUserId) || 
            theirRelations.createdTasks.includes(disconnectedUserId)) {
          usersToNotify.add(onlineUserId);
        }
      });
      
      usersToNotify.forEach(id => {
        const userSocket = onlineUsers.get(id)?.socketId;
        if (userSocket) {
          io.to(userSocket).emit("updateOnlineUsers", getRelevantOnlineUsers(id));
        }
      });
    }
  });

  // Helper function to get relevant online users for a specific user
  function getRelevantOnlineUsers(userId) {
    const relations = userTaskRelations.get(userId) || {};
    const sharedWith = relations.sharedWith || [];
    const createdBy = relations.createdTasks || [];
    const relevant = [];
    
    onlineUsers.forEach((userData, onlineUserId) => {
      if (sharedWith.includes(onlineUserId) || createdBy.includes(onlineUserId)) {
        relevant.push([onlineUserId, userData]);
      }
    });
    
    return relevant;
  }

  // Real-time Events
  socket.on("taskUpdated", () => {io.emit("taskUpdated");});   
  socket.on("commentUpdated", () => {io.emit("commentUpdated");});
  socket.on("taskCreated", () => {io.emit("taskCreated");});   
});

// For production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


// Test Server
app.get("/", (req, res) => {res.send("API is running...")});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
