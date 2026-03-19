class MenuToggle extends HTMLElement {
    constructor() {
        super();
        this._handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
    }

    static get observedAttributes() {
        return ['items', 'selected'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'selected' && oldValue !== null) {
                this.slideToSelected();
            } else {
                this.render();
            }
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

    getItems() {
        const itemsAttr = this.getAttribute('items') || 'EN,JP';
        let items = [];
        try {
            items = JSON.parse(itemsAttr);
        } catch (e) {
            items = itemsAttr.split(',').map(i => ({ label: i.trim(), value: i.trim() }));
        }
        if (items.length && typeof items[0] === 'string') {
            items = items.map(i => ({ label: i, value: i }));
        }
        return items;
    }

    slideToSelected() {
        const items = this.getItems();
        const selected = this.getAttribute('selected') || items[0].value;
        const selectedIndex = items.findIndex(i => i.value === selected);
        if (selectedIndex < 0) return;

        const indicator = this.querySelector('[data-indicator]');
        const buttons = this.querySelectorAll('button');
        if (!indicator || !buttons.length) return;

        const targetBtn = buttons[selectedIndex];
        if (!targetBtn) return;

        // Animate indicator
        indicator.style.left = targetBtn.offsetLeft + 'px';
        indicator.style.width = targetBtn.offsetWidth + 'px';

        // Update button styles
        buttons.forEach((btn, i) => {
            if (i === selectedIndex) {
                btn.classList.remove('text-[#5c8a8a]');
                btn.classList.add('text-[#267373]');
            } else {
                btn.classList.remove('text-[#267373]');
                btn.classList.add('text-[#5c8a8a]');
            }
        });
    }

    render() {
        const items = this.getItems();
        const selected = this.getAttribute('selected') || items[0].value;
        const selectedIndex = items.findIndex(i => i.value === selected);

        const buttonsHtml = items.map((item, i) => {
            const isSelected = i === selectedIndex;
            const textColor = isSelected ? 'text-[#267373]' : 'text-[#5c8a8a]';
            return `<button type="button" data-value="${item.value}" class="relative z-10 px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors duration-200 ${textColor}">${item.label}</button>`;
        }).join('');

        this.innerHTML = `
            <div class="relative inline-flex rounded-lg bg-[#f0f4f4] p-0.5" style="user-select:none">
                <div data-indicator class="absolute top-0.5 left-0 h-[calc(100%-4px)] bg-white rounded-md shadow-sm transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]" style="pointer-events:none"></div>
                ${buttonsHtml}
            </div>
        `;

        // Position indicator after render
        requestAnimationFrame(() => {
            const indicator = this.querySelector('[data-indicator]');
            const targetBtn = this.querySelectorAll('button')[selectedIndex >= 0 ? selectedIndex : 0];
            if (indicator && targetBtn) {
                indicator.style.left = targetBtn.offsetLeft + 'px';
                indicator.style.width = targetBtn.offsetWidth + 'px';
            }
        });
    }
}

customElements.define('menu-toggle', MenuToggle);
