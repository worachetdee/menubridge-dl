class MenuToggle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.handleClick.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['items', 'selected'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    handleClick(e) {
        const button = e.target.closest('button');
        if (!button) return;

        const newValue = button.dataset.value;
        if (newValue && newValue !== this.getAttribute('selected')) {
            this.setAttribute('selected', newValue);
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: newValue },
                bubbles: true
            }));
        }
    }

    render() {
        const itemsAttr = this.getAttribute('items') || 'EN,JP'; // Default items
        const selected = this.getAttribute('selected') || itemsAttr.split(',')[0].trim();

        let items = [];
        try {
            // Try parsing as JSON first
            items = JSON.parse(itemsAttr);
        } catch (e) {
            // Fallback to comma-separated string
            items = itemsAttr.split(',').map(i => ({ label: i.trim(), value: i.trim() }));
        }

        // Normalize simple strings array to objects if needed, although the split above handles it.
        // If JSON was simple strings: ["A", "B"]
        if (items.length && typeof items[0] === 'string') {
            items = items.map(i => ({ label: i, value: i }));
        }

        const containerClasses = "inline-flex rounded-lg bg-[#F3F4F6] p-1";

        const buttonsHtml = items.map(item => {
            const isSelected = item.value === selected;
            const selectedClasses = "bg-[#101818] text-white shadow-sm font-bold";
            const unselectedClasses = "text-gray-500 hover:text-black font-medium";
            const baseClasses = "px-4 py-1.5 text-xs rounded-md transition-all duration-200";

            return `
                <button 
                    type="button"
                    data-value="${item.value}"
                    class="${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}"
                >
                    ${item.label}
                </button>
            `;
        }).join('');

        this.innerHTML = `
            <div class="${containerClasses}">
                ${buttonsHtml}
            </div>
        `;
    }
}

customElements.define('menu-toggle', MenuToggle);
