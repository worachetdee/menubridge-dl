class MenuButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['variant', 'icon', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute('variant') || 'primary';
        const icon = this.getAttribute('icon');
        const isFullWidth = this.hasAttribute('full-width');
        // If content is clean/empty (initial load), we might want to preserve childNodes if we weren't doing innerHTML replacement.
        // But for simplicity, we treat textContent as the label source unless a label attr exists.
        const label = this.getAttribute('label') || this.textContent.trim();

        let baseClasses = "inline-flex items-center justify-center rounded-lg px-6 py-2.5 font-bold shadow-sm transition-all text-sm cursor-pointer";
        if (isFullWidth) {
            baseClasses = baseClasses.replace('inline-flex', 'flex w-full');
        }
        let variantClasses = "";

        switch (variant) {
            case 'outline':
                variantClasses = "border-2 border-primary text-primary hover:bg-primary/5 py-2"; // adjust py for border
                break;
            case 'ghost':
                variantClasses = "text-[#5c8a8a] hover:text-primary shadow-none px-4";
                break;
            case 'primary':
            default:
                variantClasses = "bg-primary text-white hover:bg-primary/90 hover:shadow";
                break;
        }

        const iconHtml = icon ? `<span class="material-symbols-outlined text-lg ${label ? 'mr-2' : ''}">${icon}</span>` : '';

        this.innerHTML = `
            <button class="${baseClasses} ${variantClasses}">
                ${iconHtml}
                ${label}
            </button>
        `;
    }
}

customElements.define('menu-button', MenuButton);
