class MenuButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['variant', 'icon', 'label', 'href'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute('variant') || 'primary';
        const icon = this.getAttribute('icon');
        const href = this.getAttribute('href');
        const isFullWidth = this.hasAttribute('full-width');
        // Cache original text content before first render to prevent picking up
        // rendered icon text (e.g. "delete") on subsequent re-renders.
        if (this._originalLabel === undefined) {
            this._originalLabel = this.getAttribute('label') || this.textContent.trim();
        }
        const label = this.getAttribute('label') || this._originalLabel;
        const isIconOnly = icon && !label;

        let baseClasses = isIconOnly
            ? "inline-flex items-center justify-center rounded-lg w-10 h-10 font-bold transition-all text-sm cursor-pointer"
            : "inline-flex items-center justify-center rounded-lg px-6 py-2.5 font-bold shadow-sm transition-all text-sm cursor-pointer";
        if (isFullWidth) {
            baseClasses = baseClasses.replace('inline-flex', 'flex w-full');
        }
        let variantClasses = "";

        switch (variant) {
            case 'outline':
                variantClasses = isIconOnly
                    ? "border-2 border-primary text-primary hover:bg-primary/5"
                    : "border-2 border-primary text-primary hover:bg-primary/5 py-2";
                break;
            case 'ghost':
                variantClasses = "text-[#5c8a8a] hover:text-primary shadow-none" + (isIconOnly ? "" : " px-4");
                break;
            case 'dark':
                variantClasses = "bg-[#101818] text-white hover:bg-[#101818]/90 hover:shadow";
                break;
            case 'destructive':
                variantClasses = "bg-red-600 text-white hover:bg-red-700 hover:shadow";
                break;
            case 'destructive-outline':
                variantClasses = isIconOnly
                    ? "border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                    : "border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 py-2";
                break;
            case 'destructive-ghost':
                variantClasses = "text-red-500 hover:text-red-700 hover:bg-red-50 shadow-none" + (isIconOnly ? "" : " px-4");
                break;
            case 'link':
                variantClasses = "text-primary hover:text-primary/80 underline underline-offset-2 shadow-none bg-transparent" + (isIconOnly ? " no-underline" : "");
                break;
            case 'primary':
            default:
                variantClasses = "bg-primary text-white hover:bg-primary/90 hover:shadow";
                break;
        }

        const iconHtml = icon ? `<span class="material-symbols-outlined text-lg ${label ? 'mr-2' : ''}">${icon}</span>` : '';
        const tag = href ? 'a' : 'button';
        const hrefAttr = href ? ` href="${href}"` : '';

        this.innerHTML = `
            <${tag}${hrefAttr} class="${baseClasses} ${variantClasses}">
                ${iconHtml}
                ${label}
            </${tag}>
        `;
    }
}

customElements.define('menu-button', MenuButton);
