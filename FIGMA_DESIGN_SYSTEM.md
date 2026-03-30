# MenuBridge Design System — Figma Integration Rules

## 1. Token Definitions

Design tokens are defined in `design-system/config.js` as Tailwind CSS extensions loaded via CDN (`https://cdn.tailwindcss.com`). No build step or token transformation — values are used directly.

### Colors
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#267373` | Primary actions, buttons, links, active states, headings accent |
| `secondary` | `#86B386` | Success states, verified badges, health/nature indicators |
| `tertiary` | `#CC5C2E` | Alerts, warnings, terracotta highlights, CTA accents |
| `background-light` | `#f8f8f7` | Light mode page background (soft cream) |
| `background-dark` | `#18181b` | Dark mode page background |
| `surface` | `#ffffff` | Card and surface backgrounds |

### Additional Color Usage (hardcoded in components)
| Color | Hex | Usage |
|---|---|---|
| Dark text | `#101818` | Primary body text, headings |
| Secondary text | `#5c8a8a` | Descriptions, help text, labels |
| Border | `#eaf1f1` | Card borders, dividers, separators |
| Muted text | `#9ca3af` | Placeholder text, disabled states |

### Typography
| Token | Font Family | Usage |
|---|---|---|
| `font-display` | `Epilogue, serif` | Headings (h1–h6), page titles, brand text. Weight: 800–900 for display, 700 for section headings |
| `font-body` | `Inter, sans-serif` | Body text, UI labels, form inputs. Weights: 300–600 |

Additional fonts loaded via Google Fonts:
- `Noto Sans JP` (400, 500, 700, 900) — Japanese text
- `Noto Sans Thai` — Thai localization

### Type Scale
| Role | Font | Weight | Size / Line Height |
|---|---|---|---|
| Display 2XL | Epilogue | 900 (Black) | 48px / 1.1 |
| Heading XL | Epilogue | 700 (Bold) | 36px / 1.25 |
| Heading L | Epilogue | 700 | 24px / 1.3 |
| Heading M | Epilogue | 700 | 18px / 1.4 |
| Body Large | Inter | 400 | 18px / 1.6 |
| Body Default | Inter | 400 | 16px / 1.5 |
| Body Small | Inter | 400–500 | 14px / 1.5 |
| Caption | Inter | 500 | 12px / 1 |
| Overline | Inter | 700 | 12px / 1, uppercase, tracking-wider |

### Spacing
Standard Tailwind spacing scale (4px base). Key values:
- `px-6` / `py-12` — page section padding
- `lg:px-40` — desktop content padding
- `gap-2` to `gap-8` — component spacing
- `p-8` — card internal padding
- `mb-4` to `mb-12` — vertical section rhythm

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `rounded` | 0.25rem (4px) | Small elements |
| `rounded-lg` | 0.5rem (8px) | Inputs, buttons |
| `rounded-xl` | 0.75rem (12px) | Cards, containers |
| `rounded-2xl` | 1rem (16px) | Large cards |
| `rounded-full` | 9999px | Pills, avatars, badges |

### Box Shadow
| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | Tailwind default | Cards, buttons |
| `shadow-soft` | `0 4px 20px -2px rgba(38,115,115,0.08)` | Subtle teal-tinted shadow |
| `shadow-md` | Tailwind default | Hover states |

## 2. Component Library

Components are **Web Components** (Custom Elements) in `design-system/components/`. All use **light DOM** (no Shadow DOM) with **Tailwind CSS classes**.

### Component List
| Component | File | Key Attributes |
|---|---|---|
| `<menu-button>` | `menu-button.js` | `variant` (primary\|outline\|ghost\|dark\|destructive\|destructive-outline\|destructive-ghost\|link), `icon`, `label`, `full-width`, `href` |
| `<menu-badge>` | `menu-badge.js` | `color` (tertiary\|secondary\|gray), `icon` |
| `<menu-card>` | `menu-card.js` | `title`, `price`, `subtitle`, `image`, `badge`, `badge-color`, `description` |
| `<menu-alert>` | `menu-alert.js` | `variant` (info\|warning\|error), `title`, `icon` |
| `<menu-input>` | `menu-input.js` | `label`, `placeholder`, `type`, `helper`, `error` |
| `<menu-textarea>` | `menu-textarea.js` | `label`, `placeholder`, `rows`, `helper` |
| `<menu-select>` | `menu-select.js` | `label`, `options` (JSON), `placeholder` |
| `<menu-checkbox>` | `menu-checkbox.js` | `label`, `checked` |
| `<menu-radio>` | `menu-radio.js` | `label`, `name`, `value`, `checked` |
| `<menu-switch>` | `menu-switch.js` | `label`, `checked` |
| `<menu-toggle>` | `menu-toggle.js` | `items` (CSV or JSON), `selected` |
| `<menu-tabs>` | `menu-tabs.js` | `items` (CSV or JSON), `selected` |
| `<menu-modal>` | `menu-modal.js` | `open`, `title`, `size` (sm\|md\|lg\|xl) |
| `<menu-toast>` | `menu-toast.js` | `variant`, `message`, `duration` |
| `<menu-breadcrumb>` | `menu-breadcrumb.js` | `items` (JSON) |
| `<menu-pagination>` | `menu-pagination.js` | `total`, `current`, `per-page` |
| `<menu-avatar>` | `menu-avatar.js` | `src`, `name`, `size` |

### Component Pattern
```javascript
class MenuComponent extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ['attr1', 'attr2']; }
    attributeChangedCallback() { this.render(); }
    render() {
        // Read attributes, build Tailwind-classed HTML
        this.innerHTML = `<div class="tailwind classes">...</div>`;
    }
}
customElements.define('menu-component', MenuComponent);
```

### Button Variants (Figma reference)
- **Primary**: `bg-primary text-white hover:bg-primary/90` — rounded-lg, px-6 py-2.5, font-bold
- **Outline**: `border-2 border-primary text-primary hover:bg-primary/5` — same shape, 2px border
- **Ghost**: `text-[#5c8a8a] hover:text-primary` — no background, no shadow, px-4
- **Dark**: `bg-[#101818] text-white hover:bg-[#101818]/90` — confirm/save actions
- **Destructive**: `bg-red-600 text-white hover:bg-red-700` — immediate destructive actions
- **Destructive-outline**: `border-2 border-red-300 text-red-600 hover:bg-red-50` — modal-confirmed deletes
- **Destructive-ghost**: `text-red-500 hover:text-red-700 hover:bg-red-50` — lighter modal-confirmed deletes
- **Link**: `text-primary underline hover:text-primary/80` — text links, renders as `<a>` when `href` is set

**Icon-only mode**: Omit the label text to get a compact 40x40 icon button: `<menu-button variant="ghost" icon="edit"></menu-button>`

## 3. Frameworks & Libraries

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS via CDN (no build) |
| Components | Vanilla JS Web Components |
| Icons | Material Symbols Outlined (Google Fonts CDN) |
| Fonts | Google Fonts CDN (Epilogue, Inter, Noto Sans JP) |
| Build | None — zero-build static site |
| Deploy | GitHub Pages |

## 4. Asset Management

- **No local image assets** — the design system uses Material Symbols icons and CSS-only visuals
- **Icons**: Material Symbols Outlined loaded via Google Fonts CDN
- **No bundler or asset pipeline** — everything is CDN-delivered

## 5. Icon System

- **Library**: Material Symbols Outlined (variable font)
- **CDN**: `fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1`
- **Usage**: `<span class="material-symbols-outlined">icon_name</span>`
- **Sizing**: Controlled via Tailwind text size classes (`text-sm`, `text-lg`, `text-xl`, etc.)
- **Key icons used**: `restaurant_menu`, `person`, `edit`, `delete`, `add`, `arrow_back`, `arrow_forward`, `visibility`, `close`, `search`, `eco`, `set_meal`, `kebab_dining`, `chevron_right`, `check`, `arrow_upward`, `arrow_downward`

## 6. Styling Approach

### Methodology
- **Utility-first** via Tailwind CSS — no custom CSS methodology (no BEM, no CSS Modules)
- **Inline styles** only for CSS custom properties in theme system
- **Global styles** set in `<style>` tags per page for font-family overrides

### Common Patterns
```html
<!-- Card container -->
<div class="bg-white rounded-xl border border-[#eaf1f1] p-8 shadow-sm">

<!-- Section heading -->
<h2 class="text-lg font-bold text-[#101818] mb-4">

<!-- Secondary text -->
<p class="text-[#5c8a8a] text-sm">

<!-- Action link -->
<a class="text-xs font-medium text-gray-500 hover:text-[#101818] flex items-center gap-1">

<!-- Divider -->
<div class="border-t border-[#eaf1f1]"></div>
```

### Responsive Breakpoints
- Mobile-first approach
- `lg:` (1024px) — sidebar switches from stacked to fixed left column
- `md:` (768px) — grid column changes
- Main content: `max-w-[1200px] px-6 lg:px-40`

## 7. Project Structure

```
menubridge-dl/
├── index.html                          # Redirect to design-system/
├── design-system/
│   ├── index.html                      # Landing page
│   ├── config.js                       # Tailwind token config
│   ├── layout.js                       # Sidebar injection + nav state
│   ├── changelog.html                  # Version history
│   ├── foundations/                     # Design token documentation
│   │   ├── colors.html
│   │   ├── typography.html
│   │   ├── spacing.html
│   │   ├── iconography.html
│   │   ├── grid.html
│   │   ├── elevation.html
│   │   ├── motion.html
│   │   └── logo.html
│   ├── components/                     # Web Components + showcase
│   │   ├── index.html                  # All components demo
│   │   ├── layout.html
│   │   └── menu-*.js                   # 19 component files
│   ├── examples/                       # Full page examples
│   │   ├── login.html
│   │   ├── create-menu.html
│   │   ├── menu-home.html
│   │   ├── edit-shared-menu.html
│   │   ├── edit-menu-item.html
│   │   ├── guest-menu.html             # Guest-facing with 5 themes
│   │   ├── review-menu.html
│   │   ├── review-enhanced.html
│   │   ├── preview-menu.html
│   │   ├── published-menu.html
│   │   ├── account-settings.html
│   │   └── marketing-landing.html      # Public-facing landing page
│   └── ai-toolkit/
│       └── prompts.html
```

### Page Template Pattern
Every page follows this structure:
```html
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Epilogue, Inter, Noto Sans JP, Material Symbols -->
    <script src="../config.js"></script>
    <script src="../layout.js"></script>
    <script src="../components/menu-*.js" defer></script>
</head>
<body class="bg-background-light text-[#101818] antialiased">
    <div class="relative flex min-h-screen flex-col lg:flex-row">
        <aside id="app-sidebar"></aside>  <!-- Injected by layout.js -->
        <main class="flex flex-1 flex-col items-center pb-20">
            <section class="w-full max-w-[1200px] px-6 py-12 lg:px-40">
                <!-- Hero: category label + title + description -->
                <!-- Preview: browser frame or phone mockup -->
                <!-- Documentation: anatomy, usage notes, code -->
            </section>
        </main>
    </div>
</body>
```

### Top Bar Pattern (App Chrome)
Used inside preview sections to simulate the app:
```html
<div class="bg-white border-b border-[#eaf1f1] px-8 py-4 flex items-center justify-between">
    <div class="text-lg font-bold font-display text-[#101818]">MenuBridge</div>
    <div class="flex items-center gap-4">
        <menu-toggle items="EN, JP" selected="EN"></menu-toggle>
        <div class="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
            <span class="material-symbols-outlined text-sm">person</span>
        </div>
    </div>
</div>
```
