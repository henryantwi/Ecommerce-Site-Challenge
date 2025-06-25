// Main JavaScript functionality for Audiophile site
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initResponsiveImages();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;

    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking navigation links
        const mobileNavLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
}

// Scroll Effects
function initScrollEffects() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .featured-product, .about-content').forEach(el => {
        observer.observe(el);
    });
}

// Responsive Images
function initResponsiveImages() {
    function updateImageSources() {
        const images = document.querySelectorAll('[data-mobile][data-tablet][data-desktop]');
        
        images.forEach(img => {
            const mobile = img.dataset.mobile;
            const tablet = img.dataset.tablet;
            const desktop = img.dataset.desktop;
            
            if (window.innerWidth < 768) {
                img.src = mobile;
            } else if (window.innerWidth < 1024) {
                img.src = tablet;
            } else {
                img.src = desktop;
            }
        });
    }

    // Update on load and resize
    updateImageSources();
    window.addEventListener('resize', debounce(updateImageSources, 250));
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Format currency helper
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Show success message
function showSuccessMessage(message, duration = 3000) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Trigger animation
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, duration);
}

// Show error message
function showErrorMessage(message, duration = 3000) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #dc3545;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Trigger animation
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, duration);
}

// Loading state helper
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
        button.classList.remove('loading');
    }
}

// Handle page navigation
function navigateToPage(url) {
    // Add a small delay to allow for animations
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d87d4a;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top on all pages
initBackToTop();

// Export functions for use in other files
window.AudiophileUtils = {
    validateEmail,
    validatePhone,
    formatCurrency,
    showSuccessMessage,
    showErrorMessage,
    setLoadingState,
    navigateToPage,
    debounce
}; 