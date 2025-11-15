# Contributing to Chandan Ka Dhaba

First off, thank you for considering contributing to Chandan Ka Dhaba! 🎉

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected**
- **Include screenshots if possible**
- **Include browser version and OS**

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### 🔀 Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the code follows existing style
4. Make sure your code lints
5. Issue that pull request!

## Development Process

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/web-dev-project-.git

# Navigate to directory
cd web-dev-project-

# Create a new branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **HTML Changes**
   - Use semantic HTML5 tags
   - Maintain consistent indentation (4 spaces)
   - Add appropriate ARIA labels for accessibility
   - Test on multiple browsers

2. **CSS Changes**
   - Use CSS variables for colors (defined in `:root`)
   - Follow BEM naming convention where applicable
   - Ensure responsive design (mobile-first)
   - Test dark mode compatibility
   - Add comments for complex styles

3. **JavaScript Changes**
   - Write clean, readable code
   - Use modern ES6+ features
   - Add comments for complex logic
   - Ensure localStorage compatibility
   - Test across browsers
   - Avoid jQuery or other frameworks (vanilla JS only)

### Testing Checklist

Before submitting, ensure:

- [ ] Code works on Chrome, Firefox, Safari, and Edge
- [ ] Responsive design works on mobile (320px) to desktop (1920px+)
- [ ] Dark mode toggle works correctly
- [ ] Shopping cart functions properly
- [ ] Search and voice search work
- [ ] All animations are smooth
- [ ] No console errors
- [ ] Images load properly (lazy loading works)
- [ ] Forms validate correctly
- [ ] WhatsApp integration works
- [ ] LocalStorage persists data

### Commit Messages

Write clear, concise commit messages:

```
feat: Add calorie calculator feature
fix: Fix cart total calculation bug
docs: Update README with new features
style: Format CSS for dark mode
refactor: Simplify search function
```

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

### Submitting Pull Request

1. Push your changes to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

2. Go to the original repository and create a Pull Request

3. Fill in the PR template with:
   - Clear title
   - Description of changes
   - Screenshots (if UI changes)
   - Related issue number (if applicable)

4. Wait for review and address any feedback

## Style Guidelines

### HTML
```html
<!-- Good -->
<section class="menu-section py-5">
    <div class="container">
        <h2 class="section-title">Our Menu</h2>
    </div>
</section>

<!-- Avoid -->
<div class="menu">
    <div><h2>Our Menu</h2></div>
</div>
```

### CSS
```css
/* Good - Using CSS variables */
.button {
    background-color: var(--primary-color);
    border-radius: 8px;
    transition: all 0.3s ease;
}

/* Avoid - Hard-coded values */
.button {
    background-color: #6F4E37;
    border-radius: 8px;
}
```

### JavaScript
```javascript
// Good - Modern ES6+
const handleCartAdd = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast('Item added to cart!');
};

// Avoid - Old style
function handleCartAdd(item) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}
```

## Feature Requests

We love feature requests! Before submitting:

1. **Check existing issues** - Someone might have already suggested it
2. **Be specific** - Describe the feature in detail
3. **Explain the benefit** - Why would this be useful?
4. **Provide examples** - Show similar implementations if possible

## Questions?

Feel free to open an issue with the "question" label or contact:
- **GitHub:** [@Chandankumar775](https://github.com/Chandankumar775)

## Recognition

Contributors will be:
- Added to the project's contributors list
- Mentioned in release notes
- Given credit in the README (for significant contributions)

Thank you for contributing! 🙏

---

**Happy Coding!** 🚀
