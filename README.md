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
  - **`components/`**: Reusable Web Components (Buttons, Cards, Toggles).
  - **`examples/`**: Full page implementations (Login, Menu Creation, Review Menu).
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

## Technologies

-   **HTML5**
-   **Tailwind CSS** (via CDN)
-   **JavaScript** (Vanilla Web Components)
-   **Google Fonts** (Epilogue, Inter, Noto Sans)
-   **Material Symbols** (Iconography)
