# Static Site Conversion Gameplan

## 🎯 Objective
Convert the Next.js Rum River Barn site to a static HTML/CSS/JS version without altering any existing code.

## 📋 Progress Tracker

### Phase 1: Setup & Foundation
- [ ] **1.1** Create project structure
  - [ ] Create `static-site/` directory
  - [ ] Create subdirectories: `css/`, `js/`, `images/`, `fonts/`
  - [ ] Create `index.html` file

- [ ] **1.2** Set up base HTML template
  - [ ] Add HTML5 doctype and structure
  - [ ] Include viewport meta tag
  - [ ] Add theme initialization script
  - [ ] Set up CSS link tags (to be filled)
  - [ ] Add favicon and meta descriptions

### Phase 2: Extract Core Styles
- [ ] **2.1** Copy CSS token/variable files
  - [ ] Copy `theme.css` → `css/tokens/`
  - [ ] Copy `theme.tokens.css` → `css/tokens/`
  - [ ] Copy `spacing.css` → `css/tokens/`
  - [ ] Copy `primitives.css` → `css/system/`
  
- [ ] **2.2** Copy global styles
  - [ ] Copy `globals.css` from app directory
  - [ ] Copy `globals.css` from styles directory
  - [ ] Copy `layout.css` → `css/system/`
  - [ ] Copy `section-presets.css` → `css/system/`

### Phase 3: Extract Sections (In Order)

#### Section 1: Hero
- [ ] **3.1** Extract Hero HTML
  - [ ] Copy rendered HTML from browser DevTools
  - [ ] Clean React-specific attributes (`data-blok-c`, etc.)
  - [ ] Fix image URLs (remove `/_next/image` wrapper)
  - [ ] Update class names (remove CSS module hashes)

- [ ] **3.2** Extract Hero CSS
  - [ ] Copy `Hero.module.css`
  - [ ] Convert module classes to regular classes
  - [ ] Verify background image paths
  - [ ] Test hero rendering in isolation

#### Section 2: Navbar
- [ ] **3.3** Extract Navbar HTML
  - [ ] Copy navbar structure from rendered page
  - [ ] Include mobile menu drawer HTML
  - [ ] Clean up React event handlers
  
- [ ] **3.4** Extract Navbar CSS
  - [ ] Copy `navbar.css`
  - [ ] Ensure mobile responsive styles included

- [ ] **3.5** Add Navbar JavaScript
  - [ ] Mobile menu toggle functionality
  - [ ] Smooth scroll for anchor links
  - [ ] Active section highlighting

#### Section 3: Spaces (Venues)
- [ ] **3.6** Extract Spaces HTML
  - [ ] Copy venue tabs structure
  - [ ] Copy venue content panels
  - [ ] Include all venue images
  
- [ ] **3.7** Extract Spaces CSS
  - [ ] Copy `Spaces.module.css`
  - [ ] Convert module classes
  - [ ] Verify tab styling

- [ ] **3.8** Add Spaces JavaScript
  - [ ] Tab switching functionality
  - [ ] Image carousel (if present)

#### Section 4: Alternating Blocks
- [ ] **3.9** Extract Alternating Blocks HTML
  - [ ] Copy all block items
  - [ ] Maintain alternating layout structure
  
- [ ] **3.10** Extract Alternating Blocks CSS
  - [ ] Copy `AlternatingBlocks.module.css`
  - [ ] Convert module classes
  - [ ] Verify responsive grid

#### Section 5: Experience Grid
- [ ] **3.11** Extract Experience HTML
  - [ ] Copy grid structure
  - [ ] Include all icons/images
  
- [ ] **3.12** Extract Experience CSS
  - [ ] Copy `Experience.module.css`
  - [ ] Convert module classes

#### Section 6: Gallery
- [ ] **3.13** Extract Gallery HTML
  - [ ] Copy masonry layout structure
  - [ ] Include all wedding images
  
- [ ] **3.14** Extract Gallery CSS
  - [ ] Copy `Gallery.module.css`
  - [ ] Convert module classes

- [ ] **3.15** Add Gallery JavaScript
  - [ ] Lightbox/modal functionality
  - [ ] Image lazy loading

#### Section 7: Additional Sections
- [ ] **3.16** Extract Brand Social Proof section
- [ ] **3.17** Extract History Carousel section
- [ ] **3.18** Extract Schedule Form section
- [ ] **3.19** Extract Map section
- [ ] **3.20** Extract Footer section

### Phase 4: Integration & Optimization

- [ ] **4.1** Consolidate CSS
  - [ ] Combine all CSS files in correct order
  - [ ] Remove duplicate rules
  - [ ] Minify final CSS (optional)
  - [ ] Create single `styles.css` file

- [ ] **4.2** Create JavaScript file
  - [ ] Theme toggle with localStorage
  - [ ] Mobile menu functionality
  - [ ] Smooth scrolling
  - [ ] Tab switching
  - [ ] Gallery lightbox
  - [ ] Form validation
  - [ ] Create single `app.js` file

- [ ] **4.3** Organize assets
  - [ ] Copy all images from `/public/images`
  - [ ] Update all image paths in HTML
  - [ ] Copy fonts if any custom ones used
  - [ ] Copy SVG icons

### Phase 5: Testing & Validation

- [ ] **5.1** Functionality testing
  - [ ] Test theme toggle (dark/light modes)
  - [ ] Test mobile menu open/close
  - [ ] Test all navigation links
  - [ ] Test venue tabs
  - [ ] Test gallery lightbox
  - [ ] Test form submission

- [ ] **5.2** Responsive testing
  - [ ] Test on mobile (375px, 414px)
  - [ ] Test on tablet (768px, 1024px)
  - [ ] Test on desktop (1440px, 1920px)
  - [ ] Verify all breakpoints work

- [ ] **5.3** Cross-browser testing
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **5.4** Performance & validation
  - [ ] Validate HTML (W3C validator)
  - [ ] Validate CSS
  - [ ] Check console for errors
  - [ ] Optimize images if needed
  - [ ] Test page load speed

### Phase 6: Documentation & Delivery

- [ ] **6.1** Create documentation
  - [ ] Write README.md with setup instructions
  - [ ] Document any customization points
  - [ ] List browser support
  - [ ] Add deployment instructions

- [ ] **6.2** Final cleanup
  - [ ] Remove any debug code
  - [ ] Remove unused CSS
  - [ ] Organize file structure
  - [ ] Create .gitignore if needed

- [ ] **6.3** Package for delivery
  - [ ] Create ZIP archive
  - [ ] Test fresh deployment
  - [ ] Verify all assets included

## 📊 Progress Summary
- **Total Tasks:** 63
- **Completed:** 0
- **In Progress:** 1
- **Remaining:** 62

## 🕐 Estimated Timeline
- Phase 1: 30 minutes
- Phase 2: 45 minutes
- Phase 3: 3-4 hours
- Phase 4: 1 hour
- Phase 5: 1 hour
- Phase 6: 30 minutes
- **Total:** ~7 hours

## 📝 Notes
- Always work from a copy, never modify original files
- Test each section independently before integration
- Keep browser DevTools open to compare with original
- Document any deviations or issues encountered

## 🚀 Ready to Start?
Begin with Phase 1, Task 1.1 - Create the project structure!