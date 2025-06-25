// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    initProductPage();
});

function initProductPage() {
    const quantityDisplay = document.getElementById('quantityDisplay');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    let currentQuantity = 1;
    
    // Get product data from URL or page
    const productSlug = getProductSlugFromURL();
    const product = getProductBySlug(productSlug);
    
    if (!product) {
        console.error('Product not found');
        return;
    }
    
    // Quantity controls
    if (decreaseBtn && increaseBtn && quantityDisplay) {
        decreaseBtn.addEventListener('click', function() {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityDisplay.textContent = currentQuantity;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            currentQuantity++;
            quantityDisplay.textContent = currentQuantity;
        });
    }
    
    // Add to cart
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            if (typeof cart !== 'undefined') {
                cart.addItem(product.id, currentQuantity);
                // Reset quantity to 1 after adding
                currentQuantity = 1;
                quantityDisplay.textContent = currentQuantity;
            } else {
                console.error('Cart not available');
            }
        });
    }
}

function getProductSlugFromURL() {
    // Extract product slug from the current page URL
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    // Remove .html extension and 'product-' prefix
    const slug = filename.replace('.html', '').replace('product-', '');
    
    return slug;
}

// Dynamic product page loading (if needed)
function loadProductData(slug) {
    const product = getProductBySlug(slug);
    
    if (!product) {
        console.error('Product not found:', slug);
        return;
    }
    
    // Update page content dynamically
    updateProductContent(product);
}

function updateProductContent(product) {
    // Update page title
    document.title = `${product.name} - Audiophile`;
    
    // Update product info
    const newProductTag = document.querySelector('.new-product');
    if (newProductTag) {
        newProductTag.style.display = product.new ? 'block' : 'none';
    }
    
    const productTitle = document.querySelector('.product-info h1');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    const productDescription = document.querySelector('.product-info p');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    const productPrice = document.querySelector('.price');
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }
    
    // Update product image
    const productImage = document.querySelector('.product-image img');
    if (productImage) {
        productImage.src = product.image.desktop;
        productImage.alt = product.name;
    }
    
    // Update features
    const featuresText = document.querySelector('.features-text');
    if (featuresText && product.features) {
        const featuresParagraphs = product.features.split('\n\n');
        let featuresHTML = '<h2>FEATURES</h2>';
        featuresParagraphs.forEach(paragraph => {
            featuresHTML += `<p>${paragraph}</p>`;
        });
        featuresText.innerHTML = featuresHTML;
    }
    
    // Update in the box
    const inTheBox = document.querySelector('.in-the-box');
    if (inTheBox && product.includes) {
        let boxHTML = '<h3>IN THE BOX</h3><ul>';
        product.includes.forEach(item => {
            boxHTML += `<li><span class="quantity">${item.quantity}x</span> ${item.item}</li>`;
        });
        boxHTML += '</ul>';
        inTheBox.innerHTML = boxHTML;
    }
    
    // Update gallery
    if (product.gallery) {
        const galleryImages = document.querySelectorAll('.gallery-grid img');
        if (galleryImages.length >= 3) {
            galleryImages[0].src = product.gallery.first.desktop;
            galleryImages[1].src = product.gallery.second.desktop;
            galleryImages[2].src = product.gallery.third.desktop;
        }
    }
    
    // Update recommendations
    if (product.others) {
        const recommendations = document.querySelectorAll('.recommendation-item');
        product.others.forEach((other, index) => {
            if (recommendations[index]) {
                const img = recommendations[index].querySelector('img');
                const title = recommendations[index].querySelector('h3');
                const link = recommendations[index].querySelector('a');
                
                if (img) img.src = other.image.desktop;
                if (title) title.textContent = other.name;
                if (link) link.href = `product-${other.slug}.html`;
            }
        });
    }
}

// Responsive image handling for product pages
function updateProductImages() {
    const productSlug = getProductSlugFromURL();
    const product = getProductBySlug(productSlug);
    
    if (!product) return;
    
    const screenWidth = window.innerWidth;
    
    // Update main product image
    const productImage = document.querySelector('.product-image img');
    if (productImage) {
        if (screenWidth < 768) {
            productImage.src = product.image.mobile;
        } else if (screenWidth < 1024) {
            productImage.src = product.image.tablet;
        } else {
            productImage.src = product.image.desktop;
        }
    }
    
    // Update gallery images
    if (product.gallery) {
        const galleryImages = document.querySelectorAll('.gallery-grid img');
        if (galleryImages.length >= 3) {
            if (screenWidth < 768) {
                galleryImages[0].src = product.gallery.first.mobile;
                galleryImages[1].src = product.gallery.second.mobile;
                galleryImages[2].src = product.gallery.third.mobile;
            } else if (screenWidth < 1024) {
                galleryImages[0].src = product.gallery.first.tablet;
                galleryImages[1].src = product.gallery.second.tablet;
                galleryImages[2].src = product.gallery.third.tablet;
            } else {
                galleryImages[0].src = product.gallery.first.desktop;
                galleryImages[1].src = product.gallery.second.desktop;
                galleryImages[2].src = product.gallery.third.desktop;
            }
        }
    }
}

// Update images on resize
window.addEventListener('resize', debounce(updateProductImages, 250));

// Initialize responsive images
document.addEventListener('DOMContentLoaded', updateProductImages); 