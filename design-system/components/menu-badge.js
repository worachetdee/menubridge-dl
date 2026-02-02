class MenuBadge extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['color', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const color = this.getAttribute('color') || 'gray';
        const icon = this.getAttribute('icon');
        const label = this.textContent.trim();

        let colorClasses = "";
        let iconColorClass = "";

        switch (color) {
            case 'tertiary': // Warning/Alert
                colorClasses = "bg-tertiary/10 text-tertiary ring-tertiary/20";
                iconColorClass = "text-tertiary";
                break;
            case 'secondary': // Success/Verified
                colorClasses = "bg-secondary/15 text-[#5c8a8a] ring-secondary/30";
                iconColorClass = "text-[#5c8a8a]";
                break;
            case 'gray':
            default:
                colorClasses = "bg-gray-100 text-gray-600 ring-gray-600/10";
                iconColorClass = "text-gray-500";
                break;
        }

        const iconHtml = icon
            ? `<span class="material-symbols-outlined text-[14px] mr-1.5">${icon}</span>`
            : `<span class="w-1.5 h-1.5 rounded-full ${color === 'tertiary' ? 'bg-tertiary' : 'bg-gray-400'} mr-1.5"></span>`;

        this.innerHTML = `
            <span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${colorClasses}">
                ${iconHtml}
                ${label}
            </span>
        `;
    }
}

customElements.define('menu-badge', MenuBadge);
