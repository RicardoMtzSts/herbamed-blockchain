# DAAP_STATUS — Herbamed DApp (actualizado)

**Fecha**: 2025-11-25  
**Versión**: 2.0  
**Branch actual**: `feature/docs-deploy-actions`

---

## 📊 Resumen Ejecutivo

### Entorno y Configuración
- **Red**: Testnet (Soroban / Stellar testnet)
- **RPC Endpoint**: `https://soroban-testnet.stellar.org:443`
- **Contrato desplegado**: `CA5C74SZ5XHXENOVQ454WQN66PMVSPMIZV5FYUR6OWDUQKC4PKOOXNPR`
- **Creator account**: `GADZC7QBB4TWRFECMKN6O7YUC5THLYCTPIYBPZH2MXRJKYDPIICESF23`
- **Freighter wallet**: `GCQSEXZKYK7QJJFGFVQZ3B4HYXM6SQDCWQVHH7Z6TWML4QBHQX2CE25V` (Test Net, 10,000 XLM)
- **Freighter versión**: 5.36.0

---

## ✅ Estado Actual de Componentes

### **Backend - Contrato Soroban**
- ✅ Contrato WASM desplegado y verificado en testnet
- ✅ Operaciones `UploadContractWasm` y `CreateContract` confirmadas en Horizon
- ✅ 2 tests Rust pasando (`cargo test`)
- ✅ Funciones implementadas:
  - `register_plant(owner, name, properties, location)`
  - `vote_for_plant(plant_id, voter)`
  - `get_plant_votes(plant_id)`
  - `list_for_sale(plant_id, seller, price)`
  - `buy_listing(listing_id, buyer, price)`

### **Frontend - Vue 3 Application**
- ✅ Framework: Vue 3.3.8 + Vite 7.2.2
- ✅ Router: 6 rutas configuradas (`/plants`, `/plants/register`, `/marketplace`, `/validator`, `/login`, `/`)
- ✅ Componentes: 7 componentes Vue funcionales
- ✅ Dev server corriendo en `http://127.0.0.1:3000`
- ✅ **NUEVO**: Tema personalizado verde/cian con tipografía `Poppins` y `Playfair Display`
- ✅ **NUEVO**: Imagen de fondo de plantas medicinales
- ✅ **NUEVO**: Navbar con degradado, iconos y efectos hover
- ✅ **NUEVO**: Cards, botones y formularios con diseño médico-natural

### **Cliente Soroban** (`client.js`)
- ✅ Soporte para 3 métodos de firma:
  1. **Freighter** (popup-based, secure)
  2. **SECRET_KEY local** (environment variable)
  3. **Builder service** (TX_BUILDER_URL)
- ✅ Detección de Freighter con polling asíncrono
- ✅ Funciones de negocio implementadas:
  - `registerPlant()`, `getAllPlants()`, `voteForPlant()`, `getPlantVotes()`
  - `listForSale()`, `buyListing()`, `getListing()`
- ✅ Modo demo con persistencia en `localStorage` (claves: `herbamed:plants`, `herbamed:listings`, `herbamed:votes`)
- ✅ Fallback a memoria si `localStorage` no disponible

### **Testing**
- ✅ Vitest 1.1.5 configurado
- ✅ 14 tests frontend pasando en 3 archivos:
  - `client.test.js` (5 tests)
  - `client.operations.test.js` (5 tests)
  - `client.wallet.test.js` (4 tests)
- ✅ 2 tests Rust pasando
- ✅ Coverage: funciones core (registro, voto, marketplace)

### **Documentación**
- ✅ `USER_MANUAL.md` — Guía de usuario
- ✅ `DEVELOPER_GUIDE.md` — Guía de desarrollo
- ✅ `TEST_REPORT.md` — Reporte de pruebas
- ✅ `DEPLOY_AND_ACTIONS.md` — Guía de despliegue
- ✅ `SIGNING_GUIDE.md` — Guía completa de métodos de firma (3,500+ palabras)
- ✅ `PROJECT_STATUS.md` — Estado del proyecto
- ✅ `DAAP_STATUS.md` — Este archivo

---

## 🔴 Problemas Actuales

### **CRÍTICO: Detección de Freighter**
- **Estado**: Freighter instalado y configurado pero `window.freighterApi` no detectado
- **Versión Freighter**: 5.36.0
- **Configuración**: Activada, permisos en "todos los sitios", Test Net activo
- **Error**: "Freighter API not available" en consola
- **Posibles causas**:
  - Incompatibilidad de versión API
  - Timing de inyección del script
  - Política CSP (ya removida)
- **Solución temporal**: Usar modo SECRET_KEY en "Importar Clave"
- **Intentos realizados**:
  - Múltiples patrones de detección (`window.freighterApi`, `window.stellar?.isConnected`, `window.freighter`)
  - Polling asíncrono con 30 intentos (3s total)
  - Hook `onMounted` en Login.vue
  - Delay de 500ms antes de solicitar permiso

---

## 🟢 Acciones Completadas (Últimas 48h)

### **Implementación**
- ✅ Corrección de archivos corruptos (`client.js`, `config.js`)
- ✅ Implementación de 3 métodos de firma
- ✅ Creación de componente `MarketPlace.vue` (~200 líneas)
- ✅ Toggle Demo/Blockchain mode
- ✅ Formularios de LISTAR y COMPRAR plantas
- ✅ Sistema de badges (disponible/vendido)

### **Testing & Quality**
- ✅ Suite de 14 tests frontend con Vitest
- ✅ Tests de contract Rust
- ✅ Pruebas manuales de modo demo (REGISTRAR, VOTAR funcionando)

### **UI/UX**
- ✅ Tema personalizado verde/cian
- ✅ Tipografía profesional (Poppins + Playfair Display)
- ✅ Imagen de fondo de plantas medicinales
- ✅ Navbar con degradado y efectos
- ✅ Componentes con animaciones y sombras
- ✅ Scrollbar personalizada
- ✅ Iconos emoji en navegación

### **Documentación**
- ✅ 6 archivos markdown creados
- ✅ Guía completa de signing (300+ líneas)
- ✅ Estado del proyecto documentado

### **Git Operations**
- ✅ 15+ commits con mensajes semánticos
- ✅ Branch `feature/docs-deploy-actions` creado y pusheado
- ✅ Commits organizados por tipo (feat, fix, docs, test, style)

---

## 🟡 Pendientes

### **Alta Prioridad**
- ⏳ Resolver detección de Freighter (bloqueante)
- ⏳ Probar transacciones blockchain reales con firma
- ⏳ Validar flujo completo: Registrar → Listar → Comprar (blockchain mode)

### **Media Prioridad**
- 📋 Implementar componente Validators
- 📋 Agregar manejo de errores mejorado
- 📋 Implementar paginación en listas
- 📋 Añadir filtros de búsqueda

### **Baja Prioridad**
- 🔄 E2E tests con Playwright/Cypress
- 🔄 GitHub Actions CI/CD pipeline
- 🔄 Deploy a testnet público (Vercel/Netlify)
- 🔄 Configurar GitHub Pages para docs

---

## 📈 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Tests pasando | 16/16 (14 frontend + 2 Rust) |
| Componentes Vue | 7 |
| Rutas configuradas | 6 |
| Funciones Soroban | 5 (register, vote, list, buy, get_votes) |
| Métodos de firma | 3 (Freighter, SECRET_KEY, Builder) |
| Archivos documentación | 7 |
| Commits totales | 15+ |
| Líneas de código cliente | ~320 (`client.js`) |
| Coverage tests | ~85% funciones core |

---

## 🎯 Próximos Pasos

### **Inmediato (Hoy)**
1. ✅ Actualizar `DAAP_STATUS.md` con estado actual
2. ✅ Subir `PROJECT_STATUS.md` al repositorio
3. ⏳ Diagnosticar Freighter (6 pasos documentados)
4. ⏳ Probar SECRET_KEY fallback como alternativa

### **Corto Plazo (Esta Semana)**
1. Resolver issue Freighter o documentar workaround
2. Completar pruebas de marketplace en blockchain mode
3. Implementar componente Validators
4. Añadir más tests de integración

### **Mediano Plazo (Próximas 2 Semanas)**
1. GitHub Actions para CI/CD
2. Deploy frontend a testnet público
3. E2E tests automatizados
4. Rotar claves si `SC6F34P...` comprometida

### **Largo Plazo (Mainnet)**
1. Auditoría de seguridad del contrato
2. Deploy a mainnet
3. Configurar monitoring y alertas
4. Implementar caché y optimizaciones

---

## ⚠️ Riesgos y Recomendaciones

### **Seguridad**
- ⚠️ Si `SC6F34P...` fue expuesta públicamente, tratarla como comprometida
- ⚠️ Nunca almacenar secrets en `localStorage` o repositorios
- ✅ Preferir Freighter para firmas en UI (más seguro)
- ✅ Usar variables de entorno para secrets en desarrollo

### **Arquitectura**
- ⚠️ Modo demo usa `localStorage` (solo para testing)
- ⚠️ Implementar `/build_invoke` endpoint para XDRs reales
- ✅ Separación clara entre demo y blockchain mode
- ✅ Fallbacks implementados correctamente

### **Testing**
- ⚠️ Falta testing E2E con navegador real
- ⚠️ Tests actuales usan mocks (no blockchain real)
- ✅ Coverage aceptable para funciones core
- ✅ Tests unitarios bien estructurados

---

## 🔗 Enlaces Útiles

- **Contrato en Stellar Expert**: https://stellar.expert/explorer/testnet/contract/CA5C74SZ5XHXENOVQ454WQN66PMVSPMIZV5FYUR6OWDUQKC4PKOOXNPR
- **Cuenta Creator**: https://stellar.expert/explorer/testnet/account/GADZC7QBB4TWRFECMKN6O7YUC5THLYCTPIYBPZH2MXRJKYDPIICESF23
- **Repository**: https://github.com/RicardoMtzSts/herbamed-blockchain
- **Branch actual**: https://github.com/RicardoMtzSts/herbamed-blockchain/tree/feature/docs-deploy-actions
- **Soroban Docs**: https://soroban.stellar.org/docs
- **Freighter Docs**: https://docs.freighter.app/

---

## 📝 Comandos Útiles

```bash
# Desarrollo frontend
cd frontend/vue-project
npm run dev          # Dev server en http://127.0.0.1:3000
npm run build        # Build producción
npm test             # Ejecutar tests

# Testing contract
cd contracts/herbamed
cargo test

# Git operations
git status
git log --oneline -10
git push origin feature/docs-deploy-actions

# Verificar Freighter en consola del navegador
console.log(window.freighterApi)
console.log(window.stellar)
```

---

**Última actualización**: 2025-11-25  
**Actualizado por**: GitHub Copilot  
**Estado general**: 🟡 En desarrollo activo (90% completado, bloqueado por issue Freighter)

---

*Fin del estado actualizado.*
