import express from "express"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import http from "http"

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

import ProductManager from "./managers/ProductManager.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const productManager = new ProductManager("./src/data/products.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

io.on("connection", async (socket) => {

    console.log("Cliente conectado")

    const products = await productManager.getProducts()

    socket.emit("products", products)

    socket.on("addProduct", async (product) => {

    try {

        await productManager.addProduct(product)

        const updatedProducts = await productManager.getProducts()

        io.emit("products", updatedProducts)

    } catch (error) {

        console.log("Error agregando producto:", error.message)

    }

})

socket.on("deleteProduct", async (id) => {

    await productManager.deleteProductById(id)

    const updatedProducts = await productManager.getProducts()

    io.emit("products", updatedProducts)

})
})

server.listen(8080, () => {
    console.log("Servidor corriendo en puerto 8080")
})