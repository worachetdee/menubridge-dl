class MenuAlert extends HTMLElement {
    constructor() {
        super();
        this._originalContent = null;
        this._isRendered = false;
    }

    connectedCallback() {
        if (this._originalContent === null) {
            this._originalContent = this.innerHTML;
        }

        if (!this._isRendered) {
            this.render();
        }
    }

    static get observedAttributes() {
        return ['variant', 'title', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this._isRendered) {
            this.render();
        }
    }

    render() {
        this._isRendered = true;
        const variant = this.getAttribute('variant') || 'info';
        const title = this.getAttribute('title') || '';
        // Use cached content to avoid re-wrapping generated markup
        const content = this._originalContent !== null ? this._originalContent : this.innerHTML;

        let baseClasses = "rounded-lg p-4 border flex gap-3 items-start text-sm";
        let variantClasses = "";
        let iconName = "";

        // Design System Colors:
        // Primary: #267373 (Teal)
        // Secondary: #86B386 (Green)
        // Tertiary: #CC5C2E (Terracotta)

        switch (variant) {
            case 'warning':
                variantClasses = "bg-amber-50 border-amber-200 text-amber-800";
                iconName = "warning";
                break;
            case 'error':
                variantClasses = "bg-tertiary/10 border-tertiary/20 text-tertiary";
                iconName = "error";
                break;
            case 'info':
            default:
                variantClasses = "bg-primary/10 border-primary/20 text-primary";
                iconName = "info";
                break;
        }

        // Override icon if provided
        if (this.hasAttribute('icon')) {
            iconName = this.getAttribute('icon');
        }

        this.innerHTML = `
            <div class="${baseClasses} ${variantClasses}">
                <span class="material-symbols-outlined text-lg shrink-0 mt-0.5">${iconName}</span>
                <div>
                    ${title ? `<h4 class="font-bold mb-1">${title}</h4>` : ''}
                    <div class="leading-relaxed opacity-90">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('menu-alert', MenuAlert);
