// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    initCheckout();
});

function initCheckout() {
    // Check if cart has items
    if (!cart || cart.items.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    
    populateOrderSummary();
    initPaymentMethodToggle();
    initFormValidation();
    initConfirmationModal();
}

function populateOrderSummary() {
    const orderSummary = cart.getOrderSummary();
    
    // Populate items
    const summaryItems = document.getElementById('summaryItems');
    if (summaryItems) {
        summaryItems.innerHTML = '';
        
        orderSummary.items.forEach(item => {
            const summaryItem = createSummaryItem(item);
            summaryItems.appendChild(summaryItem);
        });
    }
    
    // Populate totals
    document.getElementById('summaryTotal').textContent = formatPrice(orderSummary.subtotal);
    document.getElementById('summaryShipping').textContent = formatPrice(orderSummary.shipping);
    document.getElementById('summaryVat').textContent = formatPrice(orderSummary.vat);
    document.getElementById('summaryGrandTotal').textContent = formatPrice(orderSummary.total);
}

function createSummaryItem(item) {
    const summaryItem = document.createElement('div');
    summaryItem.className = 'summary-item';
    summaryItem.innerHTML = `
        <div class="summary-item-image">
            <img src="${item.image.mobile}" alt="${item.name}">
        </div>
        <div class="summary-item-details">
            <div class="summary-item-name">${item.name.replace(/ (Headphones|Speaker|Earphones)$/, '')}</div>
            <div class="summary-item-price">${formatPrice(item.price)}</div>
        </div>
        <div class="summary-item-quantity">x${item.quantity}</div>
    `;
    return summaryItem;
}

function initPaymentMethodToggle() {
    const eMoneyRadio = document.getElementById('eMoney');
    const cashRadio = document.getElementById('cashOnDelivery');
    const eMoneyDetails = document.getElementById('eMoneyDetails');
    const cashOnDeliveryInfo = document.getElementById('cashOnDeliveryInfo');
    
    function togglePaymentDetails() {
        if (eMoneyRadio.checked) {
            eMoneyDetails.style.display = 'block';
            cashOnDeliveryInfo.style.display = 'none';
        } else {
            eMoneyDetails.style.display = 'none';
            cashOnDeliveryInfo.style.display = 'block';
        }
    }
    
    eMoneyRadio.addEventListener('change', togglePaymentDetails);
    cashRadio.addEventListener('change', togglePaymentDetails);
    
    // Initial toggle
    togglePaymentDetails();
}

function initFormValidation() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });
        
        input.addEventListener('input', function() {
            clearError(input);
        });
    });
}

function validateForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate payment method specific fields
    const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked').value;
    if (paymentMethod === 'e-money') {
        const eMoneyNumber = document.getElementById('eMoneyNumber');
        const eMoneyPin = document.getElementById('eMoneyPin');
        
        if (!validateField(eMoneyNumber, true)) {
            isValid = false;
        }
        if (!validateField(eMoneyPin, true)) {
            isValid = false;
        }
    }
    
    return isValid;
}

function validateField(field, isRequired = field.hasAttribute('required')) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    
    // Check if required field is empty
    if (isRequired && !value) {
        errorMessage = 'This field is required';
    } else if (value) {
        // Specific validation based on field type
        switch (fieldName) {
            case 'email':
                if (!validateEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'zipCode':
                if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    errorMessage = 'Please enter a valid ZIP code';
                }
                break;
            case 'eMoneyNumber':
                if (!/^\d{9}$/.test(value)) {
                    errorMessage = 'Please enter a valid 9-digit e-Money number';
                }
                break;
            case 'eMoneyPin':
                if (!/^\d{4}$/.test(value)) {
                    errorMessage = 'Please enter a valid 4-digit PIN';
                }
                break;
        }
    }
    
    if (errorMessage) {
        showError(field, errorMessage);
        return false;
    } else {
        clearError(field);
        return true;
    }
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function processOrder() {
    const submitBtn = document.querySelector('.checkout-submit');
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Simulate order processing
    setTimeout(() => {
        setLoadingState(submitBtn, false);
        showOrderConfirmation();
    }, 2000);
}

function showOrderConfirmation() {
    const modal = document.getElementById('confirmationModal');
    const confirmationItemsList = document.getElementById('confirmationItemsList');
    const confirmationTotal = document.getElementById('confirmationTotal');
    const viewMoreItems = document.getElementById('viewMoreItems');
    const remainingItemsCount = document.getElementById('remainingItemsCount');
    
    const orderSummary = cart.getOrderSummary();
    
    // Show first item and count of remaining items
    if (orderSummary.items.length > 0) {
        const firstItem = orderSummary.items[0];
        confirmationItemsList.innerHTML = `
            <div class="confirmation-item">
                <div class="confirmation-item-image">
                    <img src="${firstItem.image.mobile}" alt="${firstItem.name}">
                </div>
                <div class="confirmation-item-details">
                    <div class="confirmation-item-name">${firstItem.name.replace(/ (Headphones|Speaker|Earphones)$/, '')}</div>
                    <div class="confirmation-item-price">${formatPrice(firstItem.price)}</div>
                </div>
                <div class="confirmation-item-quantity">x${firstItem.quantity}</div>
            </div>
        `;
        
        if (orderSummary.items.length > 1) {
            const remainingCount = orderSummary.items.length - 1;
            remainingItemsCount.textContent = remainingCount;
            viewMoreItems.style.display = 'block';
        }
    }
    
    // Set total
    confirmationTotal.textContent = formatPrice(orderSummary.total);
    
    // Show modal
    modal.classList.add('active');
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

function initConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    
    backToHomeBtn.addEventListener('click', function() {
        // Clear cart
        cart.clearCart();
        
        // Close modal
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Redirect to home
        window.location.href = 'index.html';
    });
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Utility functions from main.js
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Processing...';
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
        button.classList.remove('loading');
    }
} 