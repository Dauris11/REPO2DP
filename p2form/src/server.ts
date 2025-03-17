import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import pool from "./db";
pool.connect()
  .then(() => console.log("🟢 Conexión exitosa a PostgreSQL"))
  .catch(err => console.error("🔴 Error al conectar a PostgreSQL", err));


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
