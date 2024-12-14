// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Chanclas Azul Francia",
        descripcion: "Comodidad y estilo en un solo par.",
        precio: 18.00,
        imagen: "./assets/image/Adilette/Adi_AzulFrancia.jpg"
    },
     {
        id: 2,
        nombre: "Chanclas Blancas",
        descripcion: "Perfectas para el día a día.",
        precio: 18.00,
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
//function añadirAlCarrito(id) {
//    const producto = productos.find(p => p.id === id);
//    console.log(`Producto añadido: ${producto.nombre}`);
//}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProductos);

// Array para almacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias a elementos del DOM
const cartCount = document.getElementById("cart-count");

// Función para añadir un producto al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
}

// Función para actualizar la cantidad mostrada en el ícono del carrito
function actualizarCarrito() {
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = totalProductos;
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
    guardarCarrito();
}

// Inicializar el contador del carrito al cargar la página
actualizarCarrito();

function mostrarCarrito() {
    const cartTableBody = document.getElementById("cart-table-body");
    const cartTotal = document.getElementById("cart-total");
    cartTableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                ${producto.cantidad}
                <button class="btn btn-sm btn-success" onclick="modificarCantidad(${producto.id}, 1)">+</button>
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </td>
        `;
        cartTableBody.appendChild(fila);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Modificar la cantidad
function modificarCantidad(id, cantidad) {
    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        }
        actualizarCarrito();
        guardarCarrito();
        mostrarCarrito(); // Refresca la tabla
    }
}

// Eliminar un producto
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
    guardarCarrito();
    mostrarCarrito();
}

// Mostrar carrito al hacer clic en el ícono
document.getElementById("cart-icon").addEventListener("click", () => {
    mostrarCarrito();
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});

function calcularTotal() {
    let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}