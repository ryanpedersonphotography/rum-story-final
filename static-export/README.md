# Rum River Barn - Static Export

This is a clean, static HTML/CSS/JS export of the Rum River Barn wedding venue website.

## Files Structure

- `index.html` - Main HTML file with all content and structure
- `styles.css` - Complete stylesheet with all visual styling
- `app.js` - JavaScript for interactions (mobile menu, theme toggle, tabs, etc.)
- `images/` - All website images

## Features

### Visual Features
- Responsive design that works on all devices
- Dark/light theme toggle with persistent preference
- Smooth scrolling navigation
- Fixed header with scroll effects
- Beautiful typography using Google Fonts (Playfair Display, Montserrat, Dancing Script)

### Interactive Elements
- Mobile navigation menu
- Theme toggle (dark/light mode)
- Venue space tabs
- Contact form
- Gallery with hover effects
- Smooth scroll to sections

### Sections
1. **Navigation Bar** - Fixed header with links and theme toggle
2. **Hero Section** - Full-screen hero with overlay and call-to-action
3. **Spaces** - Interactive tabs showcasing different venue spaces
4. **Why Choose Us** - Alternating content blocks with images
5. **Experience** - Grid of features with icons
6. **Gallery** - Photo grid with hover overlays
7. **Schedule Form** - Contact form for booking visits
8. **Map** - Location information and embedded map
9. **Footer** - Site links and contact information

## Deployment

This static site can be deployed to any web hosting service:

### Quick Deploy Options

1. **GitHub Pages**
   - Upload to a GitHub repository
   - Enable GitHub Pages in settings
   - Site will be live at `https://[username].github.io/[repo-name]`

2. **Netlify Drop**
   - Visit https://app.netlify.com/drop
   - Drag and drop this folder
   - Get instant URL

3. **Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in this directory
   - Follow prompts

4. **Traditional Hosting**
   - Upload all files via FTP
   - Ensure index.html is in the root directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images
- Minimal JavaScript
- CSS custom properties for theming
- Responsive images
- Lazy loading ready (can be enabled in JS)

## Customization

### Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --color-brand-walnut: #6B4E3D;
  --color-brand-rose: #9D6B7B;
  --color-brand-gold: #E4C896;
  /* etc. */
}
```

### Typography
Modify font families in the CSS variables:
```css
:root {
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;
  --font-script: 'Dancing Script', cursive;
}
```

### Content
All content is in `index.html` and can be edited directly.

## License

Copyright 2024 Rum River Barn & Vineyard. All rights reserved.