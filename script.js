async function displayCard(categoryName) {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    var data = await response.json();

    const productContainer = document.getElementById('product-card');
    productContainer.innerHTML = '';

    const category = data.categories.find(cat => cat.category_name === categoryName);

    if (category) {
        category.category_products.forEach(product => {
            const discount = ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(2);

            const productCard = document.createElement('div');
            productCard.classList.add('product-container');

            const title = product.title.length > 10 ? product.title.substring(0, 10) + '...' : product.title;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
                <div class="product-title">${title}</div>
                <span class="dot"></span>
                <div class="product-vendor">  ${product.vendor}</div>
                <div>
                    <span class="product-price">Rs ${product.price}</span>
                    <span class="product-compare-at-price">${product.compare_at_price}</span>
                    <span class="product-discount">${discount}% off</span>
                </div>
                <button class="cart">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        });
    }
}
displayCard('Men');