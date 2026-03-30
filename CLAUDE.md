# MenuBridge Design System — Instructions for Claude Code

## What is this project?

A static design system for MenuBridge, a bilingual restaurant menu translation app. It runs on GitHub Pages with zero build tools — just HTML, Tailwind CSS (CDN), and vanilla JS Web Components.

## How to build a new example page

### Step 1: Tell Claude what you want

Use one of these approaches:

**From a screenshot or image:**
> "Create a new example page called `[page-name].html` based on this screenshot. Use the same page structure as `account-settings.html`."
> *(drag and drop or paste the image into the chat)*

**From a Figma link:**
> "Create a new example page called `[page-name].html` based on this Figma design: [paste Figma URL]"

**From a description:**
> "Create a new example page called `[page-name].html` that shows [describe what the page does]. It should have [describe the sections/content]."

**From an existing page as starting point:**
> "Create a new example page called `[page-name].html` using `edit-shared-menu.html` as a reference. Change it to show [describe differences]."

### Step 2: Remind Claude about the rules

Always include this line in your prompt:

> "Follow the existing page template pattern. Use DS components (`<menu-button>`, `<menu-toggle>`, etc.) — do not hand-code buttons or toggles. Match the browser chrome, backgrounds, and section structure of the other example pages."

### Step 3: Ask Claude to add it to the sidebar

> "Add the new page to the sidebar navigation in `layout.js` under the Examples section."

### Step 4: Ask Claude to update docs

> "Update `changelog.html` with a new version entry for this page."

---

## Key rules Claude must follow

These are the most important conventions. If Claude misses any, point it out:

1. **Always use DS components** — never hand-write HTML that a `<menu-*>` component already handles:
   - Buttons → `<menu-button variant="...">`
   - Toggles (EN/JP, Include/Hide, any binary choice) → `<menu-toggle items="A, B" selected="A">`
   - Dietary icons → `<menu-dietary>`
   - Inputs, checkboxes, selects, etc. → use the corresponding `<menu-*>` component

2. **Page structure must be consistent** across all example pages:
   - Outer shell background: `bg-[#F9FAFB]`
   - Content area background: `bg-white`
   - Browser chrome: URL bar style with `menubridge.app/[route]`
   - Page header: category label + h1 + subtitle
   - Sections: Preview → Anatomy → Code/Notes

3. **Import only the components you use** — add `<script src="../components/menu-*.js" defer>` for each component used on the page.

4. **After any change, audit ALL example pages** for consistency — not just the file being edited.

---

## Available components

View the full component library at: `design-system/components/index.html`

| Component | What it does | Example |
|---|---|---|
| `<menu-button>` | All buttons | `<menu-button variant="primary" icon="add">Create</menu-button>` |
| `<menu-toggle>` | Binary/multi toggle | `<menu-toggle items="EN, JP" selected="EN">` |
| `<menu-dietary>` | Dietary info icons | `<menu-dietary items='[{"icon":"eco","label":"Veg","state":"selected"}]'>` |
| `<menu-input>` | Text input | `<menu-input label="Name" placeholder="Enter name">` |
| `<menu-select>` | Dropdown | `<menu-select label="Type" options='[...]'>` |
| `<menu-checkbox>` | Checkbox | `<menu-checkbox label="Agree" checked>` |
| `<menu-switch>` | Toggle switch | `<menu-switch label="Active" checked>` |
| `<menu-modal>` | Dialog/modal | `<menu-modal title="Confirm" size="md">` |
| `<menu-alert>` | Alert/notification | `<menu-alert variant="warning" title="Note">` |
| `<menu-badge>` | Status badge | `<menu-badge color="secondary">Active</menu-badge>` |
| `<menu-card>` | Content card | `<menu-card title="Item" price="¥800">` |
| `<menu-tabs>` | Tab navigation | `<menu-tabs items="Tab1, Tab2" selected="Tab1">` |
| `<menu-toast>` | Toast notification | JS: `el.show('Saved!', 'success')` |
| `<menu-breadcrumb>` | Breadcrumbs | `<menu-breadcrumb items='[...]'>` |
| `<menu-avatar>` | User avatar | `<menu-avatar name="Ched" size="md">` |
| `<menu-pagination>` | Pagination | `<menu-pagination total="50" current="1">` |

### Button variants

| Variant | When to use |
|---|---|
| `primary` | Main action (Create, Translate, Continue) |
| `dark` | Confirm/save (Done, Save Changes) |
| `outline` | Secondary (Cancel, Preview) |
| `ghost` | Tertiary (Share, Copy Link) |
| `destructive` | Immediate delete (no modal) |
| `destructive-outline` | Delete with modal confirmation |
| `destructive-ghost` | Lighter delete with modal confirmation |

---

## Quick reference prompts

**Add a new page:**
> "Read `account-settings.html` as a reference. Create a new page `[name].html` in `design-system/examples/` that shows [description]. Use DS components, match the page structure, and add it to the sidebar."

**Fix inconsistencies:**
> "Audit all example pages for [specific thing]. Fix every instance across all files."

**Update from feedback:**
> "Here's feedback from Greg: [paste message]. Update the DS accordingly and ensure consistency across all pages."

**Deploy:**
> "Commit and push to main for GitHub Pages."
