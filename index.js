const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/students',studentRoutes)

app.get("/", (req, res) => {
  res.send("Bienvenido a la api de estudiantes de Cesar Alvarez y Brandon Zuñiga");
});

const PORT = process.env.PORT || 3000;  //process.env es para acceder a las variables de entorno. Si existe coloca esa variable,si no establece el 3000.


app.listen(PORT,()=>{
  console.log(`Servidor corriendo en: https://localhost:${PORT}`);
});