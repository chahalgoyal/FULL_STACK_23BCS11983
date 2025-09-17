const products = [
    { id: 1, name: "Smartwatch", category: "gadgets", price: 7500 },
    { id: 2, name: "Sneakers", category: "fashion", price: 3200 },
    { id: 3, name: "Bluetooth Speaker", category: "gadgets", price: 4500 },
    { id: 4, name: "Wall Clock", category: "home", price: 1200 },
    { id: 5, name: "Tablet", category: "gadgets", price: 18000 },
    { id: 6, name: "Denim Jacket", category: "fashion", price: 4200 },
    { id: 7, name: "Sofa Cushion", category: "home", price: 900 },
    { id: 8, name: "Wireless Earbuds", category: "gadgets", price: 2600 },
    { id: 9, name: "Handbag", category: "fashion", price: 5500 },
    { id: 10, name: "Table Lamp", category: "home", price: 2200 }
];

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('category-filter');

function displayProducts(filteredProducts) {
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="price">₹${product.price}</p>
        </div>
    `).join('');
}

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    let filteredProducts;
    if (selectedCategory === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    displayProducts(filteredProducts);
}

categoryFilter.addEventListener('change', filterProducts);

document.addEventListener('DOMContentLoaded', () => {
    filterProducts();
});