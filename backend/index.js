const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Match frontend port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ A client connected");

  socket.on("vehicle-location", ({ lat, lng }) => {
    console.log("📡 GPS:", lat, lng);

    // You can broadcast to other clients
    socket.broadcast.emit("vehicle-location", { lat, lng });

    // console log
    console.log("📡 GPS:", lat, lng);
  });

  socket.on("disconnect", () => {
    console.log("❌ A client disconnected");
  });
});

// io.on("connection", (socket) => {
//   console.log("✅ A client connected");

//   let lat = 14.5995;
//   let lng = 120.9842;

//   const getRandomOffset = () => (Math.random() - 0.5) * 0.0005;

//   const interval = setInterval(() => {
//     lat += getRandomOffset();
//     lng += getRandomOffset();
//     socket.emit("vehicle-location", { lat, lng });
//   }, 1000);

//   socket.on("disconnect", () => {
//     console.log("❌ A client disconnected");
//     clearInterval(interval);
//   });
// });

server.listen(3001, () => {
  console.log("🚀 Backend running at http://localhost:3001");
});
