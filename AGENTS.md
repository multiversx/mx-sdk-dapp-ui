# AGENTS.md

Working instructions for `@multiversx/sdk-dapp-ui`. See `README.md` for consumer-facing usage.

## Overview

A [Stencil](https://stenciljs.com/) web-component library rendering UI for MultiversX blockchain
dApps. Components display data and emit user events over an event bus, and hold **no business
logic** — logic lives in the consuming `@multiversx/sdk-dapp` package. Output is standard web
components, so the library works in React, Vue, Angular, Solid.js and Next.js.

## Setup

```bash
pnpm install
```

Node >= 20.19.0 (CI runs Node 24). `pnpm` is the package manager; `pnpm-lock.yaml` is committed.

E2E tests need a Chromium binary that is not installed by default:

```bash
npx puppeteer browsers install chrome-headless-shell
```

## Commands

```bash
pnpm build            # stencil --prod + assert:css + esm/cjs utils
pnpm build:dev        # fast dev build
pnpm start            # build:dev --watch --serve
pnpm lint             # eslint src
pnpm lint:fix         # eslint src --fix
pnpm test             # stencil test --spec --e2e
pnpm test.watch       # watch mode
pnpm assert:css       # post-build CSS assertions (see Tailwind pipeline)
pnpm generate         # scaffold a component
pnpm storybook-dev    # build + tailwind safelist + storybook on :6006
```

Single file, single test:

```bash
npx stencil test src/components/controlled/format-amount/tests/format-amount.spec.ts --spec
npx stencil test src/components/controlled/format-amount/tests/format-amount.spec.ts --spec -t 'renders correctly'
```

Use `--e2e` for `.e2e.ts` files; they run in a real browser via Puppeteer.

## Component categories

Components live under `src/components/` in three tiers. The tier dictates how a component is built
and consumed.

1. **`visual/`** — Pure presentation, controlled entirely by props, no external data.
   `mvx-copy-button`, `mvx-tooltip`, `mvx-explorer-link`, `mvx-trim`, `mvx-preloader`,
   `mvx-pagination`, `mvx-button`, `mvx-address-table`, `mvx-data-with-explorer-link`.
2. **`controlled/`** — Display data pre-processed by an `sdk-dapp` controller and passed via props.
   `mvx-format-amount`, `mvx-transactions-table`.
3. **`functional/`** — Complex stateful workflows (auth, signing, notifications).
   `mvx-unlock-panel`, `mvx-sign-transactions-panel`, `mvx-ledger-connect`, `mvx-wallet-connect`,
   `mvx-notifications-feed`, `mvx-toast-list`, `mvx-pending-transactions-panel`.

Shared presentational sub-components that are *not* custom elements (`SidePanel`, `Icon`, `Button`,
`Tooltip`, `Trim`, `ProviderIdleScreen`) live in `src/common/`. Icon custom elements live in
`src/assets/icons/`.

**Build detail:** every component in `functional/` is **excluded** from the React and Vue output
targets (`stencil.config.ts` → `getExcludedComponentTags('./src/components/functional')`). This is
deliberate — functional components rely on the event bus and imperative Stencil state, and
generating framework wrappers for them causes event-bus/state conflicts. They are consumed only as
raw web components, so a new functional component will have no React/Vue proxy.

## Event bus pattern (functional components)

Functional components do not take data as props. They expose an `@Method() getEventBus()` and
communicate with `sdk-dapp` over an `EventBus` instance (`src/utils/EventBus.ts`, a simple pub/sub).
The lifecycle (see `src/components/functional/unlock-panel/unlock-panel.tsx`):

- The component owns a private `new EventBus()` and a `ConnectionMonitor`
  (`src/utils/ConnectionMonitor.ts`).
- `getEventBus()` awaits `connectionMonitor.waitForConnection()` before returning the bus, so a
  consumer cannot publish before the component is ready.
- `componentDidLoad()` subscribes to events (defined in a `*.types.ts` enum) and pushes unsubscribe
  functions; `disconnectedCallback()` unsubscribes and resets `@State`.
- The component publishes events back (`LOGIN`, `CLOSE`, …) for the consumer to act on.

Every event bus action is mirrored to a devtools channel via `src/utils/devtools.ts`.

## Directory conventions

- **`src/common/`** — Shared, framework-agnostic functional (`h`-based) sub-components and helpers.
  Stencil class components under `src/components/` compose these. Not registered as custom elements.
- **`src/components/<tier>/<name>/`** — Typically `<name>.tsx`, `<name>.scss`, `<name>.styles.ts`
  (CSS-module-style class name map), `<name>.types.ts`, plus `components/`, `helpers/` and `tests/`
  subfolders and `<name>.stories.tsx`.
- **`src/utils/`** — Standalone utilities. A subset is published as separate CJS+ESM entry points.
- **`src/global/`** — `style.css`, `variables.css`, `tailwind*.css`, and `scripts/` (build-time
  helpers, including the Tailwind plugin).

## Tailwind pipeline

Every component stylesheet is compiled by `mvxTailwind()` (`src/global/scripts/tailwind-plugin.ts`),
registered in `stencil.config.ts` **after** `sass()` — postcss cannot parse SCSS. It prepends the
entry from `tailwind-entries.ts` and runs `@tailwindcss/postcss` with `base` set to the component's
own directory. There is no third-party Stencil/Tailwind plugin; the previous one
(`stencil-tailwind-plugin`) resolved a dependency from a mutable git ref and had silently stopped
emitting any CSS at all.

**Preflight is never emitted.** `src/global/tailwind.css` imports `theme.css` and `utilities.css`
separately rather than `tailwindcss` wholesale. What preflight provided is restored per component by
a scoped reset — `tailwind-reset-shadow.css` (`:host`) or `tailwind-reset-light-dom.css`
(`:where(<tag> …)`) — chosen by `tailwindEntryFor()`. Layer order
(`theme, base, mvx-reset, components, utilities`) is load-bearing: `mvx-reset` must sort before
`utilities`. `scope-properties-layer.ts` additionally scopes Tailwind's universal `@layer properties`
fallback for non-shadow components, which would otherwise set `--tw-*` on every element in the host
page.

**Scanning is scoped per component**, by `component-sources.ts`. Tailwind's automatic detection only
covers `base`, but class names also live in `*.styles.ts` maps and in shared `h`-based components
under `src/common/`. So each component additionally scans its transitive import closure, emitted as
`@source` directives. Scanning all of `src/` instead would make every component ship the union of
every utility in the library (25.5 KB vs 4.6 KB for `mvx-trim`).

**Class-forwarding components scan backwards too.** A shadow component with a `@Prop() class` that it
re-applies inside its own shadow root (`mvx-preloader`, `mvx-button`, `mvx-tooltip`, the provider
icons) needs its *consumer's* classes in its *own* stylesheet — a stylesheet cannot cross a shadow
boundary. `component-sources.ts` detects these and pulls in the closures of everything rendering the
tag. Without it, e.g. every `mvx-address-table` skeleton row silently falls back to `preloader.scss`'s
default `mvx:w-30 mvx:h-30` and renders as a 120px box.

Pitfalls:

- Pseudo-elements are invalid inside `:where()`; lightningcss collapses `:where(tag *::before)` to an
  empty `:where()` that matches nothing. Write them outside: `:where(tag *)::before`.
- `@apply` inlines declarations — it emits no `.mvx\:x` selector — so it is invisible to any check
  that greps output for utility class selectors.
- Tailwind scans source files as plain text, so a `mvx:` class name written inside a **comment** is
  compiled into shipped CSS. Keep example class names out of comments in `src/`.
- Stencil funnels a thrown style-plugin error into diagnostics it never prints. The plugin logs
  before rethrowing, so a Tailwind failure is visible rather than a silent no-op.
- `scripts/assert-no-preflight-leak.mjs` runs as part of `build` and asserts all of the above against
  `dist/web-components`. Run it only after a **prod** build; `stencil test` rewrites `dist/` in dev
  mode.

## Build outputs (two pipelines)

`pnpm build` runs two independent pipelines:

1. **Stencil** (`stencil build --prod`) emits three output targets: `dist/web-components/` (custom
   elements bundle), `dist/react/`, `dist/vue/`. `dist-custom-elements` is **not** emitted by
   `--dev` builds, so `dist/web-components/*.js` only exists after a prod build.
2. **Utils** (`build:esm:utils` + `build:cjs:utils`) compiles a hand-picked list of util files to
   dual ESM/CJS via `tsc` + `tsc-alias`. When adding a new publicly-consumable util, add it to
   **both** `tsconfig.utils.json` `include` and `package.json` `exports`.

## Code conventions

- All custom elements are prefixed **`mvx-`**; so are global CSS class names (`mvx-transaction-…`).
- Path aliases resolve from `src` (`baseUrl: "./src"`) — import `utils/EventBus`,
  `common/SidePanel/SidePanel`, `types/provider.types`, not relative paths.
- ESLint enforces `simple-import-sort` (imports and exports),
  `@typescript-eslint/consistent-type-imports` (use `import type`), and `curly: all`.
- `noUnusedLocals` / `noUnusedParameters` are on; JSX uses the Stencil `h` factory.
- User-facing strings are hardcoded in components (no i18n layer).
- Test selectors should target `data-testid` (`DataTestIdsEnum`) or `mvx-` prefixed class names.
  Non-prefixed class selectors in tests are stale.

## Storybook

Framework: **`@stencil/storybook-plugin`** (not `@storybook/html-vite`). Its `renderToCanvas` calls
Stencil's own `render(vdom, element)`, so stories build real DOM — non-primitive values are assigned
as DOM **properties** and `on*` handlers as listeners. Object, array and function props therefore
work directly; there is no JSON-in-a-`data-` attribute workaround any more.

`.storybook/preview.tsx` registers components from the prebuilt `dist/web-components` bundle via
`defineCustomElements()`, which is why `storybook-dev` runs a full `pnpm build` first and why source
edits need a rebuild + restart before they show up.

`.storybook/main.ts` does two things beyond naming the framework, both load-bearing:

- **It strips `unplugin-stencil`** from the Vite config. The framework preset injects it to compile
  components from source, which we do not need — and its `resolveId` hook rewrites *every* relative
  specifier in the graph, with no importer check, to a same-named file under `dist/web-components`
  when one exists. That silently hands `@vitest/mocker`'s `./index.js` our
  `dist/web-components/index.js` and fails the build.
- **It aliases every top-level `src/` directory.** `tsconfig.json` sets `baseUrl: ./src`, but Vite
  does not read `baseUrl`, so bare specifiers (`utils/EventBus`, `common/Icon`) need explicit
  aliases. Type-only imports are erased and never needed them; stories importing real values do.

Conventions (see `copy-button.stories.tsx` for the cleanest example): author in Stencil JSX with
`import { h } from '@stencil/core'`; type against the component class,
`Meta<T>` / `StoryObj<T>` from `@stencil/storybook-plugin`; set `component: 'mvx-<tag>'` (the string
form, since components are lazily registered); keep a `// prettier-ignore` `styles` map of
`mvx:`-prefixed utilities; `export default storySettings` last. Titles group as `Visual/`,
`Controlled/`, `Toasts/`, `Panels/`.

**Functional components** take no data props. Drive them from a `play` function with `publishTo`
(`src/components/functional/toasts-list/tests/mocks/eventBusHarness.ts`), which awaits
`getEventBus()` — itself gated on `ConnectionMonitor`, so it cannot race hydration. Shared fixtures
live in `tests/mocks/` folders; Stencil keeps `tests/` out of `dist/types`, so they are linted and
type-checked without shipping.

Two traps worth knowing:

- **A vNode cannot be passed as a prop from a story.** Stories bundle their own copy of the Stencil
  runtime while components carry the one baked into `dist/web-components`; a vNode built by one is
  rejected by the other with `Invalid vNode child`, rendering nothing. `mvx-tooltip`'s `trigger` is
  declared `HTMLElement` but really wants a vNode child — inside the library it is given JSX, while
  stories must pass a plain string. The same caution applies to
  `processedTransactionsStatus: string | JSX.Element`; use the string form in stories.
- **`mvx-transaction-toast-progress` remembers finished toast ids in module scope**, so reusing a
  `toastId` renders an already-complete bar on a second visit. Generate a fresh one per story
  (`uniqueToastId`). Its `startTime`/`endTime` are UNIX **seconds**, not milliseconds.

## Verifying a change

```bash
pnpm lint
pnpm build      # includes assert:css
pnpm test       # needs chrome-headless-shell for the e2e suites
```

For visual changes, `pnpm storybook-dev` and compare on :6006, in **both** themes (the background
toggle switches them). Storybook builds its own global
`.storybook/tailwind.css`, which reaches light-DOM components but **cannot cross a shadow boundary** —
shadow components depend entirely on their own emitted CSS. Storybook serves the built `dist/`, so
restart it after rebuilding.

## Changelog

Notable changes go under `## [Unreleased]` in `CHANGELOG.md`
([Keep a Changelog](https://keepachangelog.com/en/1.0.0/), semver).
