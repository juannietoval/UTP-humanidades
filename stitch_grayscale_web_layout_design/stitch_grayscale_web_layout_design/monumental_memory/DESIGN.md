---
name: Monumental Memory
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  unit: 8px
  gutter: 24px
  margin-edge: 64px
  margin-edge-mobile: 24px
  grid-cols: '12'
---

## Brand & Style

The design system is built for an institutional platform dedicated to humanities, memory, and politics. It aims to evoke an emotional response of **solemnity, reflection, and intellectual weight**, balancing the gravity of historical memory with a modern, academic clarity.

The visual direction follows a **Modern Brutalist** aesthetic—characterized by bold structural lines, a strict monochromatic palette, and a focus on architectural layout. It leverages high-contrast typography and a "mural-grid" philosophy inspired by portrait memorials. The interface should feel like a digital monument: stable, permanent, and authoritative.

## Colors

The palette is strictly grayscale to maintain a respectful and scholarly tone. 
- **Primary (#1A1A1A):** A deep charcoal used for headings, primary actions, and structural borders. It provides the "ink" that anchors the design.
- **Secondary (#666666):** A medium gray for metadata, secondary text, and subtle dividers.
- **Tertiary (#F2F2F2):** A light ash used for section backgrounds and surface-level depth.
- **Neutral (#FFFFFF):** The pure canvas, providing maximum readability and "breathable" whitespace.

Color is never used for decoration, only for function and hierarchy.

## Typography

Typography is the core of this system. We use **Space Grotesk** for headlines to achieve a bold, technical, and contemporary look that commands attention. Its geometric nature reflects the structured pursuit of history.

**Work Sans** is used for body text for its exceptional legibility and professional neutrality. **Space Mono** is used sparingly for labels, buttons, and "archival" data points to suggest a documentary or systematic quality.

Headlines should use tight tracking and leading to create a "blocky," monumental feel.

## Layout & Spacing

The layout uses a **Fixed Grid** model on desktop to mimic the structured frames of a gallery or archive. 
- **Desktop:** 12-column grid with a maximum container width of 1440px.
- **Margins:** Large 64px outer margins to provide an "institutional" frame around the content.
- **Rhythm:** An 8px base unit controls all spacing. Gutters are fixed at 24px.

**The Mural Background:** A key visual feature is the portrait mural. This should be treated as a fixed-position background element with a low-opacity charcoal overlay (30-50%) to ensure text readability while maintaining the emotional weight of the faces.

## Elevation & Depth

In line with the Brutalist and solemn style, this design system rejects soft shadows and blurs.
- **Tonal Layers:** Depth is achieved through color blocks (e.g., a light gray section over a white background).
- **Bold Borders:** All interactive elements and card containers use 1px or 2px solid charcoal borders (#1A1A1A).
- **Zero Shadow:** No box-shadows are permitted. Elevation is communicated through "offset" borders (2px down and right) for hover states, creating a tactile, mechanical feel.

## Shapes

The shape language is strictly **Sharp (0px)**. No rounded corners are used in any UI element. This reinforces the "monumental" and "architectural" feel of the system, suggesting precision, permanence, and the rigid nature of structural politics.

## Components

### Buttons
Inspired by the requested structure, buttons are strictly rectangular with a heavy 2px border.
- **Primary:** Solid #1A1A1A background with white text.
- **Secondary (Segmented):** Like the reference sketch, navigation groups should be built as a single horizontal bar with internal vertical dividers (1px) separating the items (Principal | Proyecta | Ciudadanía).
- **Hover State:** Invert the colors (white background, black text) or apply a slight offset border.

### Cards & Portraits
Following the mural visual reference, images (especially portraits) should be contained in square, thin-bordered frames. 
- **Captions:** Use the Label-SM typography (Mono) placed immediately below the frame or as an overlay at the bottom.

### Inputs & Form Fields
Use simple underlined inputs or full-box inputs with 1px borders. Focused states should increase the border weight to 2px. No rounded corners or glow effects.

### Lists
Chronological lists or archival records should use horizontal dividers between items. Use the Space Mono font for dates to emphasize the "timeline" aspect.