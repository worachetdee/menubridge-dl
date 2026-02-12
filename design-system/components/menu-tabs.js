class MenuTabs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['items', 'selected'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleClick(e) {
        const tab = e.target.closest('[data-value]');
        if (!tab) return;

        const newValue = tab.dataset.value;
        if (newValue !== this.getAttribute('selected')) {
            this.setAttribute('selected', newValue);
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: newValue },
                bubbles: true
            }));
        }
    }

    render() {
        const itemsAttr = this.getAttribute('items') || '[]';
        const selected = this.getAttribute('selected') || '';

        let items = [];
        try {
            items = JSON.parse(itemsAttr);
        } catch (e) {
            items = itemsAttr.split(',').map(i => ({ label: i.trim(), value: i.trim() }));
        }
        if (items.length && typeof items[0] === 'string') {
            items = items.map(i => ({ label: i, value: i }));
        }

        const activeTab = selected || (items.length ? items[0].value : '');

        const tabsHtml = items.map(item => {
            const isActive = item.value === activeTab;
            const activeClasses = 'text-primary border-b-2 border-primary font-semibold';
            const inactiveClasses = 'text-[#5c8a8a] border-b-2 border-transparent hover:text-[#101818] hover:border-[#eaf1f1]';

            return `
                <button
                    type="button"
                    data-value="${item.value}"
                    class="px-4 py-2.5 text-sm transition-all cursor-pointer ${isActive ? activeClasses : inactiveClasses}"
                >
                    ${item.label}
                </button>
            `;
        }).join('');

        this.style.display = 'block';

        this.innerHTML = `
            <div class="flex border-b border-[#eaf1f1] gap-1 overflow-x-auto">
                ${tabsHtml}
            </div>
        `;
    }
}

customElements.define('menu-tabs', MenuTabs);
