import { Router } from "express";
import CartManager from "../controller/cartManager.js";

const router = Router();
let carts = [];
const car = new CartManager("./files");

/***   Carga carrito ***/
router.post("/", (req, res) => {
  car.addCart();
  res.status(200).send({
    status: "Success",
    message: `Se cargo el carrito`,
  });
});

/***   Obtiene Todos los carritos ***/
router.get("/", async (req, res) => {
  carts = await car.getCarts();
  let limit = req.query.limit;

  res.status(200).send({
    status: "Success",
    message: !limit ? carts : carts.slice(0, limit),
  });
});

/***   Obtiene carrito por ID ***/
router.get("/:pid", async (req, res) => {
  carts = await car.getCartById(parseInt(req.params.pid));

  if (Object.keys(carts).length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el producto con ID: ${req.params.pid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
});

export default router;
