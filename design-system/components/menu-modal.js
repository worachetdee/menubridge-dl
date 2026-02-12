class MenuModal extends HTMLElement {
    constructor() {
        super();
        this._originalContent = null;
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    connectedCallback() {
        if (this._originalContent === null) {
            this._originalContent = this.innerHTML;
        }
        this.render();
    }

    static get observedAttributes() {
        return ['open', 'title', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
            if (name === 'open') {
                if (this.hasAttribute('open')) {
                    document.addEventListener('keydown', this._handleKeyDown);
                    document.body.style.overflow = 'hidden';
                } else {
                    document.removeEventListener('keydown', this._handleKeyDown);
                    document.body.style.overflow = '';
                }
            }
        }
    }

    _handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close() {
        this.removeAttribute('open');
        this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    }

    render() {
        this.style.display = 'block';

        const isOpen = this.hasAttribute('open');
        const title = this.getAttribute('title') || '';
        const size = this.getAttribute('size') || 'md';
        const content = this._originalContent || '';

        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl'
        }[size] || 'max-w-lg';

        if (!isOpen) {
            this.innerHTML = '';
            return;
        }

        this.innerHTML = `
            <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
                <div data-backdrop class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
                <div class="relative bg-white rounded-2xl shadow-xl ${sizeClasses} w-full border border-[#eaf1f1] transform transition-all">
                    <div class="flex items-center justify-between p-6 pb-0">
                        ${title ? `<h3 class="font-display font-bold text-lg text-[#101818]">${title}</h3>` : '<div></div>'}
                        <button data-close class="text-[#5c8a8a] hover:text-[#101818] transition-colors rounded-lg p-1 hover:bg-black/5 cursor-pointer">
                            <span class="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                    <div class="p-6 text-sm text-[#101818] leading-relaxed">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        this.querySelector('[data-backdrop]').addEventListener('click', () => this.close());
        this.querySelector('[data-close]').addEventListener('click', () => this.close());
    }
}

customElements.define('menu-modal', MenuModal);
