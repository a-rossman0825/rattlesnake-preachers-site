# Rattlesnake Preachers site

A Brutalism/experimental UI styled static (SSG) band website for Rattlesnake Preachers built with Nuxt 3, Vue 3, Tailwind, and GSAP.

Designed by: [Anthony Rossman](https://anthonyjrossman.tech)
Built & maintained by: [Anthony Rossman](https://anthonyjrossman.tech), and [Graham Olsen]()

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

## Getting Started

1. **Clone down the repository and navigate to the project:**
```bash
cd rattlesnake-preachers-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**:
  - If you have run & debug extension installed, the launch.json file will allow you to start the server from that extension. if not:
```bash
npm run dev
```
The site will be available at 
`http://localhost:3000`

---

## Available Scripts

- EsLint: 
```bash 
npm run lint
```
- Prettier (formatter) on file save or format from dev tools.

---

## Project Structure
- `src/pages/` - Page components (routes)
- `src/components/` - Reusable Vue Components
- `src/assets/` - global scss variables & global scss stylesheet (fonts & colors predefined)
-  `src/composables/` - Vue composables for shared logic
- `public/` - Static assets (use this for any images/videos/media)

---

## Git Rules
Use `semantic` memoization convention for commits, for example:
- feat: Add Hero h1 text animation
- docs: Update readme
- fix: Kill footer hyperlink bug
- chore: Update dependencies
- style: Add global ".card" class
- refactor: Created "getGrahamsIP" composable for global reusability
- build: Try \#431 of Github Actions launch

---

## Theme Variables

- Header/Display font: "Anton SC", tailwind usage: 

```vue
<div class="font-display">RATTLESNAKE PREACHERS</div>
```

- Subheader/Body font: "Helvetica neue", tailwind usage:

```vue
<div class="font-body">FEAST YOUR EYES</div>
```

- Black & White theme colors, tailwind usage:

```vue
<div class="bg-dark text-light"></div>
```

---

## Merge Instructions

1. create new branch (not main!) (feature/hero, fix/navbar, etc.)
2. commit + push
3. open PR

## Tech Stack
- **Framework**: Nuxt 3
- **UI Framework**: Vue 3
- **Styling**: Tailwind CSS, SCSS, & GSAP
- **Language**: TypeScript


## Deployment
- Github pages static deployment (set for SSG)
- Personally registered domain, registered with Network Solutions (rattlesnakepreachers.com)

Happy Coding `GRAHAM`