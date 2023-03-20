import { Router } from "express";
import CartManager from "../controller/cartManager.js";
import ProductManager from "../controller/productManager.js";

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
router.get("/:cid", async (req, res) => {
  carts = await car.getCartById(parseInt(req.params.cid));

  if (Object.keys(carts).length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
});

/***   Cargo Producto en Carrito ID ***/
router.post("/:cid/products/:pid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);

  carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (Object.keys(carts).length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${cid}`,
    });
  } else {
    const pm = new ProductManager("./files");

    let productArry = await pm.getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (Object.keys(productArry).length === 0) {
      res.status(202).send({
        status: "info",
        error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con ID: ${pid}`,
      });
    } else {
      /* Existe el id del carrito y el id del producto en el maestro de productos */
      /*
       *
       * AQUÍ VA EL CÓDIGO PARA BUSCAR EL ID DEL PRODUCTO EN EL CARRITO Y AGREGARLO O AUMENTAR LA CANTIDAD
       *
       */
      car.addProductCar(cid, pid);

      res.status(200).send({
        status: "Success",
        error: `Se encontró carrito con ID: ${cid} y el producto con ID: ${pid}`,
      });
    }
  }
});

export default router;
