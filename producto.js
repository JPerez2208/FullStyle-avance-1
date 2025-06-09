// Productos de ejemplo (debe ser igual que en script.js)
const products = [
    {
        id: 1,
        name: "Camisa Clásica",
        image: "img/camisas/BLACK BACK.png",
        price: 20,
        sizes: ["S", "M", "L", "XL"],
        details: "Camisa de algodón con estampado exclusivo. Ideal para cualquier ocasión."
    },
    {
        id: 2,
        name: "Suéter Cómodo",
        image: "img/sweater.jpg",
        price: 35,
        sizes: ["M", "L", "XL"],
        details: "Suéter suave y abrigador, perfecto para el invierno."
    },
    {
        id: 3,
        name: "Playera Casual",
        image: "img/tshirt.jpg",
        price: 15,
        sizes: ["S", "M", "L"],
        details: "Playera ligera y cómoda para el día a día."
    },
    {
        id: 4,
        name: "Hoodie",
        image: "img/hoodie.jpg",
        price: 30,
        sizes: ["S", "M", "L", "XL"],
        details: "Hoodie moderno con capucha y bolsillo frontal."
    }
];

// Obtener ID del producto de la URL
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function renderProductDetail() {
    const id = getProductId();
    const prod = products.find(p => p.id === id);
    const section = document.getElementById('product-detail');
    if (!prod) {
        section.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }
    let sizeBtns = prod.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('');
    section.innerHTML = `
        <div class="product-card" style="max-width:400px;margin:auto;">
            <img src="${prod.image}" alt="${prod.name}">
            <h2>${prod.name}</h2>
            <p><b>Precio:</b> $${prod.price.toFixed(2)}</p>
            <div><b>Tallas:</b> <span id="sizes">${sizeBtns}</span></div>
            <p style="margin-top:10px;"><b>Detalles:</b> ${prod.details}</p>
            <button id="add-to-cart-btn" style="margin-top:18px;">Agregar al carrito</button>
        </div>
    `;

    // Selección de talla
    let selectedSize = null;
    section.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            section.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.getAttribute('data-size');
        });
    });

    // Agregar al carrito
    document.getElementById('add-to-cart-btn').onclick = function() {
        if (!selectedSize) {
            alert('Selecciona una talla.');
            return;
        }
        addToCart(prod, selectedSize);
        alert('Producto añadido al carrito');
    };
}
renderProductDetail();

// Carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((acc, item) => acc + item.qty, 0);
}
function addToCart(product, size) {
    const idx = cart.findIndex(item => item.id === product.id && item.size === size);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, size, qty: 1, image: product.image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
updateCartCount();

// Mostrar carrito
document.getElementById('cart-icon').onclick = function() {
    openCartModal();
};
function openCartModal() {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('cart-modal-content');
    if (cart.length === 0) {
        content.innerHTML = `<span class="modal-close" id="close-cart-modal">&times;</span>
        <h2>Carrito</h2><p>Tu carrito está vacío.</p>`;
    } else {
        let items = cart.map((item, i) => `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                <img src="${item.image}" alt="${item.name}" style="width:50px;border-radius:6px;">
                <div>
                    <b>${item.name}</b> <br>
                    Talla: ${item.size} <br>
                    $${item.price.toFixed(2)} x ${item.qty}
                </div>
                <button style="margin-left:auto;" onclick="removeFromCart(${i})">Eliminar</button>
            </div>
        `).join('');
        let total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
        content.innerHTML = `
            <span class="modal-close" id="close-cart-modal">&times;</span>
            <h2>Carrito</h2>
            ${items}
            <hr>
            <b>Total: $${total.toFixed(2)}</b>
            <button id="pay-btn" style="margin-top:16px;width:100%;">Pagar</button>
        `;
    }
    modal.style.display = 'flex';
    document.getElementById('close-cart-modal').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    // Mostrar formulario de pago al dar click en "Pagar"
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.onclick = function() {
            showPaymentForm();
        };
    }
}

// Formulario de pago
function showPaymentForm() {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('cart-modal-content');
    let total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    content.innerHTML = `
        <span class="modal-close" id="close-cart-modal">&times;</span>
        <h2>Pago</h2>
        <form id="payment-form" style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
            <label for="direccion">Dirección de envío:</label>
            <input type="text" id="direccion" name="direccion" required placeholder="Calle, número, ciudad, etc.">
            <label for="metodo">Método de pago:</label>
            <select id="metodo" name="metodo" required>
                <option value="">Selecciona un método</option>
                <option value="tarjeta">Tarjeta de crédito/débito</option>
                <option value="paypal">PayPal</option>
                <option value="oxxo">OXXO</option>
            </select>
            <button type="submit" style="margin-top:10px;">Confirmar pago de $${total.toFixed(2)}</button>
        </form>
    `;
    document.getElementById('close-cart-modal').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    document.getElementById('payment-form').onsubmit = function(e) {
        e.preventDefault();
        const direccion = document.getElementById('direccion').value.trim();
        const metodo = document.getElementById('metodo').value;
        if (!direccion || !metodo) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        alert('¡Pago realizado con éxito!\n\nDirección: ' + direccion + '\nMétodo: ' + metodo.toUpperCase());
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        modal.style.display = 'none';
    };
}
// Eliminar del carrito (global para inline onclick)
window.removeFromCart = function(idx) {
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    openCartModal();
};