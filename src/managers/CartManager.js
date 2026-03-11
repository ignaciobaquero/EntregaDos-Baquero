import { v4 as newId } from "uuid";
import fs from "fs/promises";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: newId(),
      products: []
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cid);

    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const index = carts.findIndex(c => c.id === cid);

    if (index === -1) throw new Error("Carrito no encontrado");

    const productIndex = carts[index].products.findIndex(
      p => p.product === pid
    );

    if (productIndex !== -1) {
      carts[index].products[productIndex].quantity++;
    } else {
      carts[index].products.push({
        product: pid,
        quantity: 1
      });
    }

    await this.saveCarts(carts);
    return carts[index];
  }
}

export default CartManager;