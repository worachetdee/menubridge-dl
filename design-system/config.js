// MenuBridge Design System - Tailwind Configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#267373",
                "secondary": "#86B386",
                "tertiary": "#CC5C2E",
                "background-light": "#f8f8f7",
                "background-dark": "#18181b",
                "surface": "#ffffff",
            },
            fontFamily: {
                "display": ["Epilogue", "serif"],
                "body": ["Inter", "sans-serif"],
                "jp": ["Noto Sans JP", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(38, 115, 115, 0.08)",
            }
        },
    },
}
