class MenuBreadcrumb extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['items'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const itemsAttr = this.getAttribute('items') || '[]';

        let items = [];
        try {
            items = JSON.parse(itemsAttr);
        } catch (e) {
            items = [];
        }

        if (!items.length) {
            this.innerHTML = '';
            return;
        }

        const crumbsHtml = items.map((item, index) => {
            const isLast = index === items.length - 1;
            const separator = !isLast
                ? '<span class="material-symbols-outlined text-sm text-[#5c8a8a]/50 mx-1">chevron_right</span>'
                : '';

            if (isLast) {
                return `<span class="text-sm font-medium text-[#101818]">${item.label}</span>`;
            }

            return `
                <a href="${item.href || '#'}" class="text-sm text-[#5c8a8a] hover:text-primary transition-colors">${item.label}</a>
                ${separator}
            `;
        }).join('');

        this.style.display = 'block';

        this.innerHTML = `
            <nav class="flex items-center flex-wrap" aria-label="Breadcrumb">
                ${crumbsHtml}
            </nav>
        `;
    }
}

customElements.define('menu-breadcrumb', MenuBreadcrumb);
