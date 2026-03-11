import { Router } from "express"
import CartManager from "../managers/CartManager.js"

const router = Router()

const cartManager = new CartManager("./src/data/carts.json")

// crear carrito
router.post("/", async (req, res) => {

    const cart = await cartManager.createCart()

    res.json(cart)

})

// obtener carrito por id
router.get("/:cid", async (req, res) => {

    const id = parseInt(req.params.cid)

    const cart = await cartManager.getCartById(id)

    if(!cart){
        return res.status(404).json({ error: "Carrito no encontrado" })
    }

    res.json(cart)

})

// agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {

    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    await cartManager.addProductToCart(cid, pid)

    res.json({ status: "producto agregado al carrito" })

})

export default router