class MenuRadio extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['name', 'options', 'selected', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleClick(e) {
        if (this.hasAttribute('disabled')) return;
        const item = e.target.closest('[data-value]');
        if (!item) return;

        const newValue = item.dataset.value;
        if (newValue !== this.getAttribute('selected')) {
            this.setAttribute('selected', newValue);
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: newValue },
                bubbles: true
            }));
        }
    }

    render() {
        const optionsAttr = this.getAttribute('options') || '[]';
        const selected = this.getAttribute('selected') || '';
        const disabled = this.hasAttribute('disabled');

        let options = [];
        try {
            options = JSON.parse(optionsAttr);
        } catch (e) {
            options = optionsAttr.split(',').map(i => ({ label: i.trim(), value: i.trim() }));
        }
        if (options.length && typeof options[0] === 'string') {
            options = options.map(i => ({ label: i, value: i }));
        }

        const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

        const itemsHtml = options.map(opt => {
            const isSelected = opt.value === selected;
            const ringClasses = isSelected
                ? 'border-primary'
                : 'border-[#eaf1f1] hover:border-primary/50';
            const dotHtml = isSelected
                ? '<span class="w-2.5 h-2.5 rounded-full bg-primary"></span>'
                : '';

            return `
                <label data-value="${opt.value}" class="inline-flex items-center gap-2.5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} select-none">
                    <span class="flex items-center justify-center w-5 h-5 rounded-full border-2 ${ringClasses} transition-all shrink-0 bg-white">
                        ${dotHtml}
                    </span>
                    <span class="text-sm text-[#101818]">${opt.label}</span>
                </label>
            `;
        }).join('');

        this.style.display = 'block';

        this.innerHTML = `
            <div class="flex flex-col gap-3 ${disabledClass}" role="radiogroup">
                ${itemsHtml}
            </div>
        `;
    }
}

customElements.define('menu-radio', MenuRadio);
