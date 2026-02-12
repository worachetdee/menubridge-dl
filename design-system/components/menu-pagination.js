class MenuPagination extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    static get observedAttributes() {
        return ['total', 'current', 'max-visible'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _handleClick(e) {
        const btn = e.target.closest('[data-page]');
        if (!btn || btn.hasAttribute('disabled')) return;

        const page = parseInt(btn.dataset.page, 10);
        const current = parseInt(this.getAttribute('current') || '1', 10);
        if (page !== current && page >= 1 && page <= parseInt(this.getAttribute('total') || '1', 10)) {
            this.setAttribute('current', String(page));
            this.dispatchEvent(new CustomEvent('change', {
                detail: { page },
                bubbles: true
            }));
        }
    }

    _getPageNumbers() {
        const total = parseInt(this.getAttribute('total') || '1', 10);
        const current = parseInt(this.getAttribute('current') || '1', 10);
        const maxVisible = parseInt(this.getAttribute('max-visible') || '5', 10);

        if (total <= maxVisible) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages = [];
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, current - half);
        let end = Math.min(total, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (end < total) {
            if (end < total - 1) pages.push('...');
            pages.push(total);
        }

        return pages;
    }

    render() {
        const total = parseInt(this.getAttribute('total') || '1', 10);
        const current = parseInt(this.getAttribute('current') || '1', 10);
        const pages = this._getPageNumbers();

        const isFirst = current === 1;
        const isLast = current === total;

        const btnBase = 'inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all';
        const btnActive = 'bg-primary text-white shadow-sm';
        const btnInactive = 'text-[#5c8a8a] hover:bg-primary/5 hover:text-primary';
        const btnDisabled = 'text-[#5c8a8a]/30 cursor-not-allowed';

        const pagesHtml = pages.map(page => {
            if (page === '...') {
                return `<span class="inline-flex items-center justify-center w-9 h-9 text-sm text-[#5c8a8a]">...</span>`;
            }
            const isActive = page === current;
            return `
                <button
                    type="button"
                    data-page="${page}"
                    class="${btnBase} ${isActive ? btnActive : btnInactive}"
                >
                    ${page}
                </button>
            `;
        }).join('');

        this.style.display = 'block';

        this.innerHTML = `
            <nav class="flex items-center gap-1" aria-label="Pagination">
                <button
                    type="button"
                    data-page="${current - 1}"
                    ${isFirst ? 'disabled' : ''}
                    class="${btnBase} ${isFirst ? btnDisabled : btnInactive}"
                >
                    <span class="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                ${pagesHtml}
                <button
                    type="button"
                    data-page="${current + 1}"
                    ${isLast ? 'disabled' : ''}
                    class="${btnBase} ${isLast ? btnDisabled : btnInactive}"
                >
                    <span class="material-symbols-outlined text-lg">chevron_right</span>
                </button>
            </nav>
        `;
    }
}

customElements.define('menu-pagination', MenuPagination);
