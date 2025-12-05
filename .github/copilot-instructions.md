# Herbamed-Blockchain AI Agent Instructions

## Project Overview

**Herbamed** is a blockchain-based credit scoring and instant lending DApp for gig economy workers (Uber, Rappi, DiDi), combining **Stellar/Soroban smart contracts** with **WebAuthn passkey authentication** and **advanced credit scoring algorithms**.

### Architecture at a Glance
```
Frontend (Vue 3 + Vite) → Soroban Client (client.js) → Stellar RPC
         ↓
    LocalStorage (demo mode)
         ↓
Smart Contract (Rust/Soroban) ← Testnet (soroban-testnet.stellar.org)
```

**Key fact**: The project is in MVP phase with two parallel implementations:
1. **Herbamed (medicinal plants marketplace)** — original feature contracts
2. **EBAS Credit Scoring** — newer MVP focus (see `IMPLEMENTATION-STATUS.md`)

---

## Essential Files to Know

| Path | Purpose |
|------|---------|
| `frontend/vue-project/src/soroban/client.js` | Core wallet/signing logic; entrypoint for blockchain operations |
| `frontend/vue-project/src/soroban/config.js` | Environment config (RPC URL, contract address, network) |
| `contracts/medicinal-plants/src/lib.rs` | Main Soroban contract (register plant, vote, list, buy) |
| `DEVELOPER_GUIDE.md` | Complete signing/RPC workflow, 3 signing methods (Freighter, local, builder) |
| `IMPLEMENTATION-STATUS.md` | Current MVP progress (Days 0-3 completed, loan contract deployed) |
| `README-MVP.md` | EBAS credit scoring MVP requirements & architecture |

---

## Critical Workflows

### 1. Understanding Transaction Flow
**Location**: See `DEVELOPER_GUIDE.md` section "Diagrama de flujo de la transacción"

The typical flow is:
1. User action → build unsigned XDR
2. Freighter available? → send to Freighter for signing
3. No Freighter? → try local keypair signing
4. Still stuck? → builder service (fallback)
5. Submit signed XDR to RPC `/send_transaction` endpoint

**Code path**: `client.js` → `submitOperation()` → `submitTx()`

### 2. Environment Configuration  
Set these in `.env.local`:
```bash
VITE_CONTRACT_ADDRESS=CA5C74SZ5...  # Deployed contract
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_SOROBAN_NETWORK=testnet
VITE_SOROBAN_SECRET_KEY=SC...       # Only for local dev/testing
VITE_TX_BUILDER_URL=http://127.0.0.1:4001  # Optional builder service
```

### 3. Smart Contract Deployment
- **Contract binary**: `contracts/medicinal-plants/src/lib.rs`
- **Current address (testnet)**: `CA5C74SZ5XHXENOVQ454WQN66PMVSPMIZV5FYUR6OWDUQKC4PKOOXNPR`
- **Build**: `cargo build --target wasm32-unknown-unknown --release`
- **Test**: `cargo test` (2 tests in lib.rs)
- **Deploy**: Use Stellar CLI with admin keypair (documented in `DEVELOPER_GUIDE.md`)

### 4. Frontend Entry Points
- **Main router**: `src/router/index.js` (Vue Router setup, all routes defined)
- **Global store**: `src/store` (Vuex for app state like signing mode)
- **Key components**: Login, TestFunctions, PlantList, ValidatorDashboard
- **Package manager**: npm; build with Vite (fast bundling)

---

## Project-Specific Patterns

### LocalStorage as Persistent Mock Layer
Instead of always hitting the blockchain, the client uses `localStorage` for demo/testing:
- `herbamed:plants` — registered plants data
- `herbamed:listings` — marketplace listings
- `herbamed:votes` — vote counts

**Why**: Allows developing/testing without waiting for blockchain confirmation. Real contracts will eventually replace this.

**Code**: See `client.js` functions `_readJSON()` / `_writeJSON()` and the fallback in-memory store.

### Three Signing Methods (Not All Equally Implemented)
1. **Freighter (preferred)**: Browser extension, never exposes private key
2. **Local signing**: For testing; requires `VITE_SOROBAN_SECRET_KEY` env var (never commit!)
3. **Builder service** (experimental): Separate HTTP service at `VITE_TX_BUILDER_URL`

**Current status**: Freighter detection works; local signing tested; builder service partially implemented (`tx_builder_server.js`).

### Credit Scoring Algorithm (EBAS MVP)
Located in backend (not yet exposed in frontend):
- **Factors**: Income Stability (25%), Income Level (25%), Employment History (20%), Financial Behavior (20%), Platform Diversity (10%), Education Bonus (20%)
- **Score range**: 500–850 (FICO-like)
- **Min score for loan**: 700
- **Interest rate**: Dynamic 6–25% based on score & loan purpose
- **Max loan**: 50% of monthly income (capped at $2000)

See `IMPLEMENTATION-STATUS.md` (Day 3) and `MVP-CREDIT-SCORING-PLAN.md` for full algorithm.

---

## Common Dev Tasks

### Start Development
```bash
cd frontend/vue-project
npm install
npm run dev
# Opens http://127.0.0.1:3000
```

### Run Smart Contract Tests
```bash
cd contracts/medicinal-plants
cargo test
```

### Run Frontend Tests
```bash
cd frontend/vue-project
npm test  # Vitest
```

### Test Client Functions Headlessly (Node)
```bash
node frontend/vue-project/scripts/test_client_actions.mjs
```

### Start Builder Service (for /build_invoke, /build_tx endpoints)
```bash
node frontend/vue-project/scripts/tx_builder_server.js
# Listens on port 4001 by default
```

### Check Freighter Integration
Open browser console:
```javascript
console.log(window.freighterApi)  // Should exist if extension installed
```

---

## Known Issues & Workarounds

| Issue | Status | Workaround |
|-------|--------|-----------|
| Stellar CLI initialization auth | ⚠️ Pending | Use mock mode with contract ID for now |
| Freighter mock tests | 🔄 In Progress | Bypass with local secret key for testing |
| Bundle size (stellar-sdk) | ✅ Resolved | Vite manualChunks configured in vite.config.js |
| localStorage in Node environments | ⚠️ Partial | Code falls back to in-memory store |

---

## Testing Strategy

1. **Unit tests** (Vitest): `frontend/vue-project/src/soroban/__tests__/client.test.js` (14 tests, all passing)
2. **Contract tests** (Rust): `contracts/medicinal-plants/src/lib.rs` (2 tests, all passing)
3. **E2E headless**: `frontend/vue-project/scripts/e2e_test.js` (manual test flow with builder service)
4. **Manual browser**: Start dev server, use mock data in localStorage, test UI flows

**CI not yet configured**; tests run locally with `npm test` and `cargo test`.

---

## External Dependencies & Integrations

- **Stellar SDK** (`@stellar/stellar-sdk` v14.3.3): Transaction building, RPC communication
- **Freighter extension**: Runtime wallet integration (optional, graceful fallback if missing)
- **Soroban RPC**: `https://soroban-testnet.stellar.org` (testnet), hits `/send_transaction` and `/build_invoke` endpoints
- **WalletConnect** (`@walletconnect/sign-client`): Prepared but not yet active

---

## Before Making Changes

**Check these first:**
- [ ] Does your change affect RPC communication? Update `client.js` signing flow
- [ ] Adding new env variables? Update `config.js` AND `.env.example`
- [ ] Modifying smart contract? Run `cargo test` and update `DEVELOPER_GUIDE.md`
- [ ] New frontend route? Add to `src/router/index.js` and ensure navbar link exists
- [ ] Touching authentication? Review passkey flow in `PROFESSIONAL_FLOW_DESIGN.md` (Phases 1-4)

---

## Documentation Hierarchy

1. **README.md** — High-level overview, setup instructions
2. **DEVELOPER_GUIDE.md** — Detailed dev workflows, signing methods, troubleshooting
3. **IMPLEMENTATION-STATUS.md** — Current MVP progress, completed tasks, blockers
4. **PROFESSIONAL_FLOW_DESIGN.md** — Full user journey, UI/UX flows, authentication design
5. **README-MVP.md** — EBAS credit scoring MVP focus

*When unclear, check the hierarchy above in order.*

---

## Tips for Productivity

- **Fastest feedback loop**: Modify `client.js` function → test with `npm test` or manual localStorage queries in browser console
- **Contract development**: Use `#[cfg(test)]` for test-only code; compile frequently with `cargo check`
- **Signing issues**: Check browser console for Freighter API errors; fallback is always available
- **Large file editing**: Import only what you need from `@stellar/stellar-sdk` to avoid bundle bloat
- **Mock data**: When blocked on real blockchain, use localStorage stubs — they're intentional, not technical debt

---

**Last updated:** 2025-12-05  
**AI Agent Version:** 1.0
