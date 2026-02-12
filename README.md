# MenuBridge Design System

The MenuBridge Design System (formerly MenuAI) is a comprehensive collection of reusable components, design patterns, and guidelines for culinary applications. It bridges language gaps with appetizing clarity, using a palette inspired by nature and typography rooted in editorial elegance.

## Features

- **Atomic Design Principles**: Organized into Foundations (Colors, Typography) and Components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Web Components**: Framework-agnostic, reusable custom elements.
- **Responsive**: Mobile-first design ensuring compatibility across devices.
- **Dark Mode Support**: Built-in support for light and dark themes (configured via Tailwind).
- **Zero-Build**: No complex build tools required.

## Directory Structure

- **`design-system/`**: The core project files.
  - **`foundations/`**: Colors, typography, and basic tokens.
  - **`components/`**: Reusable Web Components (Button, Badge, Card, Alert, Toggle, Input, Textarea, Select, Checkbox, Radio, Tabs, Breadcrumb, Pagination, Modal, Toast, Switch, Avatar).
  - **`examples/`**: Full page implementations (Login, Create Menu, Review Menu, Review Enhanced, Preview Menu, Published Menu).
- **`index.html`**: Root redirect to the design system.
- **`layout.js`**: Shared layout logic.

## Local Development

To run the project locally, you can use any static file server. For example:

```bash
# Using python
python3 -m http.server 8000

# Using serve
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

This project is configured for **GitHub Pages**.

1.  Push the code to your repository.
2.  Go to **Settings** > **Pages**.
3.  Source: **Deploy from a branch**.
4.  Branch: **main** / **(root)**.
5.  Save.

The site will be available at `https://<username>.github.io/menubridge-dl/`.

### Configuration
*   **`.nojekyll`**: Included to ensure files starting with `_` are not ignored.
*   **`index.html`**: Redirects traffic from the root to `design-system/index.html`.

## Changelog

### v1.8 — February 12, 2026
- Added **Preview Menu** page with bilingual JP/EN side-by-side layout, dietary filters, and search
- Added **Published Menu** page with QR code, shareable link, and action buttons
- Fixed sidebar highlighting collision; improved all active-state checks to exact path matching

### v1.7 — February 10, 2026
- Added **Review Enhanced** page with native `<details>` accordion for menu categories
- Dietary restriction icons (vegetarian, vegan, gluten-free) per menu item
- Guest Notes section with editable textarea and character counter

### v1.6 — February 7, 2026
- Added `<menu-modal>` with backdrop click and ESC key dismissal
- Added `<menu-toast>` with auto-dismiss and success/error/warning/info variants
- Added `<menu-switch>` toggle with accessible ARIA attributes
- Added `<menu-avatar>` with image, initials fallback, and status indicator

### v1.5 — February 5, 2026
- Added form controls: `<menu-input>`, `<menu-textarea>`, `<menu-select>`, `<menu-checkbox>`, `<menu-radio>`
- Added navigation components: `<menu-tabs>`, `<menu-breadcrumb>`, `<menu-pagination>`
- Updated Components showcase page with live demos for all 8 new components

### v1.4 — February 2, 2026
- Added **Review Menu** example page for menu verification flow
- Added **Layout** documentation explaining the zero-build injection system
- Updated sidebar with new Example and Library links

### v1.3 — January 30, 2026
- Added `<menu-toggle>` component for boolean states
- Added Japanese typography support using Noto Sans JP
- New sections for Toggle patterns and localized type scales

### v1.2 — January 28, 2026
- Added Login Page and Create Menu example implementations
- Updated `<menu-card>` to support custom badge icons
- Updated `<menu-button>` to support `full-width` layout

### v1.1 — January 28, 2026
- Switched from top header to fixed sidebar layout
- Added detailed Type Scale table and usage guidelines
- Official rename to "MenuBridge"

### v1.0 — January 28, 2026
- Initial release: Color Palette, Typography, Buttons, Badges, Translation Cards
- Zero-build HTML/JS architecture with Tailwind CSS

## Technologies

-   **HTML5**
-   **Tailwind CSS** (via CDN)
-   **JavaScript** (Vanilla Web Components)
-   **Google Fonts** (Epilogue, Inter, Noto Sans)
-   **Material Symbols** (Iconography)
