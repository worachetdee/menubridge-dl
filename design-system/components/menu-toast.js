class MenuToast extends HTMLElement {
    constructor() {
        super();
        this._timeout = null;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['variant', 'message', 'duration', 'open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
            if (name === 'open' && this.hasAttribute('open')) {
                this._startTimer();
            }
        }
    }

    _startTimer() {
        clearTimeout(this._timeout);
        const duration = parseInt(this.getAttribute('duration') || '3000', 10);
        if (duration > 0) {
            this._timeout = setTimeout(() => this.dismiss(), duration);
        }
    }

    dismiss() {
        this.removeAttribute('open');
        this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true }));
    }

    show(message, variant) {
        if (message) this.setAttribute('message', message);
        if (variant) this.setAttribute('variant', variant);
        this.setAttribute('open', '');
    }

    render() {
        this.style.display = 'block';

        const isOpen = this.hasAttribute('open');
        const variant = this.getAttribute('variant') || 'info';
        const message = this.getAttribute('message') || '';

        if (!isOpen) {
            this.innerHTML = '';
            return;
        }

        const config = {
            success: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: 'check_circle' },
            error: { bg: 'bg-red-50 border-red-200 text-red-800', icon: 'error' },
            warning: { bg: 'bg-amber-50 border-amber-200 text-amber-800', icon: 'warning' },
            info: { bg: 'bg-blue-50 border-blue-200 text-blue-800', icon: 'info' }
        }[variant] || { bg: 'bg-blue-50 border-blue-200 text-blue-800', icon: 'info' };

        this.innerHTML = `
            <div class="fixed top-6 right-6 z-[110] animate-[slideIn_0.3s_ease-out]">
                <div class="flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${config.bg} min-w-[280px] max-w-sm">
                    <span class="material-symbols-outlined text-lg shrink-0">${config.icon}</span>
                    <p class="text-sm font-medium flex-1">${message}</p>
                    <button data-dismiss class="opacity-60 hover:opacity-100 transition-opacity cursor-pointer shrink-0">
                        <span class="material-symbols-outlined text-base">close</span>
                    </button>
                </div>
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;

        this.querySelector('[data-dismiss]').addEventListener('click', () => this.dismiss());
    }
}

customElements.define('menu-toast', MenuToast);
