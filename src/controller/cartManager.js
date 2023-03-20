import fs from "fs";
import Cart from "./model/cart.js";

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
      fs = await fs.promises.mkdir(dirName, { recursive: true });
    } catch (err) {
      console.error(`ERROR al crear directorio: ${err}`);
    }
  };

  validarExistenciaArchivo = (ruta) => {
    if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, "[]");
  };
}

export default CartManager;
