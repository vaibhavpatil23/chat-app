// const { socket } = require("socket.io");

// Node server handel in server
const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (massage) => {
    socket.broadcast.emit("receive", {
      massage: massage,
      name: users[socket.id],});
  });
  socket.on("disconect", (massage) => {
    socket.broadcast.emit("left",users[socket.id]);
    delete users[socket.id]
  });
});
