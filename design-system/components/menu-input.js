class MenuInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('input', this._handleInput.bind(this));
        this.addEventListener('change', this._handleChange.bind(this));
    }

    static get observedAttributes() {
        return ['label', 'placeholder', 'type', 'icon', 'value', 'error', 'helper', 'disabled', 'required'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleInput(e) {
        if (e.target.tagName === 'INPUT') {
            this.setAttribute('value', e.target.value);
        }
    }

    _handleChange(e) {
        if (e.target.tagName === 'INPUT') {
            this.setAttribute('value', e.target.value);
        }
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';
        const icon = this.getAttribute('icon') || '';
        const value = this.getAttribute('value') || '';
        const error = this.getAttribute('error') || '';
        const helper = this.getAttribute('helper') || '';
        const disabled = this.hasAttribute('disabled');
        const required = this.hasAttribute('required');

        const hasError = !!error;
        const borderClass = hasError
            ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
            : 'border-[#eaf1f1] focus:ring-2 focus:ring-primary/30 focus:border-primary';
        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white';

        this.style.display = 'block';

        this.innerHTML = `
            <div class="flex flex-col gap-1.5 w-full">
                ${label ? `
                    <label class="text-sm font-medium text-[#101818]">
                        ${label}${required ? '<span class="text-red-500 ml-0.5">*</span>' : ''}
                    </label>
                ` : ''}
                <div class="relative">
                    ${icon ? `<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#5c8a8a] pointer-events-none">${icon}</span>` : ''}
                    <input
                        type="${type}"
                        placeholder="${placeholder}"
                        value="${value}"
                        ${disabled ? 'disabled' : ''}
                        ${required ? 'required' : ''}
                        class="w-full rounded-lg border ${borderClass} ${disabledClass} px-3 py-2.5 text-sm text-[#101818] placeholder-[#5c8a8a]/50 outline-none transition-all shadow-none ${icon ? 'pl-10' : ''}"
                    />
                </div>
                ${error ? `<p class="text-xs text-red-600 flex items-center gap-1"><span class="material-symbols-outlined text-sm">error</span>${error}</p>` : ''}
                ${!error && helper ? `<p class="text-xs text-[#5c8a8a]">${helper}</p>` : ''}
            </div>
        `;
    }
}

customElements.define('menu-input', MenuInput);
