const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {

  socket.on('msg', (data) => {
    // socket.emit('showMsg', data)

    // Opções para emitir o evento globalmente
    // socket.broadcast.emit('showMsg', data) // Envia o evento para todos menos para quem enviou a mensagem
    io.emit('showMsg', data) // Envia globalmente para todos
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} success disconnected!`)
  })
})

http.listen(3000, () => console.log("Server running in port 3000"));

