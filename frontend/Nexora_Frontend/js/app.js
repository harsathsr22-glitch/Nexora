let PRODUCTS = [];
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products", {
        signal: AbortSignal.timeout(3000)
        });

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const data = await response.json();

        PRODUCTS = data.map(p => ({
            ...p,
            id: p._id
        }));

        console.log("Products loaded from MongoDB");

    } catch (error) {
        console.log("Using local product data:", error.message);

        PRODUCTS = [
            {
                id: "headphones",
                name: "Wireless Headphones",
                category: "Electronics",
                price: 2499,
                old: 3299,
                rating: 4.7,
                image: "images/headphones.jpg",
                description: "Premium wireless headphones"
            },
            {
                id: "shoes",
                name: "Running Shoes",
                category: "Fashion",
                price: 3299,
                old: 4199,
                rating: 4.5,
                image: "images/shoes.jpg",
                description: "Comfortable running shoes"
            },
            {
                id: "watch",
                name: "Smart Watch",
                category: "Electronics",
                price: 4999,
                old: 5999,
                rating: 4.8,
                image: "images/watch.jpg",
                description: "Modern smart watch"
            }
        ];
    }
}
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const read = key => JSON.parse(localStorage.getItem(key)||"[]");
const save = (key,val) => localStorage.setItem(key,JSON.stringify(val));
const productById = id => PRODUCTS.find(p => String(p.id) === String(id));
function header(){return `<div class="topbar">Welcome to Nexora — smart shopping, everyday value</div><header class="navbar"><div class="container navinner"><a class="logo" href="index.html">♧ Nexora</a><nav class="navlinks"><a href="index.html">Home</a><a href="shopping.html">Shop</a><a href="shopping.html">Categories</a><a href="shopping.html">Offers</a><a href="index.html#contact">Contact</a></nav><div class="navtools"><form class="searchbox" action="shopping.html"><input name="q" placeholder="Search products..." aria-label="Search products"><button>⌕</button></form><a class="iconlink" href="wishlist.html">♡</a><a class="iconlink" href="cart.html">🛒 <span id="cart-count">0</span></a><a class="iconlink" href="login.html">♙</a></div><a class="mobilemenu" href="shopping.html">☰</a></div></header>`}
function footer(){return `<footer class="footer" id="contact"><div class="container"><div class="footergrid"><div><a class="logo" href="index.html" style="color:white">Nexora</a><p>Your one-stop online store for electronics, fashion, food and home essentials.</p></div><div><b>Quick Links</b><a href="index.html">Home</a><a href="shopping.html">Shop</a><a href="cart.html">Cart</a></div><div><b>Customer Support</b><a href="#">Help Centre</a><a href="#">Returns</a><a href="#">Shipping</a></div><div><b>Stay Connected</b><p>Get updates about new arrivals and offers.</p><form onsubmit="event.preventDefault();alert('Thanks for subscribing!')"><input placeholder="Email address" type="email" required style="padding:10px;width:100%;border-radius:8px;border:0"><button style="margin-top:8px">Subscribe</button></form></div></div><div class="footerbottom">© 2026 Nexora. All rights reserved.</div></div></footer>`}
function shell(content){document.body.innerHTML=header()+content+footer();updateCartCount()}
function updateCartCount(){const el=document.getElementById("cart-count");if(el)el.textContent=read("nexora-cart").reduce((s,x)=>s+x.qty,0)}
function productCard(p) {
    return `<article class="product-card">
        <a href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}"
            onerror="this.src='https://placehold.co/500x400?text=Nexora+Product'">
        </a>
        <div class="product-info">
            <span class="tag">${p.category}</span>
            <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="muted">★ ${p.rating} rating</div>
            <div class="price">${money(p.price)}
                <span class="oldprice">${money(p.old)}</span>
            </div>
            <div class="card-actions">
                <a class="btn" href="product.html?id=${p.id}">View Details</a>
                <button class="secondary" onclick="toggleWishlist('${p.id}')">
    ♡ Wishlist
</button>
<button class="secondary" onclick="addToCart('${p.id}')">
        + Cart
    </button>
            </div>
        </div>
    </article>`;
}
function renderProducts(target,items){const el=document.querySelector(target);if(el)el.innerHTML=items.map(productCard).join("")}
function addToCart(id){let cart=read("nexora-cart");let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save("nexora-cart",cart);updateCartCount();alert("Product added to cart!")}
function toggleWishlist(id) {
    let list = read("nexora-wishlist");

    id = String(id);

    list = list.map(String);

    list = list.includes(id)
        ? list.filter(x => x !== id)
        : [...list, id];

    save("nexora-wishlist", list);

    alert("Wishlist updated");
}
function home(){shell(`<main class="container"><section class="hero"><div><div class="eyebrow">Welcome to Nexora</div><h1>Shop Smart,<br>Shop <span>Nexora</span></h1><p>Discover the latest in electronics, fashion, food and home essentials at great prices.</p><a class="btn" href="shopping.html">Shop Now →</a></div><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=80" alt="Online shopping"></section><section class="section"><div class="sectionhead"><h2>Shop by Category</h2><a href="shopping.html">View all →</a></div><div class="category-grid">${["Electronics","Fashion","Food","Home"].map((c,i)=>`<a class="category" href="shopping.html?category=${c}"><div style="font-size:40px">${["🎧","👟","🍕","🏠"][i]}</div><b>${c}</b></a>`).join("")}</div></section><section class="section"><div class="sectionhead"><h2>Featured Products</h2><a href="shopping.html">Explore shop →</a></div><div class="product-grid" id="featured"></div></section></main>`);renderProducts("#featured",PRODUCTS.slice(0,4))}
function shopping(){const params=new URLSearchParams(location.search);shell(`<main class="container"><div class="breadcrumb">Home / Shopping</div><section class="hero"><div><div class="eyebrow">Explore Nexora</div><h1>Find your next <span>favourite</span></h1><p>Browse hand-picked products across your favourite categories.</p></div><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" alt="Shopping"></section><div class="layout"><aside class="sidebar"><h3>Filters</h3><div class="filter-group"><b>Category</b>${["All","Electronics","Fashion","Food","Home"].map(c=>`<label><input type="radio" name="cat" value="${c}" ${params.get("category")===c||(!params.get("category")&&c==="All")?"checked":""}> ${c}</label>`).join("")}</div><div class="filter-group"><b>Search</b><input id="filter-search" placeholder="Product name..." style="width:100%;padding:9px;border:1px solid #ddd;border-radius:8px"></div></aside><section><div class="toolbar"><h2>All Products</h2><select id="sort"><option value="default">Sort by</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="name">Name</option></select></div><div class="product-grid" id="shop-products"></div></section></div></main>`);let cat=params.get("category")||"All",q=params.get("q")||"";document.querySelector("#filter-search").value=q;function refresh(){let list=PRODUCTS.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(document.querySelector("#filter-search").value.toLowerCase()));let s=document.querySelector("#sort").value;if(s==="low")list.sort((a,b)=>a.price-b.price);if(s==="high")list.sort((a,b)=>b.price-a.price);if(s==="name")list.sort((a,b)=>a.name.localeCompare(b.name));renderProducts("#shop-products",list)}document.querySelectorAll("[name=cat]").forEach(x=>x.addEventListener("change",()=>{cat=x.value;refresh()}));document.querySelector("#filter-search").addEventListener("input",refresh);document.querySelector("#sort").addEventListener("change",refresh);refresh()}
function product(){let p=productById(new URLSearchParams(location.search).get("id"))||PRODUCTS[0];shell(`<main class="container"><div class="breadcrumb"><a href="index.html">Home</a> / <a href="shopping.html">Shop</a> / ${p.name}</div><section class="details"><div><div class="details-main"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/500x500?text=Nexora'"></div><div class="thumbs"><img src="${p.image}" alt="Product view"></div></div><div><span class="tag">Popular choice</span><h1>${p.name}</h1><div>⭐ ${p.rating} / 5 customer rating</div><p class="stock">● In stock</p><p class="price" style="font-size:30px">${money(p.price)} <span class="oldprice">${money(p.old)}</span></p><p>${p.description}</p><div class="qty"><label>Quantity</label><button class="secondary" onclick="changeQty(-1)">−</button><b id="qty">1</b><button class="secondary" onclick="changeQty(1)">＋</button></div><div class="card-actions"><button onclick="addToCart(${p.id})">Add to Cart</button><button class="secondary" onclick="toggleWishlist(${p.id})">♡ Wishlist</button></div><div class="benefits"><div class="benefit">🚚<br>Delivery</div><div class="benefit">✓<br>Quality</div><div class="benefit">↩<br>Easy returns</div><div class="benefit">🔒<br>Secure checkout</div></div><h3>Product information</h3><p class="muted">Category: ${p.category}<br>SKU: NX-${p.id.toString().padStart(4,"0")}</p></div></section><section class="section"><h2>You may also like</h2><div class="product-grid" id="related"></div></section></main>`);window.changeQty=n=>{let el=document.querySelector("#qty");el.textContent=Math.max(1,Number(el.textContent)+n)};renderProducts("#related",PRODUCTS.filter(x=>x.id!==p.id).slice(0,4))}

function cart() {
    let items = read("nexora-cart");

    let total = () =>
        items.reduce((s, x) =>
            s + (productById(x.id)?.price || 0) * x.qty, 0
        );

    shell(`
        <main class="container section">
            <h1>Your Shopping Cart</h1>
            <div id="cartcontent"></div>
        </main>
    `);

    function draw() {
        items = read("nexora-cart");

        let el = document.querySelector("#cartcontent");

        if (!items.length) {
            el.innerHTML = `
                <div class="empty">
                    <h2>Your cart is empty</h2>
                    <p class="muted">Explore Nexora and add something you love.</p>
                    <a class="btn" href="shopping.html">Continue Shopping</a>
                </div>
            `;
            updateCartCount();
            return;
        }

        el.innerHTML = `
            <div class="two-col">
                <div class="panel">
                    ${items.map(x => {
                        let p = productById(x.id);

                        if (!p) return "";

                        return `
                            <div class="cartrow">
                                <img src="${p.image}" alt="${p.name}">

                                <div>
                                    <b>${p.name}</b>
                                    <div class="price">${money(p.price)}</div>

                                    <button class="secondary"
                                        onclick="removeItem('${p.id}')">
                                        Remove
                                    </button>
                                </div>

                                <div>
                                    <button class="secondary"
                                        onclick="qtyItem('${p.id}', -1)">−</button>

                                    ${x.qty}

                                    <button class="secondary"
                                        onclick="qtyItem('${p.id}', 1)">＋</button>
                                </div>

                                <b>${money(p.price * x.qty)}</b>
                            </div>
                        `;
                    }).join("")}
                </div>

                <aside class="summary">
                    <h2>Order Summary</h2>
                    <p>Subtotal <b style="float:right">${money(total())}</b></p>
                    <p>Delivery <b style="float:right">Free</b></p>
                    <hr>
                    <h2>Total
                        <span style="float:right;color:var(--purple)">
                            ${money(total())}
                        </span>
                    </h2>
                    <a class="btn" style="width:100%;text-align:center"
                        href="checkout.html">
                        Proceed to Checkout
                    </a>
                </aside>
            </div>
        `;

        updateCartCount();
    }

    window.removeItem = id => {
        items = items.filter(x => String(x.id) !== String(id));
        save("nexora-cart", items);
        draw();
    };

    window.qtyItem = (id, n) => {
        items = items.map(x =>
            String(x.id) === String(id)
                ? { ...x, qty: Math.max(1, x.qty + n) }
                : x
        );

        save("nexora-cart", items);
        draw();
    };

    draw();
}


function wishlist() {
    let ids = read("nexora-wishlist").map(String);

    shell(`
        <main class="container section">
            <h1>My Wishlist</h1>
            <div class="product-grid" id="wishitems"></div>
        </main>
    `);

    let list = PRODUCTS.filter(p =>
        ids.includes(String(p.id))
    );

    document.querySelector("#wishitems").innerHTML = list.length
        ? list.map(p =>
            productCard(p) +
            `<button class="secondary"
                onclick="toggleWishlist('${p.id}'); location.reload()">
                Remove from wishlist
            </button>`
        ).join("")
        : `<div class="empty">
            Your wishlist is empty.
            <a class="btn" href="shopping.html">Explore products</a>
        </div>`;
}

function auth(register=false){shell(`<main class="container"><form class="formwrap" id="authform"><div class="eyebrow">Nexora account</div><h1>${register?"Create account":"Welcome back"}</h1><p class="muted">${register?"Register to enjoy a smoother shopping experience.":"Sign in to continue shopping."}</p>${register?`<div class="field"><label>Full name</label><input required placeholder="Your name"></div>`:""}<div class="field"><label>Email address</label><input type="email" required placeholder="you@example.com"></div><div class="field"><label>Password</label><input type="password" required minlength="6" placeholder="At least 6 characters"></div><button style="width:100%">${register?"Create Account":"Login"}</button><p class="muted">${register?'Already have an account? <a href="login.html">Login</a>':'New to Nexora? <a href="register.html">Create an account</a>'}</p><div id="authmsg"></div></form></main>`);document.querySelector("#authform").onsubmit=e=>{e.preventDefault();document.querySelector("#authmsg").innerHTML='<div class="notice">Demo form submitted. Real account authentication will be connected to the backend later.</div>'}}


function checkout() {
    let items = read("nexora-cart");

    let validItems = items
        .map(x => ({
            ...x,
            product: productById(x.id)
        }))
        .filter(x => x.product);

    let total = validItems.reduce(
        (s, x) => s + x.product.price * x.qty,
        0
    );

    shell(`
        <main class="container section">
            <h1>Checkout</h1>

            ${validItems.length ? `
                <div class="two-col">
                    <form class="panel" id="checkoutform">
                        <h2>Delivery details</h2>

                        <div class="field">
                            <label>Full name</label>
                            <input required>
                        </div>

                        <div class="field">
                            <label>Phone number</label>
                            <input required type="tel">
                        </div>

                        <div class="field">
                            <label>Email</label>
                            <input required type="email">
                        </div>

                        <div class="field">
                            <label>Delivery address</label>
                            <textarea required rows="3"
                                style="width:100%;border:1px solid var(--line);border-radius:9px;padding:11px"></textarea>
                        </div>

                        <div class="field">
                            <label>Payment method</label>
                            <select>
                                <option>Cash on Delivery (demo)</option>
                                <option>Online payment (demo UI)</option>
                            </select>
                        </div>

                        <button type="submit">Place Order</button>
                        <div id="order-msg"></div>
                    </form>

                    <aside class="summary">
                        <h2>Order Summary</h2>

                        ${validItems.map(x => `
                            <p>
                                ${x.product.name} × ${x.qty}
                                <b style="float:right">
                                    ${money(x.product.price * x.qty)}
                                </b>
                            </p>
                        `).join("")}

                        <hr>
                        <h2>Total ${money(total)}</h2>
                    </aside>
                </div>
            ` : `
                <div class="empty">
                    Your cart is empty.
                    <a class="btn" href="shopping.html">Shop now</a>
                </div>
            `}
        </main>
    `);

    const form = document.getElementById("checkoutform");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll("input");
            const address = form.querySelector("textarea").value;
            const paymentMethod = form.querySelector("select").value;
            const message = document.getElementById("order-msg");

            const orderData = {
                customerName: inputs[0].value,
                phone: inputs[1].value,
                email: inputs[2].value,
                address: address,
                paymentMethod: paymentMethod,

                items: validItems.map(x => ({
                    productId: String(x.id),
                    name: x.product.name,
                    price: x.product.price,
                    qty: x.qty
                })),

                total: total
            };

            try {
                const response = await fetch(
                    "http://localhost:3000/api/orders",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(orderData)
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                message.innerHTML =
                    '<div class="notice">Order saved successfully!</div>';

                save("nexora-cart", []);
                updateCartCount();

            } catch (error) {
                message.textContent =
                    "Order failed: " + error.message;
            }
        });
    }
}


function adminNav(){return `<aside class="panel adminnav"><h3>Nexora Admin</h3><a href="admin.html">Overview</a><a href="admin-products.html">Products</a><a href="admin-orders.html">Orders</a><a href="shopping.html">View Store</a></aside>`}

async function admin() {
    shell(`
        <main class="container section">
            <div class="adminlayout">
                ${adminNav()}

                <section>
                    <h1>Dashboard Overview</h1>

                    <div class="stats">
                        <div class="stat">
                            Total Products
                            <strong id="totalProducts">0</strong>
                        </div>

                        <div class="stat">
                            Total Orders
                            <strong id="totalOrders">0</strong>
                        </div>

                        <div class="stat">
                            Pending Orders
                            <strong id="pendingOrders">0</strong>
                        </div>

                        <div class="stat">
                            Cart Items
                            <strong>${read("nexora-cart").reduce((s, x) => s + x.qty, 0)}</strong>
                        </div>
                    </div>

                    <div class="panel" style="margin-top:20px">
                        <h2>Welcome to Nexora Admin</h2>
                        <p class="muted">
                            Manage your products and monitor customer orders.
                        </p>
                        <a class="btn" href="admin-products.html">
                            Manage Products
                        </a>
                        <a class="btn" href="admin-orders.html">
                            Manage Orders
                        </a>
                    </div>

                    <h2 style="margin-top:25px">Recent Orders</h2>

                    <div class="panel">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="recentOrders"></tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    `);

    try {
        const [productResponse, orderResponse] = await Promise.all([
            fetch("http://localhost:3000/api/products"),
            fetch("http://localhost:3000/api/orders")
        ]);

        if (!productResponse.ok || !orderResponse.ok) {
            throw new Error("Could not load dashboard data");
        }

        const products = await productResponse.json();
        const orders = await orderResponse.json();

        document.querySelector("#totalProducts").textContent = products.length;
        document.querySelector("#totalOrders").textContent = orders.length;

        const pending = orders.filter(
            order => order.status === "Pending"
        ).length;

        document.querySelector("#pendingOrders").textContent = pending;
        const recent = orders.slice(0, 5);
        document.querySelector("#recentOrders").innerHTML =
            recent.length
                ? recent.map(order => `
                    <tr>
                        <td>${order.customerName || "Customer"}</td>
                        <td>${money(order.total || 0)}</td>
                        <td>${order.status || "Pending"}</td>
                    </tr>
                `).join("")
                : `<tr><td colspan="3">No orders available</td></tr>`;

    } catch (error) {
        document.querySelector("#recentOrders").innerHTML =
            `<tr><td colspan="3">Unable to load dashboard data</td></tr>`;

        console.error(error);
    }
}


async function adminProducts() {
    shell(`
        <main class="container section">
            <div class="adminlayout">
                ${adminNav()}

                <section>
                    <h1>Product Management</h1>

                    <div class="panel">
                        <h3>Add a Product</h3>

                        <form id="addproduct">
                            <div class="field">
                                <label>Product Name</label>
                                <input id="pname" required>
                            </div>

                            <div class="field">
                                <label>Price</label>
                                <input id="pprice" type="number" min="1" required>
                            </div>

                            <div class="field">
                                <label>Category</label>
                                <select id="pcat">
                                    <option>Electronics</option>
                                    <option>Fashion</option>
                                    <option>Food</option>
                                    <option>Home</option>
                                </select>
                            </div>

                            <button type="submit">Add Product</button>
                        </form>

                        <div id="pmsg"></div>
                    </div>

                    <h2>Current Catalogue</h2>

                    <div class="panel">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="productlist"></tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    `);

    const message = document.querySelector("#pmsg");
    const productList = document.querySelector("#productlist");

    async function showProducts() {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Could not load products");

        PRODUCTS = (await response.json()).map(p => ({
            ...p,
            id: p._id
        }));

        productList.innerHTML = PRODUCTS.map(p => `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${money(p.price)}</td>
                <td>
                    <button class="secondary edit-product" data-id="${p.id}">Edit</button>
                    <button class="secondary delete-product" data-id="${p.id}">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    await showProducts();

    document.querySelector("#addproduct").onsubmit = async e => {
        e.preventDefault();

        const price = Number(document.querySelector("#pprice").value);

        const product = {
            name: document.querySelector("#pname").value,
            price,
            old: price,
            category: document.querySelector("#pcat").value,
            rating: 0,
            image: "https://placehold.co/500x400?text=Nexora+Product",
            description: ""
        };

        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });

            if (!response.ok) throw new Error("Product could not be added");

            message.textContent = "Product added successfully!";
            e.target.reset();
            await showProducts();
        } catch (error) {
            message.textContent = error.message;
        }
    };

    productList.onclick = async e => {
        const id = e.target.dataset.id;
        if (!id) return;

        try {
            if (e.target.classList.contains("delete-product")) {
                if (!confirm("Delete this product?")) return;

                const response = await fetch(
                    `http://localhost:3000/api/products/${id}`,
                    { method: "DELETE" }
                );

                if (!response.ok) throw new Error("Delete failed");

                message.textContent = "Product deleted successfully!";
                await showProducts();
            }

            if (e.target.classList.contains("edit-product")) {
                const product = PRODUCTS.find(p => String(p.id) === String(id));
                if (!product) return;

                const name = prompt("Enter product name:", product.name);
                if (name === null) return;

                const priceInput = prompt("Enter product price:", product.price);
                if (priceInput === null) return;

                const price = Number(priceInput);
                if (!name.trim() || !Number.isFinite(price) || price <= 0) {
                    alert("Enter a valid name and price.");
                    return;
                }

                const response = await fetch(
                    `http://localhost:3000/api/products/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, price })
                    }
                );

                if (!response.ok) throw new Error("Update failed");

                message.textContent = "Product updated successfully!";
                await showProducts();
            }
        } catch (error) {
            message.textContent = error.message;
        }
    };
}



async function adminOrders() {
    shell(`
        <main class="container section">
            <div class="adminlayout">
                ${adminNav()}
                <section>
                    <h1>Order Management</h1>
                    <div class="panel" id="orders-container">
                        <p>Loading orders...</p>
                    </div>
                </section>
            </div>
        </main>
    `);

    const container = document.getElementById("orders-container");

    try {
        const response = await fetch("http://localhost:3000/api/orders");
        if (!response.ok) throw new Error("Unable to load orders");

        const orders = await response.json();

        if (!orders.length) {
            container.innerHTML = "<h2>No orders yet</h2>";
            return;
        }

        container.innerHTML = `
            <div style="overflow-x:auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.customerName}</td>
                                <td>${money(order.total)}</td>
                                <td>${order.status}</td>
                                <td>
                                    <select class="order-status"
                                        data-id="${order._id}">
                                        ${["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
                                            .map(status => `
                                                <option value="${status}"
                                                    ${order.status === status ? "selected" : ""}>
                                                    ${status}
                                                </option>
                                            `).join("")}
                                    </select>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll(".order-status").forEach(select => {
            select.addEventListener("change", async () => {
                try {
                    const result = await fetch(
                        `http://localhost:3000/api/orders/${select.dataset.id}/status`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                status: select.value
                            })
                        }
                    );

                    if (!result.ok) throw new Error("Update failed");

                    alert("Order status updated!");
                    await adminOrders();

                } catch (error) {
                    alert(error.message);
                }
            });
        });

    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
}


document.addEventListener("DOMContentLoaded", async () => {

    await loadProducts();

    const page = document.body.dataset.page;

    ({
        home,
        shopping,
        product,
        cart,
        wishlist,
        login: () => auth(false),
        register: () => auth(true),
        checkout,
        admin,
        adminProducts,
        adminOrders
    }[page] || home)();

});