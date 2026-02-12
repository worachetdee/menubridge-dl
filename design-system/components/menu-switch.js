class MenuSwitch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['checked', 'disabled', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleClick() {
        if (this.hasAttribute('disabled')) return;
        const isChecked = this.hasAttribute('checked');
        if (isChecked) {
            this.removeAttribute('checked');
        } else {
            this.setAttribute('checked', '');
        }
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: !isChecked },
            bubbles: true
        }));
    }

    render() {
        this.style.display = 'block';

        const checked = this.hasAttribute('checked');
        const disabled = this.hasAttribute('disabled');
        const label = this.getAttribute('label') || '';

        const trackClasses = checked
            ? 'bg-primary'
            : 'bg-gray-200';
        const thumbTranslate = checked
            ? 'translate-x-5'
            : 'translate-x-0';
        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

        this.innerHTML = `
            <label class="inline-flex items-center gap-3 ${disabledClass} select-none">
                <span class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${trackClasses}" role="switch" aria-checked="${checked}">
                    <span class="inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${thumbTranslate} ml-1"></span>
                </span>
                ${label ? `<span class="text-sm text-[#101818]">${label}</span>` : ''}
            </label>
        `;
    }
}

customElements.define('menu-switch', MenuSwitch);
