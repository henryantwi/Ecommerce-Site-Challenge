# Audiophile E-commerce Website

A fully responsive, multi-page e-commerce website for premium audio equipment built with HTML, CSS, and JavaScript.

![Audiophile Preview](challenge-files/audio_file/preview.jpg)

## 🚀 Features

### Core Functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Shopping Cart**: Add, remove, and update product quantities
- **Product Catalog**: Browse headphones, speakers, and earphones
- **Detailed Product Pages**: Complete product information with image galleries
- **Checkout Process**: Form validation and order completion
- **Local Storage**: Cart persistence across page refreshes

### User Experience
- **Smooth Animations**: Hover effects and transitions throughout
- **Mobile Menu**: Responsive navigation for mobile devices
- **Form Validation**: Real-time validation with helpful error messages
- **Order Confirmation**: Success modal with order summary
- **Accessibility**: Semantic HTML and keyboard navigation support

### Technical Features
- **Modern CSS**: Grid, Flexbox, and CSS custom properties
- **Vanilla JavaScript**: No frameworks, clean ES6+ code
- **Local Data**: JSON-based product database
- **Progressive Enhancement**: Works without JavaScript (basic functionality)
- **SEO Friendly**: Semantic markup and proper meta tags

## 📁 Project Structure

```
Audiophile/
├── index.html                          # Homepage
├── headphones.html                     # Headphones category page
├── speakers.html                       # Speakers category page
├── earphones.html                      # Earphones category page
├── product-xx99-mark-two-headphones.html # Sample product page
├── checkout.html                       # Checkout page
├── README.md                          # Project documentation
├── styles/
│   ├── main.css                       # Main styles and homepage
│   ├── category.css                   # Category pages styles
│   ├── product.css                    # Product page styles
│   └── checkout.css                   # Checkout page styles
├── js/
│   ├── main.js                        # General functionality
│   ├── data.js                        # Product data and utilities
│   ├── cart.js                        # Shopping cart functionality
│   ├── product.js                     # Product page functionality
│   └── checkout.js                    # Checkout process
└── challenge-files/
    └── audio_file/                    # Design assets and images
```

## 🛠️ Installation & Setup

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **No build process required** - it's ready to run!

For development with live reload:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

## 💻 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern layout techniques and responsive design
- **JavaScript ES6+**: Interactive functionality and cart management
- **Local Storage API**: Cart persistence
- **Google Fonts**: Manrope font family

## 🎯 Key Components

### Shopping Cart System
- Add/remove products with quantity controls
- Real-time total calculations including VAT (20%) and shipping ($50)
- Persistent storage using localStorage
- Visual feedback and smooth animations

### Product Management
- Dynamic product loading from JSON data
- Responsive image handling for different screen sizes
- Category filtering and product recommendations
- Search-friendly URLs and routing

### Form Validation
- Real-time validation for all form fields
- Email and phone number pattern validation
- Payment method selection (e-Money or Cash on Delivery)
- Accessible error messaging

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet) and 1024px (desktop)
- Touch-friendly interface elements
- Optimized images for different screen densities

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Basic functionality works in older browsers

## 🔧 Customization

### Adding New Products
1. Add product data to `js/data.js`
2. Create product page HTML file
3. Add product images to assets folder
4. Update category pages with new product listings

### Styling Changes
- Main brand colors defined in CSS custom properties
- Typography scale using rem units
- Consistent spacing system
- Modular CSS architecture

### Functionality Extensions
- Payment gateway integration
- User authentication system
- Inventory management
- Product reviews and ratings

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `/` (root)
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. No build configuration needed
3. Deploy with zero configuration

## 📋 Testing Checklist

### Functionality
- ✅ Add products to cart
- ✅ Update quantities in cart
- ✅ Remove products from cart
- ✅ Checkout form validation
- ✅ Order confirmation
- ✅ Cart persistence after refresh

### Responsive Design
- ✅ Mobile navigation menu
- ✅ Responsive product grids
- ✅ Touch-friendly buttons
- ✅ Readable text on all devices

### Cross-browser Testing
- ✅ Chrome/Chromium browsers
- ✅ Firefox
- ✅ Safari (desktop and mobile)
- ✅ Edge

## 🎨 Design Credits

This project is based on a Frontend Mentor challenge design. All visual assets and design specifications are provided in the `challenge-files` directory.

## 📄 License

This project is for educational and portfolio purposes. Design assets are provided by Frontend Mentor.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

**Happy coding!** 🎧✨ 