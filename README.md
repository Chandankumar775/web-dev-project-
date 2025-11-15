# Chandan Ka Dhaba - Restaurant & Hotel Website

![Chandan Ka Dhaba](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)

A modern, responsive restaurant and hotel website built with HTML, CSS, JavaScript, and Bootstrap 5.

## 🎯 Features

### 🍽️ Restaurant Features
- **Interactive Menu** - Filterable menu with categories (Breakfast, Beverages, Snacks, Main Course, Thali, Desserts)
- **Online Ordering** - WhatsApp integration for easy food ordering
- **Featured Dishes** - Showcase of signature items with ratings
- **Image Gallery** - Beautiful gallery with lightbox viewer

### 🏨 Hotel Features
- **Room Booking System** - Three room types (Standard, Deluxe, Premium)
- **Amenities Showcase** - Display of all hotel facilities
- **Real-time Booking** - WhatsApp booking integration
- **Room Details** - Comprehensive room information with pricing

### 🌟 Additional Features
- **Team Profiles** - Meet the leadership (Chandan, Krish, Yashoda)
- **Contact Form** - Easy communication with map integration
- **FAQ Section** - Common questions answered
- **Testimonials** - Customer reviews carousel
- **Lottie Animations** - Smooth, interactive animations
- **AOS Animations** - Scroll-triggered animations
- **Fully Responsive** - Mobile-first design

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **JavaScript ES6** - Modern JavaScript
- **Bootstrap 5** - Responsive framework
- **Lottie** - Animation library
- **AOS** - Animate on Scroll
- **GLightbox** - Lightbox gallery
- **Font Awesome** - Icon library
- **Google Fonts** - Playfair Display & Poppins

## 📁 Project Structure

```
chandan-ka-dhaba/
│
├── index.html              # Homepage
├── about.html              # About page
├── menu.html               # Menu page
├── rooms.html              # Rooms page
├── gallery.html            # Gallery page
├── contact.html            # Contact page
│
├── css/
│   └── style.css           # Main stylesheet
│
├── js/
│   ├── main.js             # Main JavaScript
│   ├── menu-filter.js      # Menu filtering logic
│   ├── gallery.js          # Gallery functionality
│   ├── booking.js          # Room booking logic
│   └── contact.js          # Contact form handler
│
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🎨 Color Palette

```css
--primary-color: #6F4E37  /* Coffee Brown */
--secondary-color: #D4A656 /* Gold */
--dark-color: #1A1A1A     /* Black */
--light-color: #FFF7E6    /* Cream */
```

## 📱 Pages

1. **Home** - Hero section with Lottie animation, featured dishes, testimonials
2. **About** - Team profiles, story, core values
3. **Menu** - Filterable food menu with WhatsApp ordering
4. **Rooms** - Hotel rooms with booking modal
5. **Gallery** - Image gallery with category filters
6. **Contact** - Contact form, map, FAQ section

## 🔧 Setup & Installation

### Local Development

1. Clone or download the project
2. Open `index.html` in your browser
3. That's it! No build process required.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

Or simply:
- Push to GitHub
- Import project in Vercel dashboard
- Deploy automatically

## 📝 Customization Guide

### Update WhatsApp Number

Replace `919876543210` with your actual WhatsApp number in:
- All HTML files (navbar button)
- `js/booking.js`
- `js/contact.js`

### Update Restaurant Info

Edit the following in HTML files:
- Address
- Phone numbers
- Email addresses
- Opening hours
- Social media links

### Add Your Lottie Animation

1. Place your Lottie JSON file in the root directory
2. Update the path in `js/main.js`:
```javascript
fetch('../your-lottie-file.json')
```

### Update Images

Replace Unsplash image URLs with your actual images:
- Use your restaurant photos
- Use your room photos
- Use your food photos

### Customize Colors

Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #YourColor;
    --secondary-color: #YourColor;
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 👥 Team

- **Chandan Kumar** - Owner & Founder
- **Krish Garg** - Co-Owner
- **Yashoda Thapa** - Manager

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own restaurant or hotel website!

## 📞 Support

For any queries or support, contact:
- Email: info@chandankadhaba.com
- Phone: +91 98765 43210

---

**Made with ❤️ by Chandan, Krish & Yashoda**
