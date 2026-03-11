import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"

const router = Router()

const productManager = new ProductManager("./src/data/products.json")

// obtener todos los productos
router.get("/", async (req, res) => {

    const products = await productManager.getProducts()

    res.json(products)

})

// obtener producto por id
router.get("/:pid", async (req, res) => {

    const id = parseInt(req.params.pid)

    const products = await productManager.getProducts()

    const product = products.find(p => p.id === id)

    if(!product){
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(product)

})

// crear producto
router.post("/", async (req, res) => {

    const product = req.body

    await productManager.addProduct(product)

    res.json({ status: "producto agregado" })

})

// eliminar producto
router.delete("/:pid", async (req, res) => {

    const id = parseInt(req.params.pid)

    await productManager.deleteProduct(id)

    res.json({ status: "producto eliminado" })

})

export default router