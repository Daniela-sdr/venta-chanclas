// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Chanclas Azul Francia",
        descripcion: "Comodidad y estilo en un solo par.",
        precio: 25.99,
        imagen: "./assets/image/Adilette/Adi_AzulFrancia.jpg"
    },
     {
        id: 2,
        nombre: "Chanclas Blancas",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_Blanca.jpg"
    },
    {
        id: 3,
        nombre: "Chanclas Gris",
        descripcion: "Máxima comodidad para tus pies.",
        precio: 34.99,
        imagen: "./assets/image/Adilette/Adi_Gris.jpg"
    },
    {
        id: 4,
        nombre: "Chanclas Negras",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_Negra.jpg"
    },
    {
        id: 5,
        nombre: "Chanclas Rojas",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_Roja.jpg"
    },
    {
        id: 6,
        nombre: "Chanclas Rosa",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_Rosa.jpg"
    },
    {
        id: 7,
        nombre: "Chanclas Verdes",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_Verde.jpg"
    },
    {
        id: 8,
        nombre: "Chanclas Verde Lima",
        descripcion: "Perfectas para el día a día.",
        precio: 29.99,
        imagen: "./assets/image/Adilette/Adi_VerdeLima.jpg"
    }
];

// Función para renderizar las cards
function renderizarProductos() {
    const contenedor = document.getElementById("productos-container");

    productos.forEach(producto => {
        // Crear la estructura de la card
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio.toFixed(2)}</strong></p>
            <button onclick="añadirAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;

        // Agregar la card al contenedor
        contenedor.appendChild(card);
    });
}

// Función para añadir productos al carrito (inicialmente solo muestra un mensaje)
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    console.log(`Producto añadido: ${producto.nombre}`);
}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProductos);