class MenuOverflow extends HTMLElement {
    constructor() {
        super();
        this._isOpen = false;
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }

    connectedCallback() {
        this.render();
        document.addEventListener('click', this._handleOutsideClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._handleOutsideClick);
    }

    static get observedAttributes() {
        return ['items', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleOutsideClick(e) {
        if (!this.contains(e.target) && this._isOpen) {
            this._close();
        }
    }

    _toggle(e) {
        e.stopPropagation();
        if (this._isOpen) {
            this._close();
        } else {
            // Close any other open overflows
            document.querySelectorAll('menu-overflow').forEach(el => {
                if (el !== this && el._isOpen) el._close();
            });
            this._open();
        }
    }

    _open() {
        this._isOpen = true;
        const dropdown = this.querySelector('[data-dropdown]');
        if (dropdown) dropdown.classList.add('block');
    }

    _close() {
        this._isOpen = false;
        const dropdown = this.querySelector('[data-dropdown]');
        if (dropdown) dropdown.classList.remove('block');
    }

    _getItems() {
        const itemsAttr = this.getAttribute('items') || '[]';
        try {
            return JSON.parse(itemsAttr);
        } catch (e) {
            return [];
        }
    }

    render() {
        const icon = this.getAttribute('icon') || 'more_vert';
        const items = this._getItems();
        this.style.display = 'block';
        this.style.position = 'relative';

        const itemsHtml = items.map(item => {
            if (item.divider) {
                return `<div class="h-px bg-[#eaf1f1] my-1"></div>`;
            }
            const dangerClass = item.danger
                ? 'text-tertiary hover:bg-tertiary/5'
                : 'text-[#101818] hover:bg-background-light';
            const iconColor = item.danger ? 'text-tertiary' : 'text-[#5c8a8a]';
            return `
                <button data-action="${item.action || item.label || ''}" class="flex items-center gap-2 w-full px-3.5 py-2.5 text-[13px] font-medium ${dangerClass} transition-colors cursor-pointer text-left">
                    ${item.icon ? `<span class="material-symbols-outlined text-[15px] ${iconColor}">${item.icon}</span>` : ''}
                    ${item.label || ''}
                </button>
            `;
        }).join('');

        this.innerHTML = `
            <button data-trigger class="flex items-center justify-center w-7 h-7 rounded text-[#5c8a8a] hover:bg-background-light transition-colors cursor-pointer border-0 bg-transparent">
                <span class="material-symbols-outlined text-xl">${icon}</span>
            </button>
            <div data-dropdown class="hidden absolute top-full right-0 mt-1 min-w-[160px] bg-white border border-[#eaf1f1] rounded-lg shadow-lg z-50 overflow-hidden py-1">
                ${itemsHtml}
            </div>
        `;

        this.querySelector('[data-trigger]').addEventListener('click', (e) => this._toggle(e));

        // Item click events
        this.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('action', {
                    detail: { action: btn.dataset.action },
                    bubbles: true
                }));
                this._close();
            });
        });
    }
}

customElements.define('menu-overflow', MenuOverflow);
