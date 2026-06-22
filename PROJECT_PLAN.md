# Portfolio Project Documentation & Implementation Plan

## 1. Project Overview

`portfolio` is a modern personal portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion. It is designed to showcase a DevOps/Cloud Engineering portfolio through an interactive landing page with animated sections, project showcases, infrastructure examples, and engagement features.

Key features:
- Hero landing experience with scroll-driven canvas animation
- Sticky navigation and mobile-responsive menu
- Personal summary, skills, certifications, education, and experience
- Project showcase cards with tags and tech descriptions
- Infrastructure-as-Code examples for Terraform, Ansible, and Docker Compose
- Cloud architecture visual diagram
- Interactive DevOps quiz and terminal simulator
- Contact form with `mailto:` integration
- Custom animated cursor and responsive visual design

## 2. Tech Stack

Primary stack:
- Next.js 16.2.1
- React 19.2.4
- TypeScript 5
- Tailwind CSS v4 with `@tailwindcss/postcss`
- Framer Motion for animations
- Lucide React icons

Developer tools:
- ESLint
- `eslint-config-next`
- Node.js/npm compatible environment

## 3. Architecture & App Structure

Top-level runtime files:
- `src/app/layout.tsx`: global HTML shell, font import, metadata, root structure
- `src/app/page.tsx`: main homepage composition and component ordering
- `src/app/globals.css`: global styling and custom glassmorphism utility

Component structure:
- `src/components/Header.tsx`: fixed header, nav links, developer social links, resume download button, and mobile menu
- `src/components/ScrollyCanvas.tsx`: sticky scroll-driven canvas frame renderer for the hero section
- `src/components/Overlay.tsx`: hero overlay text and scroll animation content
- `src/components/About.tsx`: biography, contact details, skill categories, certifications, education, and work experience
- `src/components/Projects.tsx`: project grid and pipeline visualizer component
- `src/components/PipelineVisualizer.tsx`: simulated automation pipeline progress indicator
- `src/components/IacShowcase.tsx`: interactive IaC code example selector and code preview
- `src/components/CloudArchitectureDiagram.tsx`: infrastructure diagram section with AWS topology visuals
- `src/components/GithubActivityWidget.tsx`: GitHub activity widget (not yet reviewed in detail, but referenced in page)
- `src/components/DevOpsQuiz.tsx`: interactive quiz with scoring and feedback
- `src/components/DevOpsTerminal.tsx`: simulated terminal UI with command parsing and deployment animation
- `src/components/Contact.tsx`: contact form and social contact cards
- `src/components/Footer.tsx`: footer with links and back-to-top control
- `src/components/CustomCursor.tsx`: animated cursor overlay for desktop users
- `src/components/K8sDashboard.tsx`: Kubernetes-style dashboard display in the About section

Public assets:
- `public/sequence/`: image frames used by the scroll-driven canvas animation in `ScrollyCanvas`

## 4. Component Responsibilities

### `Header`
- Navigation to sections: Home, About, Projects, IaC, Architecture, Contact
- Social links: GitHub, LinkedIn, resume download
- Mobile menu toggle and anchor scrolling

### `ScrollyCanvas`
- Preloads 120 PNG frames from `/sequence`
- Uses `requestAnimationFrame` to draw the current frame based on `useScroll()` progress
- Creates immersive hero motion background behind overlay text

### `Overlay`
- Displays animated hero messaging and the page title
- Uses `framer-motion` transforms based on scroll progress

### `About`
- Personal introduction and contact summary
- Skill category grid with visual tags
- Certifications list with external links
- Experience and education timeline layout
- Includes embedded `K8sDashboard`

### `Projects`
- Lists portfolio projects with categories, descriptions, and tags
- Displays `PipelineVisualizer` animation above project cards
- Projects are hard-coded in component state

### `PipelineVisualizer`
- Simulates CI/CD pipeline stages and state transitions
- Animates stage nodes and success states
- Trigger button restarts the simulation

### `IacShowcase`
- Provides UI to switch between Terraform, Ansible, Docker Compose examples
- Displays code snippets in a stylized terminal-like card
- Demonstrates infrastructure automation expertise

### `CloudArchitectureDiagram`
- Visualizes a sample AWS architecture using UI shapes and icon labels
- Includes VPC, public/private subnets, ALB, NAT gateway, app servers, RDS, bastion host

### `DevOpsQuiz`
- Multiple-choice quiz UI with score tracking
- Immediate answer feedback and final result summary

### `DevOpsTerminal`
- Terminal simulation with custom commands: `help`, `about`, `skills`, `projects`, `theme`, `deploy`, `clear`
- Simulates deployment logs and audio feedback
- Keeps session history in state and supports light command validation

### `Contact`
- Form for name, email, and message
- Generates a `mailto:` URL on submit
- Shows contact details and social links

### `Footer`
- Copyright statement, social links, and back-to-top button

## 5. Setup & Run Instructions

1. Install Node.js and npm.
2. From the repository root, run:
   - `npm install`
3. Start the dev server:
   - `npm run dev`
4. Open `http://localhost:3000`

Build for production:
- `npm run build`
- `npm run start`

Linting:
- `npm run lint`

## 6. Implementation Plan (A to Z)

This plan describes implementation, verification, and deployment steps from project initialization through production readiness.

### Phase A — Discovery & Planning

1. Review repository files and verify the installed Next.js and dependency versions.
2. Map page sections to component files.
3. Confirm asset requirements (e.g. `/public/sequence` animation frames).
4. Define the target deployment environment: Vercel, Netlify, or static hosting.

### Phase B — Local Environment Setup

1. Ensure Node.js is installed.
2. Run `npm install`.
3. Confirm the app boots with `npm run dev`.
4. Validate that `src/app/page.tsx` and `src/app/layout.tsx` render correctly.

### Phase C — UI Verification & Content Review

1. Check each primary section in the browser:
   - Hero section and scroll animation
   - About
   - Projects
   - IaC Showcase
   - Cloud Architecture Diagram
   - DevOps Quiz
   - DevOps Terminal
   - Contact & Footer
2. Confirm mobile responsiveness for header navigation, project cards, and forms.
3. Verify the image preload behavior and canvas rendering in `ScrollyCanvas`.
4. Confirm `mailto:` contact action works reliably.

### Phase D — Code Quality & Best Practices

1. Run ESLint and fix any reported issues.
2. Review TypeScript types in components using `useState`, event handlers, and props.
3. Ensure all external links use `target="_blank" rel="noreferrer"`.
4. Validate accessibility basics: heading order, button labels, form control labels, contrast.

### Phase E — Feature Completion & Refinement

1. Confirm `Header` navigation anchors exactly match IDs in sections.
2. Verify `PipelineVisualizer` state transitions and manual rerun behavior.
3. Check `DevOpsTerminal` command parsing, sound settings, and simulated deployment flow.
4. Ensure `IacShowcase` code tabs and syntax content are displayed correctly.
5. Validate `CustomCursor` gracefully disables on touch devices.

### Phase F — Testing

1. Manual browser testing across Chrome, Firefox, and Edge.
2. Mobile/responsive testing in desktop device emulation.
3. Validate keyboard navigation and tab order through interactive elements.
4. Test the contact form workflow and external social links.
5. If available, add basic Jest/React Testing Library coverage for critical components.

### Phase G — Build & Production Verification

1. Run `npm run build` and confirm the site compiles successfully.
2. Open the production build preview and verify no runtime errors.
3. Confirm CSS and animations render correctly in the built site.

### Phase H — Deployment

1. Deploy to Vercel or chosen hosting provider.
2. Configure environment if needed for public assets.
3. Confirm the deployed site URL loads successfully.
4. Test the deployed site on multiple devices and browsers.

### Phase I — Maintenance & Enhancements

1. Add new portfolio projects to `src/components/Projects.tsx`.
2. Replace placeholder GitHub URLs and demos with live links.
3. Add a backend contact API if desired for persistent inquiries.
4. Add analytics or visitor tracking as needed.
5. Keep dependencies current and upgrade Next.js, React, and Tailwind when appropriate.

## 7. Project Files & Roles

Important files:
- `package.json`: dependency and npm script definitions
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: linting rules
- `public/sequence`: hero canvas frames
- `src/app/page.tsx`: homepage component tree
- `src/app/layout.tsx`: root layout and metadata

Primary implementation files:
- `src/components/*.tsx`
- `src/app/globals.css`

## 8. Recommended Enhancements

Future upgrades and improvements:
- Add backend form handling or serverless API for contact form submissions
- Add dark/light theme toggling across the site
- Add dynamic project data from JSON or CMS instead of hard-coded arrays
- Improve performance by optimizing canvas asset loading and lazy-loading large images
- Add real GitHub activity data via GitHub API in `GithubActivityWidget`
- Add unit tests and end-to-end tests for interactive features

## 9. Delivery Checklist

- [ ] Project runs locally with `npm run dev`
- [ ] App builds successfully with `npm run build`
- [ ] Navigation and anchors work correctly
- [ ] Hero scroll animation renders
- [ ] All sections display expected content
- [ ] Contact `mailto:` form works
- [ ] Mobile layout is responsive
- [ ] No console errors in production build
- [ ] Deployment URL is accessible

## 10. How to Use This Plan

Use this document as the single source of truth for onboarding, development, QA, and deployment. Follow the phases sequentially from environment setup through deployment, then use the maintenance section for ongoing improvements.
