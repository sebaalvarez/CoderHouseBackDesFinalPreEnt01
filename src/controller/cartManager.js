import fs from "fs";
import Cart from "../model/cart.js";

class CartManager {
  dirName = "";
  fileName = "carts.json";
  ruta = "";

  constructor(dirName) {
    this.dirName = dirName;
    this.ruta = this.dirName + "/" + this.fileName;
    this.crearDirectorio(this.dirName);
    this.validarExistenciaArchivo(this.ruta);
    this.arrayCarts = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
  }

  crearDirectorio = async (dirName) => {
    try {
      await fs.promises.mkdir(dirName, { recursive: true });
    } catch (err) {
      console.error(`ERROR al crear directorio: ${err}`);
    }
  };

  validarExistenciaArchivo = (ruta) => {
    if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, "[]");
  };

  addCart = async () => {
    try {
      this.validarExistenciaArchivo(this.ruta);

      let cart = new Cart();

      this.arrayCarts.push(cart);
      console.log(`Se cargo el carrito`);
      await fs.promises.writeFile(this.ruta, JSON.stringify(this.arrayCarts));
    } catch (error) {
      console.error(`ERROR agregando Carrito: ${error}`);
    }
  };

  getCarts = async () => {
    try {
      this.validarExistenciaArchivo(this.ruta);
      return JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
    } catch (error) {
      console.error(`ERROR obteniendo los Carritos: ${error}`);
    }
  };

  getCartById = async (id) => {
    try {
      let prod = {};
      this.validarExistenciaArchivo(this.ruta);
      let arrayP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      for (const obj of arrayP) if (obj.id === id) prod = { ...obj };

      return prod;
    } catch (error) {
      console.error(`ERROR obteniendo el Carrito por ID: ${error}`);
    }
  };
}

export default CartManager;
