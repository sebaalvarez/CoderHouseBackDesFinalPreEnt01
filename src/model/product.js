class Product {
  static id = 0;
  constructor(titulo, desc, precio, foto, codigo, unidades) {
    // this.id = ++Product.id;
    this.id = Date.now();
    this.title = titulo;
    this.description = desc;
    this.price = precio;
    this.thumbnail = foto;
    this.code = codigo;
    this.stock = unidades;
  }
}
export default Product;
