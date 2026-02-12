class MenuAvatar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['src', 'name', 'size', 'status'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    _getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    }

    render() {
        this.style.display = 'inline-block';

        const src = this.getAttribute('src') || '';
        const name = this.getAttribute('name') || '';
        const size = this.getAttribute('size') || 'md';
        const status = this.getAttribute('status') || '';

        const sizeConfig = {
            sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2 h-2 ring-1' },
            md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 ring-2' },
            lg: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3 h-3 ring-2' },
            xl: { container: 'w-20 h-20', text: 'text-2xl', status: 'w-3.5 h-3.5 ring-2' }
        }[size] || { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 ring-2' };

        const statusColors = {
            online: 'bg-emerald-400',
            offline: 'bg-gray-300',
            away: 'bg-amber-400',
            busy: 'bg-red-400'
        };

        const statusDot = status && statusColors[status]
            ? `<span class="absolute bottom-0 right-0 ${sizeConfig.status} ${statusColors[status]} rounded-full ring-white"></span>`
            : '';

        const imageContent = src
            ? `<img src="${src}" alt="${name}" class="w-full h-full object-cover" />`
            : `<span class="${sizeConfig.text} font-bold text-primary">${this._getInitials(name)}</span>`;

        const bgClass = src ? '' : 'bg-primary/10';

        this.innerHTML = `
            <div class="relative inline-flex shrink-0 ${sizeConfig.container}">
                <div class="inline-flex items-center justify-center w-full h-full rounded-full ${bgClass} overflow-hidden">
                    ${imageContent}
                </div>
                ${statusDot}
            </div>
        `;
    }
}

customElements.define('menu-avatar', MenuAvatar);
