class MenuSelect extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('change', this._handleChange.bind(this));
    }

    static get observedAttributes() {
        return ['label', 'placeholder', 'options', 'value', 'icon', 'error', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleChange(e) {
        if (e.target.tagName === 'SELECT') {
            this.setAttribute('value', e.target.value);
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: e.target.value },
                bubbles: true
            }));
            e.stopPropagation();
        }
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || 'Select an option';
        const optionsAttr = this.getAttribute('options') || '[]';
        const value = this.getAttribute('value') || '';
        const icon = this.getAttribute('icon') || '';
        const error = this.getAttribute('error') || '';
        const disabled = this.hasAttribute('disabled');

        let options = [];
        try {
            options = JSON.parse(optionsAttr);
        } catch (e) {
            options = [];
        }

        const hasError = !!error;
        const borderClass = hasError
            ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
            : 'border-[#eaf1f1] focus:ring-2 focus:ring-primary/30 focus:border-primary';
        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white';

        const optionsHtml = options.map(opt => {
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            const optValue = typeof opt === 'string' ? opt : opt.value;
            return `<option value="${optValue}" ${optValue === value ? 'selected' : ''}>${optLabel}</option>`;
        }).join('');

        this.style.display = 'block';

        this.innerHTML = `
            <div class="flex flex-col gap-1.5 w-full">
                ${label ? `<label class="text-sm font-medium text-[#101818]">${label}</label>` : ''}
                <div class="relative">
                    ${icon ? `<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#5c8a8a] pointer-events-none">${icon}</span>` : ''}
                    <select
                        ${disabled ? 'disabled' : ''}
                        class="w-full rounded-lg border ${borderClass} ${disabledClass} px-3 py-2.5 text-sm text-[#101818] outline-none transition-all appearance-none cursor-pointer ${icon ? 'pl-10' : ''} pr-10"
                    >
                        <option value="" disabled ${!value ? 'selected' : ''}>${placeholder}</option>
                        ${optionsHtml}
                    </select>
                    <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-lg text-[#5c8a8a] pointer-events-none">expand_more</span>
                </div>
                ${error ? `<p class="text-xs text-red-600 flex items-center gap-1"><span class="material-symbols-outlined text-sm">error</span>${error}</p>` : ''}
            </div>
        `;
    }
}

customElements.define('menu-select', MenuSelect);
