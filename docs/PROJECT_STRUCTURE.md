# Gym Mobile Project Structure

This project uses Expo Router for routes and a feature-first structure for business logic.

## Boundaries

- `src/app/` contains route entry points and navigator layouts only.
- `src/modules/` contains business features, state, validation, and feature-specific UI.
- `src/components/` contains reusable presentation components with no business ownership.
- `src/services/` contains application-wide infrastructure such as API and storage clients.
- `src/providers/`, `src/stores/`, `src/types/`, `src/config/`, `src/constants/`, and `src/utils/` contain cross-feature concerns.
- `assets/` contains static fonts, icons, and images.

## Route plan

```text
src/app/
|-- _layout.tsx
|-- index.tsx
|-- (auth)/
|   |-- _layout.tsx
|   |-- login.tsx
|   |-- forgot-password.tsx
|   `-- change-password.tsx
|-- (tabs)/
|   |-- _layout.tsx
|   |-- dashboard.tsx
|   |-- members.tsx
|   |-- transactions.tsx
|   |-- reports.tsx
|   `-- more.tsx
|-- members/
|   |-- new.tsx
|   |-- [memberId].tsx
|   |-- [memberId]/edit.tsx
|   `-- [memberId]/renew.tsx
|-- packages/
|   |-- new.tsx
|   |-- [packageId].tsx
|   `-- [packageId]/edit.tsx
|-- visit-tariffs/
|   |-- new.tsx
|   |-- [tariffId].tsx
|   `-- [tariffId]/edit.tsx
|-- transactions/
|   |-- new.tsx
|   |-- success.tsx
|   `-- [transactionId].tsx
|-- reports/
|   `-- revenue.tsx
`-- more/
    |-- profile.tsx
    |-- notifications.tsx
    |-- users.tsx
    |-- roles.tsx
    `-- settings.tsx
```

Route files should stay thin: read route parameters, choose a layout, and render a screen exported by the owning module.

## Business modules

```text
src/modules/
|-- auth/
|-- dashboard/
|-- members/
|-- packages/
|-- visit-tariffs/
|-- transactions/
|-- reports/
|-- notifications/
|-- users/
`-- settings/
```

Each module may contain only the folders it needs:

```text
<module>/
|-- components/  # Feature-owned screens and UI
|-- hooks/       # Queries, mutations, and orchestration
|-- services/    # API/data access for the feature
|-- schemas/     # Form and payload validation
|-- types/       # Domain and transport types
|-- stores/      # Feature-local client state, when necessary
|-- constants/   # Feature-local constants, when necessary
`-- index.ts     # Public module API
```

Do not create every optional folder by default. Add `stores` and `constants` only when the feature has a concrete need.

## Domain ownership

- `members`: member profile, status, expiry, and renewal entry points.
- `packages`: membership package master data. It is presented under the Member tab but remains a separate business domain.
- `visit-tariffs`: walk-in tariff master data. It is not a membership package.
- `transactions`: membership purchases/renewals, walk-in visits, payment method, receipt, and transaction detail.
- `dashboard`: operational KPIs, revenue trend, expiring memberships, recent transactions, and quick actions.
- `reports`: period filters and aggregated revenue, transaction, membership, and walk-in reporting.
- `users`: Admin/Cashier accounts, roles, and permissions.
- `settings`: gym profile and operational notification preferences.

## Naming rules

- Route segments use kebab-case and dynamic IDs such as `[memberId].tsx`.
- React components and screen components use PascalCase.
- Hooks use `useXxx`.
- Service, schema, constant, and utility files use kebab-case.
- A feature imports shared infrastructure; shared infrastructure must not import a feature.
- Import another feature through its public `index.ts` API rather than its internal folders.

## Implementation order

1. Shared design tokens and UI primitives.
2. Root navigation, authentication, and role guards.
3. Dashboard and member/package/tariff master data.
4. Membership and walk-in transaction flows.
5. Reports, notifications, user management, and settings.

