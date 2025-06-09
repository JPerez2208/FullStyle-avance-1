document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const productsSection = document.getElementById('products-section');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    // Mostrar formulario de registro
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Mostrar formulario de login
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Registrar usuario (localStorage)
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value.trim().toLowerCase();
        const username = document.getElementById('register-username').value.trim();
        const birthdate = document.getElementById('register-birthdate').value;
        const password = document.getElementById('register-password').value;
        const password2 = document.getElementById('register-password2').value;

        if (!email || !username || !birthdate || !password || !password2) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (password !== password2) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Validar si ya existe el usuario o correo
        if (localStorage.getItem('user_email_' + email) || localStorage.getItem('user_' + username)) {
            alert('El correo o usuario ya existe.');
            return;
        }
        // Guardar usuario (por correo y por usuario)
        const userData = JSON.stringify({ email, username, birthdate, password });
        localStorage.setItem('user_email_' + email, userData);
        localStorage.setItem('user_' + username, userData);
        alert('Registro exitoso. Inicia sesión.');
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Login usuario (localStorage)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userInput = document.getElementById('login-user').value.trim();
        const password = document.getElementById('login-password').value;
        const userObj = findUser(userInput);
        if (userObj && userObj.password === password) {
            sessionStorage.setItem('userName', userObj.username);
            sessionStorage.setItem('userEmail', userObj.email);
            sessionStorage.setItem('userBirthdate', userObj.birthdate || '');
            sessionStorage.setItem('isAdmin', userObj.isAdmin ? '1' : '');
            showWelcome(userObj.username);
            return;
        }
        alert('Usuario/correo o contraseña incorrectos.');
    });

    function showWelcome(username) {
        welcomeMessage.textContent = `Bienvenido, ${username}!`;
        loginSection.style.display = 'none';
        registerSection.style.display = 'none';
        productsSection.style.display = 'block';

        // Mostrar usuario en header
        const userInfo = document.getElementById('user-info');
        const userNameSpan = document.getElementById('user-name');
        if (userInfo && userNameSpan) {
            userNameSpan.textContent = username;
            userInfo.style.display = 'inline-block';
        }
    }

    // Menú de usuario
    const userNameSpan = document.getElementById('user-name');
    const userMenu = document.getElementById('user-menu');
    const accountInfo = document.getElementById('account-info');
    if (userNameSpan && userMenu) {
        userNameSpan.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function() {
            userMenu.style.display = 'none';
        });

        // Evitar que el menú se cierre al hacer click dentro
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Mostrar descripción de la cuenta al hacer clic en "Información de cuenta"
    if (accountInfo) {
        accountInfo.addEventListener('click', function() {
            const username = sessionStorage.getItem('userName') || '';
            const email = sessionStorage.getItem('userEmail') || '';
            const birthdate = sessionStorage.getItem('userBirthdate') || '';
            alert(
                `Información de la cuenta:\n\n` +
                `Usuario: ${username}\n` +
                `Correo: ${email}\n` +
                `Fecha de nacimiento: ${birthdate}\n\n` +
                `¡Gracias por ser parte de FullStyle!`
            );
        });
    }

    // Logout desde menú
    const logoutMenuBtn = document.getElementById('logout-menu-btn');
    if (logoutMenuBtn) {
        logoutMenuBtn.addEventListener('click', function() {
            sessionStorage.clear();
            productsSection.style.display = 'none';
            loginSection.style.display = 'block';
            welcomeMessage.textContent = '';
            document.getElementById('user-info').style.display = 'none';
            userMenu.style.display = 'none';
        });
    }

    // Auto-login si hay sesión
    const savedUser = sessionStorage.getItem('userName');
    if (savedUser) {
        showWelcome(savedUser);
    }

    // Productos de ejemplo (puedes agregar más)
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
        },
        {
            id: 5,
            name: "Camisa Minecraft",
            image: "img/camisas/BLACK BACK (Minecraft).png",
            price: 22,
            sizes: ["S", "M", "L", "XL"],
            details: "Camisa negra con diseño de Minecraft, perfecta para fans del juego."
        },
        {
            id: 6,
            name: "Camisa Negra Frente",
            image: "img/camisas/BLACK FRONT.png",
            price: 20,
            sizes: ["S", "M", "L", "XL"],
            details: "Camisa negra con diseño minimalista en la parte frontal."
        },
        {
            id: 7,
            name: "Camisa Blanca",
            image: "img/camisas/WHITE_FRONT.png",
            price: 18,
            sizes: ["S", "M", "L", "XL"],
            details: "Camisa blanca básica, ideal para cualquier ocasión."
        },
        // --- SUÉTERES ADICIONALES ---
        {
            id: 8,
            name: "Suéter Azul Marino",
            image: "img/sueteres/navy_blue.jpg",
            price: 38,
            sizes: ["M", "L", "XL"],
            details: "Suéter azul marino elegante y cálido, ideal para días frescos."
        },
        {
            id: 9,
            name: "Suéter Rojo Clásico",
            image: "img/sueteres/red_classic.jpg",
            price: 36,
            sizes: ["S", "M", "L", "XL"],
            details: "Suéter rojo clásico, perfecto para destacar en cualquier ocasión."
        },
        {
            id: 10,
            name: "Suéter Gris con Cremallera",
            image: "img/sueteres/grey_zip.jpg",
            price: 40,
            sizes: ["M", "L", "XL"],
            details: "Suéter gris con cremallera, práctico y moderno para el invierno."
        }
    ];

    // Renderizar productos
    function renderProducts() {
        const grid = document.querySelector('.products-grid');
        if (!grid) return;
        grid.innerHTML = '';
        products.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}">
                <h3>${prod.name}</h3>
                <p>$${prod.price.toFixed(2)}</p>
                <button data-id="${prod.id}">Añadir al carrito</button>
            `;
            // Al hacer click en la tarjeta (excepto el botón), abre el modal
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') return;
                openProductModal(prod.id);
            });
            // Al hacer click en el botón, también abre el modal
            card.querySelector('button').addEventListener('click', function(e) {
                e.stopPropagation();
                openProductModal(prod.id);
            });
            grid.appendChild(card);
        });
    }
    renderProducts();

    // Agrega esto después de renderProducts();
    document.querySelectorAll('.catalog-main-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.catalog-main-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const catalog = btn.getAttribute('data-catalog');
            document.querySelectorAll('#catalog-content .catalog-group').forEach(group => {
                group.style.display = (group.getAttribute('data-catalog') === catalog) ? '' : 'none';
            });
        });
    });
    // Por defecto, activa "Toda la ropa"
    document.querySelector('.catalog-main-btn[data-catalog="all"]').classList.add('active');
    document.querySelectorAll('#catalog-content .catalog-group').forEach(group => {
        group.style.display = (group.getAttribute('data-catalog') === "all") ? '' : 'none';
    });

    // Modal de producto
    function openProductModal(productId) {
        const prod = products.find(p => p.id === productId);
        if (!prod) return;
        const modal = document.getElementById('product-modal');
        const content = document.getElementById('product-modal-content');
        let sizeBtns = prod.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('');
        content.innerHTML = `
            <span class="modal-close" id="close-product-modal">&times;</span>
            <img src="${prod.image}" alt="${prod.name}" style="width:180px;display:block;margin:0 auto 18px auto;">
            <h2>${prod.name}</h2>
            <p><b>Precio:</b> $${prod.price.toFixed(2)}</p>
            <div><b>Tallas:</b> <span id="sizes">${sizeBtns}</span></div>
            <p style="margin-top:10px;"><b>Detalles:</b> ${prod.details}</p>
            <button id="add-to-cart-btn" style="margin-top:18px;">Agregar al carrito</button>
        `;
        modal.style.display = 'flex';

        // Selección de talla
        let selectedSize = null;
        content.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                content.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.getAttribute('data-size');
            });
        });

        // Cerrar modal
        document.getElementById('close-product-modal').onclick = () => modal.style.display = 'none';
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

        // Agregar al carrito
        document.getElementById('add-to-cart-btn').onclick = function() {
            if (!selectedSize) {
                alert('Selecciona una talla.');
                return;
            }
            addToCart(prod, selectedSize);
            modal.style.display = 'none';
        };
    }

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

    // Mostrar carrito: ahora redirige a carrito.html
    document.getElementById('cart-icon').onclick = function() {
        window.location.href = "carrito.html";
    };

    // Usuario Admin por defecto
    const defaultUsers = [
        {
            username: "Admin",
            email: "admin@fullstyle.com",
            password: "Admin123", // Puedes cambiar la contraseña
            isAdmin: true
        }
    ];

    // Guardar usuario Admin si no existe
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // --- FUNCIÓN PARA BUSCAR USUARIO (incluye Admin) ---
    function findUser(userInput) {
        // Buscar en usuarios normales
        let userData = localStorage.getItem('user_email_' + userInput);
        if (!userData) userData = localStorage.getItem('user_' + userInput);

        // Buscar en usuarios tipo array (Admin)
        const usersArr = JSON.parse(localStorage.getItem('users') || '[]');
        let adminUser = usersArr.find(u =>
            u.email.toLowerCase() === userInput.toLowerCase() ||
            u.username.toLowerCase() === userInput.toLowerCase()
        );
        if (adminUser) {
            // Unifica formato con usuarios normales
            return {
                email: adminUser.email,
                username: adminUser.username,
                password: adminUser.password,
                isAdmin: adminUser.isAdmin || false
            };
        }
        if (userData) {
            const userObj = JSON.parse(userData);
            userObj.isAdmin = false;
            return userObj;
        }
        return null;
    }
});