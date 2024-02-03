# imjs

## Running a Dev Server

1. Run build+watch:web to keep static assets served up to state
2. Run start:server

## Technologies Used

### Bun

- Very fast
- Good DX due to speed, general compatibility with node projects
- Need to work around some incompatibilities, ie. hyper-express, ts-node related projects

### Rspack

- Bun builder, esbuild don't have adequate bundler support. Bun builder has thrown segfaults
- Good stand in for webpack while being much faster
- Doesn't support ts-patch compile time transformers (forcing typia, etc. to use separate compilation step for aot)

### Prisma

- ORM that abstracts over datalayer
- Integrates with Turso
- Questionable 3rd party integration (ie. passport.js), client generator makes it seemingly hard to work with 3rd parties

### Passport.js

- Stable
- Better documented than Auth.js
- No integration with passport

### Express

- Stable
- HyperExpress relies on Node APIs and doesn't work with Bun

### Fly.io

- Works with Docker containers
- Edge service for good SSR

### React

- Provides RSC
