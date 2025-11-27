# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development


---

## Herbamed: Firmas, RPC y Builder (Guía rápida)

Este proyecto incluye soporte para construir, firmar y enviar transacciones Soroban desde el frontend.

Flujo resumido:
- `build` (unsigned XDR) → `sign` (Freighter o clave local) → `submit` al RPC.

Opciones de firma (prioritarias):
1. **Freighter**: extensión del navegador — recomendado para usuarios finales.
2. **Clave local**: `VITE_SOROBAN_SECRET_KEY` o clave importada en la UI (solo dev/tests).
3. **Builder service**: servicio que construye XDR en el backend y devuelve `xdr`.

Variables de entorno útiles (colocar en `frontend/vue-project/.env`):
```
VITE_CONTRACT_ADDRESS=...
VITE_SOROBAN_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_SOROBAN_SECRET_KEY=SA... (solo dev)
VITE_TX_BUILDER_URL=http://127.0.0.1:4001
```

Ficheros importantes:
- `src/soroban/client.js`: lógica de build/sign/submit y utilidades.
- `vite.config.js`: `manualChunks` divide `stellar-sdk` en un chunk separado para mejorar tiempos de carga.

Pruebas locales:
1. `npm run dev` y abrir `http://127.0.0.1:3000/`.
2. Para usar Freighter instala la extensión y conecta desde la UI.
3. Para pruebas automáticas configura `VITE_SOROBAN_SECRET_KEY`.

Seguridad:
- Nunca subas claves privadas a repositorios públicos.
- Freighter evita exponer la clave al sitio.

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
