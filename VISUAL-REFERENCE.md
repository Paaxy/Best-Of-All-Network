# 🎨 Visual Reference Guide

## Animation Timing Reference

```
Quick animations:     0.3s
Standard animations:  0.6s - 0.8s
Slow animations:      1.5s - 3s
Continuous loop:      3s - 5s
```

## Color Palette

```css
Primary Color:      #00d9ff  🔵 Bright Cyan
Secondary Color:    #0099ff  🔵 Sky Blue  
Accent Color:       #ff006e  🔴 Neon Pink

Dark Background:    #0a0e27  ⚫ Deep Space
Darker Background:  #050a1a  ⚫ Void
Light Text:         #e0e7ff  ⚪ Off-white
Muted Text:         #a0aec0  ⚪ Gray-blue
```

## Font Sizes with clamp()

```css
/* Main headings */
clamp(1.8rem, 5vw, 3rem)      /* 28px - 48px */

/* Section headings */
clamp(1.6rem, 4vw, 2.5rem)    /* 25px - 40px */

/* Body text */
clamp(0.95rem, 2vw, 1.1rem)   /* 15px - 18px */

/* Small text */
clamp(0.85rem, 1.5vw, 0.95rem) /* 13px - 15px */
```

## Spacing Scale

```css
xs: 8px     /* Extra small spacing */
sm: 12px    /* Small spacing */
md: 20px    /* Medium spacing */
lg: 30px    /* Large spacing */
xl: 40px    /* Extra large spacing */
```

## Animation Easing Functions

```css
ease-out        /* Fast start, slow end (entrances) */
ease-in-out     /* Smooth both ways (continuous) */
cubic-bezier(.23, 1, .320, 1)  /* Custom snappy feel */
linear          /* Constant speed (spins, rotations) */
```

## Responsive Grid Layout

```css
/* Auto-fit columns */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))

/* On desktop: ~4 columns if content is 200px wide */
/* On tablet: ~2 columns */
/* On mobile: 1 column */
```

## Shadow Depths

```css
Light:   0 2px 5px rgba(0, 0, 0, 0.1)
Medium:  0 8px 16px rgba(0, 0, 0, 0.2)
Heavy:   0 12px 40px rgba(0, 0, 0, 0.3)
Glow:    0 6px 20px rgba(0, 217, 255, 0.4)
```

## Border Radius

```css
Small:   4px - 8px      (buttons)
Medium:  10px - 12px    (cards)
Large:   15px - 20px    (containers)
Full:    50%            (circles)
```

## Common Combinations

### Modern Card
```css
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(0, 217, 255, 0.2);
border-radius: 15px;
backdrop-filter: blur(10px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Glowing Heading
```css
color: #00d9ff;
text-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
animation: glow 3s ease-in-out infinite;
```

### Interactive Button
```css
background: linear-gradient(135deg, #00d9ff, #0099ff);
border-radius: 10px;
transition: all 0.3s ease;
cursor: pointer;
```

## Z-Index Scale

```
-1    Background effects (body::before)
0     Default layer
1     Hover effects
10    Dropdowns/Overlays
100   Modals/Popups
1000  Alerts/Notifications
```

## Viewport Breakpoints

```css
Mobile:      320px - 480px
Small Tab:   481px - 768px
Tablet:      769px - 1024px
Desktop:     1025px - 1920px
Large:       1921px+
```

## Transform Effects

```css
translateY(-8px)      /* Lift effect */
translateY(-10px)     /* Stronger lift */
scale(1.05)          /* Subtle zoom */
scale(1.1)           /* Noticeable zoom */
translateX(-30px)    /* Slide from left */
rotate(360deg)       /* Full rotation */
```

## Opacity Values

```css
Full opacity:       1 or 100%
Bright:            0.8 or 80%
Medium:            0.5 or 50%
Subtle:            0.3 or 30%
Very subtle:       0.15 or 15%
Almost invisible:  0.05 or 5%
```

## Glass-morphism Formula

```css
background: rgba(255, 255, 255, 0.08);  /* Transparency */
backdrop-filter: blur(10px);             /* Blur effect */
border: 1px solid rgba(0, 217, 255, 0.2); /* Border */
```

## Gradient Directions

```css
/* Common directions */
135deg    /* Top-left to bottom-right */
90deg     /* Left to right */
45deg     /* Bottom-left to top-right */
180deg    /* Bottom to top */
```

## Performance Tips

```css
/* Use these for smooth animations (GPU) */
✅ transform: translateY(...)
✅ transform: scale(...)
✅ opacity: ...

/* Avoid these (slow, CPU intensive) */
❌ top, left, right, bottom positioning
❌ width, height changes
❌ background-color changes (if heavy)
```

## Accessibility Values

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
}

/* Color contrast */
✅ Dark text on light: 12:1+ ratio
✅ Light text on dark: 7:1+ ratio
✅ Minimum WCAG AA: 4.5:1
```

## Quick Hover States

```css
/* Simple lift */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0, 217, 255, 0.3);

/* Scale + shadow */
transform: scale(1.05);
box-shadow: 0 12px 40px rgba(0, 217, 255, 0.4);

/* Color change */
background: linear-gradient(135deg, #00d9ff, #0099ff);
border-color: #00d9ff;
```

## Animation Delay Pattern

```css
.item-1 { animation-delay: 0.1s; }
.item-2 { animation-delay: 0.2s; }
.item-3 { animation-delay: 0.3s; }
/* Creates cascading/stagger effect */
```

## Common Viewport Meta Tags

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## CSS Filter Effects

```css
blur(10px)          /* Blurs element */
brightness(1.2)     /* Makes brighter */
contrast(1.1)       /* Increases contrast */
drop-shadow(...)    /* Adds shadow */
```

## Text Clipping with Gradient

```css
background: linear-gradient(135deg, #00d9ff, #0099ff);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

## Useful Box-shadow Variations

```css
/* Subtle */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

/* Standard */
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

/* Heavy */
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);

/* Inset (inner shadow) */
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Multiple */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Glow */
box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
```

## Aspect Ratio for Responsive Videos

```css
.video-container {
    aspect-ratio: 16 / 9;
}

.game-frame {
    aspect-ratio: 4 / 3;
}
```

## Flexible Font Sizing

```css
/* Mobile: 16px, Tablet: 20px, Desktop: 24px */
font-size: clamp(1rem, 1vw + 0.5rem, 1.5rem);
```

## Line Height for Readability

```css
body text:      1.6 (relaxed)
headings:       1.2 (tight)
lists:          1.8 (open)
```

---

**Keep this guide handy when styling your games!** 🎨
