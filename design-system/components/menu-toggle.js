class MenuToggle extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.toggle.bind(this));
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['checked', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    toggle() {
        if (this.hasAttribute('checked')) {
            this.removeAttribute('checked');
        } else {
            this.setAttribute('checked', '');
        }
        // Dispatch change event
        this.dispatchEvent(new Event('change', { bubbles: true }));
    }

    render() {
        const checked = this.hasAttribute('checked');
        const label = this.getAttribute('label') || '';

        // Container styles
        const containerClass = `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`;

        // Handle styles
        const handleClass = `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`;

        this.innerHTML = `
            <div class="flex items-center cursor-pointer">
                <div class="${containerClass}">
                    <span class="${handleClass}"></span>
                </div>
                ${label ? `<span class="ml-3 text-sm font-medium text-gray-900">${label}</span>` : ''}
            </div>
        `;
    }
}

customElements.define('menu-toggle', MenuToggle);
