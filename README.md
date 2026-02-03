# MenuAI Design System

The MenuAI Design System is a comprehensive collection of reusable components, design patterns, and guidelines for the MenuAI platform. It is designed to bridge language gaps with appetizing clarity, using a palette inspired by nature and typography rooted in editorial elegance.

## Features

- **Atomic Design Principles**: Organized into Foundations (Colors, Typography) and Components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Web Components**: Framework-agnostic, reusable custom elements.
- **Responsive**: Mobile-first design ensuring compatibility across devices.
- **Dark Mode Support**: Built-in support for light and dark themes (configured via Tailwind).

## Project Structure

```text
.
├── code.html                   # Main landing page for the Design System
├── design-system/
│   ├── components/             # Reusable Web Components (e.g., buttons, cards)
│   ├── examples/               # Usage examples
│   ├── foundations/            # Design tokens (colors, typography)
│   ├── config.js               # Tailwind CSS configuration
│   ├── layout.js               # Shared layout logic
│   └── index.html              # Documentation entry point
```

## Getting Started

To view the design system documentation and examples, simply open `code.html` or `design-system/index.html` in your web browser.

No build step is required as the project uses CDN-hosted Tailwind CSS and vanilla JavaScript.

### Using Components

The design system uses standard Web Components. To use them in your project:

1.  Include the Tailwind CSS script and configuration.
2.  Import the desired component scripts from `design-system/components/`.

Example:

```html
<script src="design-system/components/menu-button.js"></script>

<menu-button variant="primary">Translate Menu</menu-button>
```

## Technologies

-   **HTML5**
-   **Tailwind CSS** (via CDN)
-   **JavaScript** (Vanilla Web Components)
-   **Google Fonts** (Epilogue, Inter, Noto Sans)
-   **Material Symbols** (Iconography)
