# TNPSCTRB Design System Quick Reference

## 🎨 Color Palette

### Primary Colors
```css
--primary: #0071e3;        /* Apple Blue - Main brand color */
--primary-dark: #0056b3;   /* Hover states */
--primary-light: #4da3ff;  /* Accents */
--secondary: #14b8a6;      /* Teal - Secondary actions */
--accent: #06b6d4;         /* Cyan - Highlights */
```

### Semantic Colors
```css
--success: #10b981;        /* Green - Success states */
--warning: #f59e0b;        /* Orange - Warnings */
--info: #3b82f6;          /* Blue - Information */
```

### Backgrounds
```css
--bg-page: #ffffff;        /* Main page background */
--bg-section: #f9fafb;     /* Section backgrounds */
--bg-card: #ffffff;        /* Card backgrounds */
--bg-header: rgba(255, 255, 255, 0.95);  /* Navbar with blur */
```

### Text
```css
--text-primary: #1d1d1f;   /* Main text */
--text-secondary: #6e6e73; /* Secondary text */
--text-muted: #86868b;     /* Muted text */
--text-white: #ffffff;     /* White text */
```

### Borders
```css
--border-color: #e5e7eb;   /* Standard borders */
--border-light: #f3f4f6;   /* Light borders */
--border-focus: #0071e3;   /* Focus states */
```

---

## 📏 Spacing Scale

```css
--spacing-xs: 0.5rem;      /* 8px */
--spacing-sm: 1rem;        /* 16px */
--spacing-md: 1.5rem;      /* 24px */
--spacing-lg: 3rem;        /* 48px */
--spacing-xl: 5rem;        /* 80px */
--spacing-2xl: 7rem;       /* 112px */
```

### Usage Examples
```css
/* Small gap between elements */
gap: var(--spacing-xs);

/* Standard padding */
padding: var(--spacing-md);

/* Section spacing */
padding: var(--spacing-xl) 0;
```

---

## 🔤 Typography

### Font Families
```css
--font-main: var(--font-inter), -apple-system, sans-serif;
--font-heading: var(--font-outfit), -apple-system, sans-serif;
```

### Font Sizes (Responsive)
```css
/* Headings */
h1: clamp(2.5rem, 5vw, 4rem);     /* 40px - 64px */
h2: clamp(2rem, 4vw, 3rem);       /* 32px - 48px */
h3: clamp(1.5rem, 3vw, 2rem);     /* 24px - 32px */

/* Body */
p: 1.125rem;                       /* 18px */
small: 0.875rem - 0.95rem;        /* 14px - 15px */
```

### Font Weights
```css
--fw-regular: 400;
--fw-medium: 500;
--fw-semibold: 600;
--fw-bold: 700;
--fw-extrabold: 800;
```

---

## 🎭 Shadows

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-hover: 0 12px 32px rgba(0, 0, 0, 0.1);
```

### Usage
```css
/* Default card shadow */
box-shadow: var(--shadow-card);

/* Hover effect */
.card:hover {
  box-shadow: var(--shadow-hover);
}
```

---

## 🔘 Border Radius

```css
--radius-sm: 8px;          /* Small elements */
--radius-md: 12px;         /* Medium elements */
--radius-lg: 16px;         /* Large cards */
--radius-xl: 24px;         /* Extra large cards */
--radius-full: 9999px;     /* Pills & buttons */
```

---

## 🎯 Components

### Buttons

#### Primary Button
```html
<button class="btn btn-primary">Click Me</button>
```
```css
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-weight: 600;
}
```

#### Secondary Button
```html
<button class="btn btn-secondary">Click Me</button>
```
```css
.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
}
```

#### Outline Button
```html
<button class="btn btn-outline">Click Me</button>
```
```css
.btn-outline {
  background: transparent;
  border: 1.5px solid var(--border-color);
}
```

### Cards

```html
<div class="card">
  <!-- Content -->
</div>
```
```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border-light);
}
```

### Badges

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Live</span>
<span class="badge badge-info">Hot</span>
```
```css
.badge {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-primary {
  background: rgba(0, 113, 227, 0.1);
  color: var(--primary);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones) */
@media (max-width: 640px) { }

/* Medium devices (tablets) */
@media (max-width: 768px) { }

/* Large devices (small laptops) */
@media (max-width: 968px) { }

/* Extra large devices (desktops) */
@media (min-width: 1200px) { }
```

---

## 🎨 Utility Classes

### Spacing
```css
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }
.mt-xl { margin-top: var(--spacing-xl); }

.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.mb-xl { margin-bottom: var(--spacing-xl); }

.py-sm { padding-top: var(--spacing-sm); padding-bottom: var(--spacing-sm); }
.py-md { padding-top: var(--spacing-md); padding-bottom: var(--spacing-md); }
.py-lg { padding-top: var(--spacing-lg); padding-bottom: var(--spacing-lg); }
.py-xl { padding-top: var(--spacing-xl); padding-bottom: var(--spacing-xl); }
```

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.container-narrow {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
```

---

## 🎬 Animations & Transitions

### Standard Transition
```css
transition: all 0.25s ease;
```

### Hover Effects

#### Lift Effect
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

#### Scale Effect
```css
.icon:hover {
  transform: scale(1.1);
}
```

#### Slide Effect
```css
.option:hover {
  transform: translateX(4px);
}
```

---

## 🎯 Common Patterns

### Hero Section
```html
<section class="hero">
  <div class="heroContainer">
    <div class="heroLeft">
      <h1>Title</h1>
      <p>Subtitle</p>
      <div class="heroButtons">
        <button class="btn btn-primary">CTA 1</button>
        <button class="btn btn-secondary">CTA 2</button>
      </div>
    </div>
    <div class="heroRight">
      <!-- Dashboard or Image -->
    </div>
  </div>
</section>
```

### Section Title
```html
<h2 class="section-title">Section Title</h2>
<p class="section-subtitle">Optional subtitle</p>
```

### Grid Layout
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-md);
}
```

---

## 🔍 Accessibility

### Focus States
```css
button:focus,
input:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text

### Touch Targets
- Minimum size: 44px × 44px on mobile
- Adequate spacing between interactive elements

---

## 📋 Checklist for New Components

- [ ] Uses design system colors
- [ ] Follows spacing scale
- [ ] Includes hover states
- [ ] Has focus states
- [ ] Is mobile responsive
- [ ] Meets accessibility standards
- [ ] Uses semantic HTML
- [ ] Has smooth transitions
- [ ] Follows naming conventions
- [ ] Is documented

---

## 🎨 Design Principles

1. **Simplicity First** - Remove unnecessary elements
2. **Consistency** - Use the design system
3. **Hierarchy** - Clear visual structure
4. **Whitespace** - Let content breathe
5. **Accessibility** - Design for everyone
6. **Performance** - Keep it fast
7. **Mobile First** - Start small, scale up
8. **User Focused** - Solve real problems

---

## 📚 Resources

- **Fonts:** [Google Fonts](https://fonts.google.com/)
  - Inter: Body text
  - Outfit: Headings
  
- **Icons:** Inline SVG (Heroicons style)
  
- **Color Tool:** [Coolors](https://coolors.co/)
  
- **Accessibility:** [WAVE Tool](https://wave.webaim.org/)

---

**Quick Tip:** When in doubt, use more whitespace and simpler colors. The design should feel calm and academic, not flashy or overwhelming.
