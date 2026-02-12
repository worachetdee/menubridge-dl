class MenuCheckbox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['label', 'checked', 'disabled', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleClick(e) {
        if (this.hasAttribute('disabled')) return;
        const isChecked = this.hasAttribute('checked');
        if (isChecked) {
            this.removeAttribute('checked');
        } else {
            this.setAttribute('checked', '');
        }
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: !isChecked,
                value: this.getAttribute('value') || ''
            },
            bubbles: true
        }));
    }

    render() {
        const label = this.getAttribute('label') || '';
        const checked = this.hasAttribute('checked');
        const disabled = this.hasAttribute('disabled');

        const boxClasses = checked
            ? 'bg-primary border-primary text-white'
            : 'bg-white border-[#eaf1f1] hover:border-primary/50';
        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

        this.style.display = 'block';

        this.innerHTML = `
            <label class="inline-flex items-center gap-2.5 ${disabledClass} select-none">
                <span class="flex items-center justify-center w-5 h-5 rounded-md border-2 ${boxClasses} transition-all shrink-0">
                    ${checked ? '<span class="material-symbols-outlined text-sm font-bold">check</span>' : ''}
                </span>
                ${label ? `<span class="text-sm text-[#101818]">${label}</span>` : ''}
            </label>
        `;
    }
}

customElements.define('menu-checkbox', MenuCheckbox);
