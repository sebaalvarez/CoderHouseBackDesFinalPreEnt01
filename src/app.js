import express from "express";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// lanzar server
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
