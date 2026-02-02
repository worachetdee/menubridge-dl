class MenuCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'price', 'subtitle', 'image', 'badge', 'description', 'badge-color', 'badge-icon'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Title';
        const price = this.getAttribute('price') || '';
        const subtitle = this.getAttribute('subtitle') || '';
        const image = this.getAttribute('image') || '';
        const badge = this.getAttribute('badge') || '';
        const badgeColor = this.getAttribute('badge-color') || 'tertiary';
        const badgeIcon = this.getAttribute('badge-icon') || '';
        const description = this.getAttribute('description') || '';

        this.className = "block max-w-sm"; // Host styling

        this.innerHTML = `
            <div class="bg-white rounded-2xl p-4 shadow-soft border border-[#eaf1f1] h-full flex flex-col">
                <div class="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100 group shrink-0">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style="background-image: url('${image}')"></div>
                    
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm text-primary cursor-pointer hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined text-xl block">volume_up</span>
                    </div>
                    
                    ${badge ? `
                    <div class="absolute bottom-3 left-3 flex gap-2">
                         <menu-badge color="${badgeColor}" icon="${badgeIcon}">${badge}</menu-badge>
                    </div>
                    ` : ''}
                </div>
                
                <div class="flex justify-between items-start mb-1">
                    <h4 class="font-display font-bold text-xl text-[#101818]">${title}</h4>
                    <span class="font-body font-semibold text-primary">${price}</span>
                </div>
                
                <p class="text-sm text-[#5c8a8a] italic mb-3">${subtitle}</p>
                
                <div class="bg-background-light p-3 rounded-lg border border-[#eaf1f1] mt-auto">
                    <div class="flex items-center gap-2 mb-1 text-primary">
                        <span class="material-symbols-outlined text-sm">auto_awesome</span>
                        <span class="text-xs font-bold uppercase tracking-wide">AI Insight</span>
                    </div>
                    <p class="text-sm text-[#101818] leading-snug">
                        ${description}
                    </p>
                </div>
            </div>
        `;
    }
}

customElements.define('menu-card', MenuCard);
