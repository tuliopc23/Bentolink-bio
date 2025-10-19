# 🍎 Apple HIG Article Card Enhancements

## ✨ Typography Improvements

### SF Pro Display System
- **Title**: 17-20px with -2.2% letter spacing
- **Body**: 14px with -1% letter spacing  
- **Eyebrow**: 11px uppercase, 6% letter spacing, 600 weight
- **Badge**: 10px uppercase, 4% letter spacing, 600 weight
- **Footer Meta**: 12px with -1% letter spacing

### Line Height & Spacing
- Title: 1.3 (tight for readability)
- Body: 1.5 (comfortable reading)
- Text truncation: 2 lines for title, 3 lines for excerpt
- Proper word wrapping with hyphenation

## 🎨 Visual Design

### Card Styling
- **Border Radius**: 28px (Apple-standard large radius)
- **Border**: 0.5px with subtle white overlay (08% opacity)
- **Background**: 3% white with glassmorphism
- **Backdrop Filter**: 20px blur + 180% saturation
- **Shadow Layers**: 
  - Base: 0 1px 2px rgba(0,0,0,0.12)
  - Mid: 0 2px 8px rgba(0,0,0,0.08)
  - Inset highlight: 0 1px 0 rgba(255,255,255,0.06)

### Hover State
- **Transform**: translateY(-4px) + scale(1.01)
- **Border**: Increases to 25% opacity blue
- **Background**: Brightens to 5% white
- **Shadow**: Multi-layer with blue glow
  - 0 2px 4px rgba(0,0,0,0.14)
  - 0 8px 24px rgba(0,0,0,0.16)
  - 0 16px 48px rgba(64,156,255,0.15) [blue glow]
  - Inset: 0 1px 0 rgba(255,255,255,0.1)

### Active State
- **Transform**: translateY(-2px) + scale(1.005)
- **Duration**: 0.15s (quick feedback)

### Gradient Overlay
- Radial gradient from top center
- Blue tint (90,150,255) at 12% opacity
- Fades to transparent at 60%
- Only visible on hover

## 🎯 Color System

### Text Colors
- **Primary** (Title on hover): rgba(255,255,255,1)
- **Primary** (Title): rgba(255,255,255,0.95)
- **Secondary** (Excerpt on hover): rgba(255,255,255,0.75)
- **Secondary** (Excerpt): rgba(255,255,255,0.65)
- **Tertiary** (Eyebrow): rgba(255,255,255,0.5)
- **Quaternary** (Footer): rgba(255,255,255,0.45)

### Interactive Colors
- **Link** (CTA): rgba(120,175,255,1)
- **Link Hover**: rgba(140,190,255,1)
- **Border**: rgba(120,175,255,0.25)

### Badge Colors
- **Background**: Linear gradient (64,156,255) 20% → (90,150,255) 15%
- **Text**: rgba(120,175,255,1)
- **Border**: rgba(120,175,255,0.3)
- **Shadow**: 0 1px 2px with blue tint + inset highlight

## 🚀 Motion Design

### Transitions
- **Duration**: 0.35s (Apple's standard timing)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) [Apple's motion curve]
- **Active**: 0.15s (quick tactile feedback)
- **CTA Arrow**: 0.2s independent animation

### Hover Effects
- Card lifts 4px and scales 1%
- CTA arrow slides 2px right
- All text brightens slightly
- Border color intensifies
- Gradient overlay fades in

## 📐 Layout & Spacing

### Grid
- 3 columns with equal width
- Gap: 20-24px (responsive)
- Cards stretch to fill height

### Card Internal Spacing
- Padding: 24-32px (responsive)
- Header margin: 4px bottom
- Title margin: 8px bottom
- Footer: 12px top padding
- Footer border: 0.5px top separator

### Content Areas
- Header: Eyebrow + Badge (flex space-between)
- Body: Title + Excerpt (with flex: 1 on excerpt)
- Footer: Meta + CTA arrow (with auto margin-left)

## 🎭 Special Features

### NEW Badge
- Appears for posts < 14 days old
- Gradient background with border
- Uppercase styling with tight letter spacing
- Subtle shadow + inset highlight

### Footer Divider
- 0.5px top border
- 6% white opacity
- Creates visual separation

### CTA Arrow
- Translates 2px right on hover
- Smooth independent animation
- Maintains visual hierarchy

## ✅ Apple HIG Compliance

- ✓ SF Pro Display font family
- ✓ -2.2% letter spacing for large text
- ✓ Glassmorphism with proper blur + saturation
- ✓ 0.5px borders (retina-optimized)
- ✓ Multi-layer shadows with proper depth
- ✓ 0.35s cubic-bezier(0.4,0,0.2,1) motion
- ✓ Proper text hierarchy with optical sizing
- ✓ Accessible color contrast ratios
- ✓ Touch-friendly spacing (44px+ tap targets)
- ✓ Hover states with proper feedback
- ✓ Active states for tactile response

