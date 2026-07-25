# OrbitOps — Case Study

## The problem

Customer operations teams in B2B SaaS products often need to combine account health, recurring revenue, renewal timing, support signals, and ownership information before they can decide where to act.

The goal was to design a focused workspace that makes risky accounts visible and supports the customer lifecycle without turning into a generic administration template.

## The solution

OrbitOps provides a single operations dashboard and customer workspace.

The dashboard gives teams an immediate view of active customers, MRR, account health, and risk. From there, users can investigate an account, understand the signals affecting its health score, and update its commercial or operational details.

The customer workspace supports search, filters, sorting, pagination, and shareable URL state. Create and edit flows use the same validated form, keeping behavior consistent and reducing duplication.

## Engineering approach

- Next.js App Router separates global infrastructure from the SaaS workspace layout.
- Material UI supplies a consistent, accessible design system with responsive variants.
- TanStack Query models API reads, caching, mutations, and invalidation.
- A typed mock service simulates network latency and server-side list operations.
- React Hook Form and Zod provide reusable, type-safe form validation.
- Storybook documents important component variants in isolation.
- Playwright verifies the two highest-value user journeys.

## Key decisions

### API-shaped mock layer

The UI never treats fixtures as its data source. It calls an asynchronous customer service with list, detail, create, and update operations. This makes the interface behave like a real SaaS application while keeping the project small.

### URL as customer-list state

Search, filters, sorting, and pagination are reflected in the URL. Views survive refreshes, work with browser navigation, and can be shared.

### Responsive behavior designed by task

The desktop customer table becomes a dedicated card list on mobile instead of forcing users through horizontal scrolling.

### Focused analytics

One MRR chart and one customer-health visualization communicate the product story without filling the interface with decorative charts.

## Result

The finished MVP includes four core screens, realistic async states, a reusable form workflow, component documentation, and automated end-to-end coverage. It demonstrates the frontend concerns that matter most in production SaaS work while remaining deliberately small and maintainable.
