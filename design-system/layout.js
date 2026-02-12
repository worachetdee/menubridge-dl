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
   const isInSubfolder = path.includes('/foundations/') || path.includes('/components/') || path.includes('/examples/') || path.includes('/ai-toolkit/');
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
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-0 px-2">
                    <button onclick="toggleSection('foundations')" class="flex items-center justify-between w-full text-xs font-bold text-[#5c8a8a] uppercase tracking-wider py-2 hover:text-[#3a6b6b] transition-colors cursor-pointer bg-transparent border-0" aria-expanded="true" aria-controls="nav-foundations">
                       <span>Foundations</span>
                       <span class="material-symbols-outlined text-base transition-transform duration-200" id="chevron-foundations" style="transform:rotate(90deg)">chevron_right</span>
                    </button>
                 </h3>
                 <div id="nav-foundations" class="flex flex-col space-y-1" style="transition:max-height 0.2s ease,opacity 0.15s ease;overflow:hidden">
                    <a href="${isInSubfolder ? '../foundations/logo.html' : './foundations/logo.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/logo.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Logo
                    </a>
                    <a href="${isInSubfolder ? '../foundations/colors.html' : './foundations/colors.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/colors.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Colors
                    </a>
                    <a href="${isInSubfolder ? '../foundations/typography.html' : './foundations/typography.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/typography.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Typography
                    </a>
                    <a href="${isInSubfolder ? '../foundations/spacing.html' : './foundations/spacing.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/spacing.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Spacing
                    </a>
                    <a href="${isInSubfolder ? '../foundations/iconography.html' : './foundations/iconography.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/iconography.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Iconography
                    </a>
                    <a href="${isInSubfolder ? '../foundations/elevation.html' : './foundations/elevation.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/elevation.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Elevation
                    </a>
                    <a href="${isInSubfolder ? '../foundations/grid.html' : './foundations/grid.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/grid.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Grid & Breakpoints
                    </a>
                    <a href="${isInSubfolder ? '../foundations/motion.html' : './foundations/motion.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/motion.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Motion
                    </a>
                 </div>
            </div>

            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-0 px-2">
                    <button onclick="toggleSection('library')" class="flex items-center justify-between w-full text-xs font-bold text-[#5c8a8a] uppercase tracking-wider py-2 hover:text-[#3a6b6b] transition-colors cursor-pointer bg-transparent border-0" aria-expanded="true" aria-controls="nav-library">
                       <span>Library</span>
                       <span class="material-symbols-outlined text-base transition-transform duration-200" id="chevron-library" style="transform:rotate(90deg)">chevron_right</span>
                    </button>
                 </h3>
                 <div id="nav-library" class="flex flex-col space-y-1" style="transition:max-height 0.2s ease,opacity 0.15s ease;overflow:hidden">
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
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-0 px-2">
                    <button onclick="toggleSection('examples')" class="flex items-center justify-between w-full text-xs font-bold text-[#5c8a8a] uppercase tracking-wider py-2 hover:text-[#3a6b6b] transition-colors cursor-pointer bg-transparent border-0" aria-expanded="true" aria-controls="nav-examples">
                       <span>Examples</span>
                       <span class="material-symbols-outlined text-base transition-transform duration-200" id="chevron-examples" style="transform:rotate(90deg)">chevron_right</span>
                    </button>
                 </h3>
                 <div id="nav-examples" class="flex flex-col space-y-1" style="transition:max-height 0.2s ease,opacity 0.15s ease;overflow:hidden">
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
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-0 px-2">
                    <button onclick="toggleSection('ai-toolkit')" class="flex items-center justify-between w-full text-xs font-bold text-[#5c8a8a] uppercase tracking-wider py-2 hover:text-[#3a6b6b] transition-colors cursor-pointer bg-transparent border-0" aria-expanded="true" aria-controls="nav-ai-toolkit">
                       <span>AI Toolkit</span>
                       <span class="material-symbols-outlined text-base transition-transform duration-200" id="chevron-ai-toolkit" style="transform:rotate(90deg)">chevron_right</span>
                    </button>
                 </h3>
                 <div id="nav-ai-toolkit" class="flex flex-col space-y-1" style="transition:max-height 0.2s ease,opacity 0.15s ease;overflow:hidden">
                    <a href="${isInSubfolder ? '../ai-toolkit/prompts.html' : './ai-toolkit/prompts.html'}"
                       class="block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${path.endsWith('/prompts.html') ? 'bg-primary/10 text-primary' : 'text-[#101818]/70 hover:text-[#101818] hover:bg-black/5'}">
                       Prompt Library
                    </a>
                 </div>
            </div>

            <!-- Section -->
            <div>
                 <h3 class="text-xs font-bold text-[#5c8a8a] uppercase tracking-wider mb-0 px-2">
                    <button onclick="toggleSection('resources')" class="flex items-center justify-between w-full text-xs font-bold text-[#5c8a8a] uppercase tracking-wider py-2 hover:text-[#3a6b6b] transition-colors cursor-pointer bg-transparent border-0" aria-expanded="true" aria-controls="nav-resources">
                       <span>Resources</span>
                       <span class="material-symbols-outlined text-base transition-transform duration-200" id="chevron-resources" style="transform:rotate(90deg)">chevron_right</span>
                    </button>
                 </h3>
                 <div id="nav-resources" class="flex flex-col space-y-1" style="transition:max-height 0.2s ease,opacity 0.15s ease;overflow:hidden">
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
             <a href="${isInSubfolder ? '../foundations/spacing.html' : './foundations/spacing.html'}" class="text-sm font-medium text-[#101818]">Spacing</a>
             <a href="${isInSubfolder ? '../foundations/iconography.html' : './foundations/iconography.html'}" class="text-sm font-medium text-[#101818]">Iconography</a>
             <a href="${isInSubfolder ? '../components/index.html' : './components/index.html'}" class="text-sm font-medium text-[#101818]">Components</a>
        </nav>
    `;

   // Remove old header if exists
   const oldHeader = document.querySelector('header');
   if (oldHeader) oldHeader.remove();

   // Remove footer if exists (since we moved copyright to sidebar)
   const footer = document.querySelector('footer');
   if (footer) footer.remove();

   initSidebarCollapse();
}

function toggleSection(id) {
   const container = document.getElementById('nav-' + id);
   const chevron = document.getElementById('chevron-' + id);
   const button = chevron?.closest('button');
   if (!container || !chevron) return;

   const isExpanded = container.style.maxHeight !== '0px';

   if (isExpanded) {
      // First set a fixed height so transition can animate from it
      container.style.maxHeight = container.scrollHeight + 'px';
      // Force reflow so the browser registers the starting value
      container.offsetHeight;
      container.style.maxHeight = '0px';
      container.style.opacity = '0';
      chevron.style.transform = 'rotate(0deg)';
      if (button) button.setAttribute('aria-expanded', 'false');
   } else {
      container.style.maxHeight = container.scrollHeight + 'px';
      container.style.opacity = '1';
      chevron.style.transform = 'rotate(90deg)';
      if (button) button.setAttribute('aria-expanded', 'true');
      // After transition ends, switch to max-height:none so content is never clipped
      container.addEventListener('transitionend', function handler(e) {
         if (e.propertyName === 'max-height' && container.style.opacity === '1') {
            container.style.maxHeight = 'none';
         }
         container.removeEventListener('transitionend', handler);
      });
   }

   // Persist state to localStorage
   try {
      const stored = JSON.parse(localStorage.getItem('mb-sidebar-state') || '{}');
      stored[id] = !isExpanded;
      localStorage.setItem('mb-sidebar-state', JSON.stringify(stored));
   } catch (e) { /* ignore storage errors */ }
}

function initSidebarCollapse() {
   const sectionIds = ['foundations', 'library', 'examples', 'ai-toolkit', 'resources'];

   // Determine which section has the active link
   let activeSection = null;
   sectionIds.forEach(function(id) {
      const container = document.getElementById('nav-' + id);
      if (container && container.querySelector('a.bg-primary\\/10')) {
         activeSection = id;
      }
   });

   // Read persisted state
   let savedState = {};
   try {
      savedState = JSON.parse(localStorage.getItem('mb-sidebar-state') || '{}');
   } catch (e) { /* ignore */ }

   sectionIds.forEach(function(id) {
      const container = document.getElementById('nav-' + id);
      const chevron = document.getElementById('chevron-' + id);
      const button = chevron?.closest('button');
      if (!container || !chevron) return;

      // Active section always open; others use saved state (default collapsed)
      const shouldExpand = (id === activeSection) || (savedState[id] === true);

      if (shouldExpand) {
         // On page load, use max-height:none directly — no animation needed, avoids scrollHeight timing issues
         container.style.maxHeight = 'none';
         container.style.opacity = '1';
         chevron.style.transform = 'rotate(90deg)';
         if (button) button.setAttribute('aria-expanded', 'true');
      } else {
         container.style.maxHeight = '0px';
         container.style.opacity = '0';
         chevron.style.transform = 'rotate(0deg)';
         if (button) button.setAttribute('aria-expanded', 'false');
      }
   });

   // Force active section into saved state as open
   if (activeSection) {
      try {
         const stored = JSON.parse(localStorage.getItem('mb-sidebar-state') || '{}');
         stored[activeSection] = true;
         localStorage.setItem('mb-sidebar-state', JSON.stringify(stored));
      } catch (e) { /* ignore */ }
   }
}
