// Importar librerías
const express = require("express");
const path = require("path");
const cors = require("cors");

// Importar gestores de rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const reporteRoutes = require('./routes/reporteRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const localizacionRoutes = require('./routes/localizacionRoutes');
const organizadorFavoritoRoutes = require('./routes/organizadorFavoritoRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// app.use(cors());

// Configurar CORS para admitir cualquier origen
const corsOptions = {
  origin: '*', // Reemplaza con la URL de tu frontend
  methods: '*',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

// Configurar rutas de la API Rest
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/asistencia", asistenciaRoutes);
app.use("/api/localizaciones", localizacionRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/organizadorFavorito", organizadorFavoritoRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar las solicitudes al archivo index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
