require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./src/routes/users");
const messageRoutes = require("./src/routes/messages");
const mongoDB = require("./src/db/db");
const port = 3001;
const postRoutes = require("./src/routes/post");

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API Kodemia repaso gen 31" });
});

//se usa la carpeta user con el prefijo del path users
app.use("/users", userRoutes);
//se usa /messages como prefijo en el path para la ruta de mensajes y la ruta
app.use("/messages", messageRoutes);
//promesa de la base de datos

//post
app.use("/post", postRoutes);

mongoDB.connect
  .then((message) => {
    console.log(message);

    app.listen(port, () => {
      console.log("server is ready in port: " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
