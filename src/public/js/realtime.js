const socket = io()

const productsList = document.getElementById("productsList")

socket.on("products", (products) => {

    productsList.innerHTML = ""

    products.forEach(p => {

        const li = document.createElement("li")

        li.innerText = `${p.title} - $${p.price} | ID: ${p.id}`

        productsList.appendChild(li)

    })

})

function addProduct(){

    const product = {

        title: document.getElementById("title").value,
        description: "producto realtime",
        code: "code_" + Date.now(),   // código único
        price: Number(document.getElementById("price").value),
        stock: 10,
        category: "general"

    }

    socket.emit("addProduct", product)

}

function deleteProduct(){

    const id = document.getElementById("deleteId").value

    socket.emit("deleteProduct", id)

}