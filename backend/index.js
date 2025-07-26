const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
  })
);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
  },
});

// ✅ THIS is what you need:
io.on("connection", (socket) => {
  console.log("✅ A client connected");

  socket.on("vehicle-location", ({ lat, lng }) => {
    console.log("📡 GPS:", lat, lng);
    io.emit("vehicle-location", { lat, lng }); // Send to everyone
  });

  socket.on("disconnect", () => {
    console.log("❌ A client disconnected");
  });
});

server.listen(3001, () => {
  console.log("🚀 Backend running at http://localhost:3001");
});
