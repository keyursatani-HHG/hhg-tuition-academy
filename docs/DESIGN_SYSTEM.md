---
name: Academic Excellence System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#434654'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#737686'
  outline-variant: '#c3c5d7'
  surface-tint: '#1353d8'
  primary: '#003fb1'
  on-primary: '#ffffff'
  primary-container: '#1a56db'
  on-primary-container: '#d4dcff'
  inverse-primary: '#b5c4ff'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#7c3400'
  on-tertiary: '#ffffff'
  tertiary-container: '#a24500'
  on-tertiary-container: '#ffd4bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00174d'
  on-primary-fixed-variant: '#003dab'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered to balance the rigorous authority of an educational institution with the modern accessibility of a premium digital service. The brand personality is **Professional, Encouraging, and Precise**, specifically catering to parents seeking a reliable partner in their child's education and students looking for a focused, distraction-free learning environment.

The visual style is **Corporate Modern with Tactile Warmth**. It leverages the clarity of high-end SaaS platforms—utilizing generous white space and systematic layouts—while introducing "softness" through large corner radii and ambient depth. This combination evokes a sense of security and modern pedagogical innovation, moving away from "stuffy" traditional academic aesthetics toward a fresh, results-oriented digital experience.

## Colors

The palette is anchored by **Professional Blue (#1A56DB)**, used for primary actions, branding, and navigation to signal stability and institutional trust. **Secondary White (#FFFFFF)** serves as the essential canvas, providing the "breathable" space required for intensive educational content.

**Orange (#F97316)** is reserved strictly as a functional accent. It is used to highlight progress, call out urgent notifications, or draw attention to "Apply Now" buttons, injecting energy into the professional blue base. The neutral scale favors cool greys to maintain the professional tone, with text primarily set in a deep slate (#111827) for optimal contrast and legibility.

## Typography

This design system utilizes **Inter** across all levels to ensure maximum legibility and a contemporary, systematic feel. The typographic hierarchy is designed for clarity; headlines use a bold weight and slight negative letter-spacing to appear "tight" and authoritative.

Body text is prioritized for long-form reading, utilizing a generous 1.5x line height to prevent eye fatigue during study sessions. Labels and interactive elements use a medium weight to distinguish them from static content. On mobile devices, the display and large headline sizes scale down slightly to ensure headers do not overwhelm the viewport.

## Layout & Spacing

The design system employs a **Fixed Grid** on desktop (1280px max-width) and a **Fluid Grid** on mobile. A strict 8px spacing scale governs all padding and margins, ensuring mathematical harmony across components.

**Desktop:** 12-column grid with 24px gutters. Page margins are set to 64px to create a premium, "gallery-like" feel that focuses the eye on the center content.
**Tablet:** 8-column grid with 20px gutters.
**Mobile:** 4-column grid with 16px gutters and 20px side margins.

Generous vertical spacing (using 80px, 120px, or 160px blocks) is used between major page sections to reinforce the premium, academic positioning of the academy.

## Elevation & Depth

To achieve the "Premium" feel, the system moves away from flat design in favor of **Ambient Shadows**. Depth is used to signify interactivity and content hierarchy.

1.  **Level 0 (Base):** The primary background color.
2.  **Level 1 (Cards/Surface):** White surfaces with a very soft, highly-diffused shadow (Blur: 15px, Opacity: 4%, Color: #1A56DB). This subtle blue tint in the shadow maintains brand consistency even in elevation.
3.  **Level 2 (Interactive/Hover):** When a user interacts with a card, the shadow becomes more pronounced (Blur: 30px, Opacity: 8%) and the element translates -4px on the Y-axis.
4.  **Level 3 (Modals/Overlays):** Distinct elevation with a backdrop blur (12px) to keep the user focused on the educational task at hand.

## Shapes

The shape language is characterized by **Extra-Large Radii**. While the base `rounded` value is 0.5rem (8px), the "Signature" look of this design system relies on `rounded-xl` (1.5rem / 24px) for primary containers and `rounded-lg` (1rem / 16px) for cards and input fields.

Buttons utilize the `rounded-lg` (16px) style to feel substantial and friendly. This high roundedness avoids the clinical sharpness of traditional finance or government systems, making the platform feel approachable for students.

## Components

### Buttons
- **Primary:** Professional Blue background, White text, 16px rounded corners. Height: 48px or 56px.
- **Secondary:** White background with a 1px border of Blue, Blue text.
- **Accent:** Orange background, White text. Reserved for high-conversion CTAs.

### Input Fields
Inputs use a light grey fill (#F9FAFB) with a 1px border (#E5E7EB) that turns Professional Blue on focus. Labels sit clearly above the input in `label-md` style.

### Cards
Cards are the primary container for courses and modules. They must feature a white background, `rounded-xl` (24px) corners, and the Level 1 Ambient Shadow. Internal padding should be a minimum of 32px.

### Progress Indicators
Linear bars used for student progress should use the Accent Orange for the fill and a light tint of orange or grey for the track. This provides an energetic "reward" visual for completion.

### Badges/Chips
Small, `rounded-full` (pill) indicators used for category tags (e.g., "Mathematics", "A-Levels"). These should use a subtle blue tint background (#EFF6FF) with dark blue text.