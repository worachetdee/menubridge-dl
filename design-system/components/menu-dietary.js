class MenuDietary extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['items', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) this.render();
    }

    _parseItems() {
        const raw = this.getAttribute('items');
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (e) {
            return [];
        }
    }

    _toggle(index) {
        const items = this._parseItems();
        if (!items[index]) return;
        const current = items[index].state || 'default';
        // Cycle: default -> selected, suggested -> selected, selected -> default
        if (current === 'selected') {
            items[index].state = 'default';
        } else {
            items[index].state = 'selected';
        }
        this.setAttribute('items', JSON.stringify(items));
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { items } }));
    }

    render() {
        const items = this._parseItems();
        const label = this.getAttribute('label') || '';

        const itemsHtml = items.map((item, i) => {
            const state = item.state || 'default';
            const icon = item.icon || 'help';
            const name = item.label || '';

            let circleClasses, iconClasses, labelClasses, indicator;

            if (state === 'selected') {
                circleClasses = 'border-primary bg-primary/10';
                iconClasses = 'text-primary';
                labelClasses = 'text-primary font-semibold';
                indicator = `<span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span class="material-symbols-outlined text-white" style="font-size:12px;font-variation-settings:'FILL' 1">check</span>
                </span>`;
            } else if (state === 'suggested') {
                circleClasses = 'border-secondary/60 border-dashed bg-secondary/8';
                iconClasses = 'text-secondary';
                labelClasses = 'text-[#5c8a8a]';
                indicator = `<span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                    <span class="material-symbols-outlined text-white" style="font-size:11px;font-variation-settings:'FILL' 1">auto_awesome</span>
                </span>`;
            } else {
                circleClasses = 'border-[#d5dede] bg-white';
                iconClasses = 'text-[#9bb5b5]';
                labelClasses = 'text-[#9bb5b5]';
                indicator = '';
            }

            return `
                <div class="flex flex-col items-center gap-2 cursor-pointer select-none" data-index="${i}">
                    <div class="relative">
                        <div class="w-9 h-9 rounded-full border-2 ${circleClasses} flex items-center justify-center transition-all duration-200">
                            <span class="material-symbols-outlined text-2xl ${iconClasses} transition-colors duration-200">${icon}</span>
                        </div>
                        ${indicator}
                    </div>
                    <span class="text-xs ${labelClasses} transition-colors duration-200">${name}</span>
                </div>
            `;
        }).join('');

        // Build legend
        const suggestedItems = items.filter(i => i.state === 'suggested').map(i => i.label);
        const selectedItems = items.filter(i => i.state === 'selected').map(i => i.label);

        let legendHtml = '';
        if (suggestedItems.length || selectedItems.length) {
            const parts = [];
            if (suggestedItems.length) {
                parts.push(`<span class="text-secondary"><span class="material-symbols-outlined align-middle" style="font-size:14px;font-variation-settings:'FILL' 1">auto_awesome</span> Suggested: <strong>${suggestedItems.join(' · ')}</strong></span>`);
            }
            if (selectedItems.length) {
                parts.push(`<span class="text-primary"><span class="material-symbols-outlined align-middle" style="font-size:14px;font-variation-settings:'FILL' 1">check_circle</span> Selected: <strong>${selectedItems.join(' · ')}</strong></span>`);
            }
            legendHtml = `<div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">${parts.join('')}</div>`;
        }

        this.innerHTML = `
            ${label ? `<p class="text-sm text-[#5c8a8a] mb-4">${label}</p>` : ''}
            <div class="flex flex-wrap gap-5">${itemsHtml}</div>
            ${legendHtml}
        `;

        // Bind click handlers
        this.querySelectorAll('[data-index]').forEach(el => {
            el.addEventListener('click', () => this._toggle(parseInt(el.dataset.index)));
        });
    }
}

customElements.define('menu-dietary', MenuDietary);
