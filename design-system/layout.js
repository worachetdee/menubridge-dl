// MenuBridge Design System - Shared Layout
document.addEventListener('DOMContentLoaded', () => {
   injectSidebar();
});

function injectSidebar() {
   // We target a specific sidebar container now, or fallback to inserting if not found (but HTML updates should be done first ideally)
   // However, to make it robust, we will look for 'header' to REMOVE it if it exists from old pages, 
   // and look for '#app-sidebar' to inject content.

   const sidebar = document.getElementById('app-sidebar');
   if (!sidebar) return;

   // determine current path to set active state and adjust relative links
   const path = window.location.pathname;
   const isInSubfolder = path.includes('/foundations/') || path.includes('/components/') || path.includes('/examples/');
   const prefix = isInSubfolder ? '..' : '.';

   // Check active states
   const isFoundations = path.includes('foundations');
   const isComponents = path.includes('components');

   sidebar.className = "w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#eaf1f1] bg-[#f9fbfb]/90 backdrop-blur-md lg:backdrop-blur-none lg:bg-[#f9fbfb] lg:fixed lg:inset-y-0 lg:left-0 p-6 flex flex-col gap-8 shrink-0 z-50 overflow-y-auto";

   // Add margin to main content to account for fixed sidebar
   const mainContent = document.querySelector('main');
   if (mainContent) {
      mainContent.classList.add('lg:ml-64');
      mainContent.classList.add('w-full'); // Ensure main takes full width
      // Remove flex-1 if it conflicts, but usually fine.
   }

   sidebar.innerHTML = `
        <div class="flex items-center justify-between lg:block">
            <a href="${prefix}/index.html" class="flex items-center gap-3 text-primary no-underline hover:opacity-80 transition-opacity mb-0 lg:mb-8">
                <span class="material-symbols-outlined text-3xl">restaurant_menu</span>
                <div>
                     <h2 class="font-display text-xl font-bold tracking-tight text-[#101818] leading-none">MenuBridge</h2>
                     <span class="text-primary text-xs uppercase tracking-wider font-bold opacity-70">Design System</span>
                </div>
            </a>
            
            <!-- Mobile Menu Toggle (Hidden for simplicity in this lightweight version, assuming vertically stacked) -->
        </div>

        <nav class="hidden lg:flex flex-col gap-6 flex-1">
            
            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-3 px-2">Foundations</h3>
                 <div class="flex flex-col space-y-1">
                    <a href="${isInSubfolder ? '../foundations/colors.html' : './foundations/colors.html'}" 
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/colors.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Colors
                    </a>
                    <a href="${isInSubfolder ? '../foundations/typography.html' : './foundations/typography.html'}" 
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/typography.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Typography
                    </a>
                 </div>
            </div>

            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-3 px-2">Library</h3>
                 <div class="flex flex-col space-y-1">
                    <a href="${isInSubfolder ? '../components/index.html' : './components/index.html'}" 
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${isComponents && !path.endsWith('/layout.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Components
                    </a>
                    <a href="${isInSubfolder ? '../components/layout.html' : './components/layout.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/layout.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Layout
                    </a>
                 </div>
            </div>

            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-3 px-2">Examples</h3>
                 <div class="flex flex-col space-y-1">
                    <a href="${isInSubfolder ? '../examples/login.html' : './examples/login.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/login.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Login Page
                    </a>
                    <a href="${isInSubfolder ? '../examples/create-menu.html' : './examples/create-menu.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/create-menu.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Create Menu
                    </a>
                    <a href="${isInSubfolder ? '../examples/review-menu.html' : './examples/review-menu.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/review-menu.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Review Menu
                    </a>
                    <a href="${isInSubfolder ? '../examples/review-enhanced.html' : './examples/review-enhanced.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/review-enhanced.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Review Enhanced
                    </a>
                    <a href="${isInSubfolder ? '../examples/preview-menu.html' : './examples/preview-menu.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/preview-menu.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Preview Menu
                    </a>
                    <a href="${isInSubfolder ? '../examples/published-menu.html' : './examples/published-menu.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/published-menu.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Published Menu
                    </a>
                 </div>
            </div>

            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-3 px-2">Resources</h3>
                 <div class="flex flex-col space-y-1">
                    <a href="${isInSubfolder ? '../changelog.html' : './changelog.html'}" 
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/changelog.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Changelog
                    </a>
                 </div>
            </div>

        </nav>

        <div class="hidden lg:block mt-auto pt-6 border-t border-[#eaf1f1]">
            <button class="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all mb-4">
                <span>Download Assets</span>
            </button>
            <p class="text-xs text-[#5c8a8a] text-center">© 2026 MenuBridge</p>
        </div>
        
        <!-- Mobile Nav Fallback (Simple horizontal for now if needed, or stick to stack) -->
        <nav class="flex lg:hidden gap-4 overflow-x-auto pb-2">
             <a href="${isInSubfolder ? '../foundations/colors.html' : './foundations/colors.html'}" class="text-sm font-medium text-[#101818]">Colors</a>
             <a href="${isInSubfolder ? '../foundations/typography.html' : './foundations/typography.html'}" class="text-sm font-medium text-[#101818]">Typography</a>
             <a href="${isInSubfolder ? '../components/index.html' : './components/index.html'}" class="text-sm font-medium text-[#101818]">Components</a>
        </nav>
    `;

   // Remove old header if exists
   const oldHeader = document.querySelector('header');
   if (oldHeader) oldHeader.remove();

   // Remove footer if exists (since we moved copyright to sidebar)
   const footer = document.querySelector('footer');
   if (footer) footer.remove();
}
