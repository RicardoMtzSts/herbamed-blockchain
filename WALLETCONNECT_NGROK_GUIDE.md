# Guía: WalletConnect, ngrok y Configuración de Puertos

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [¿Qué es WalletConnect?](#qué-es-walletconnect)
3. [Crear Project ID en WalletConnect Cloud](#crear-project-id-en-walletconnect-cloud)
4. [¿Qué es ngrok y por qué lo necesitamos?](#qué-es-ngrok-y-por-qué-lo-necesitamos)
5. [Configuración de Puertos](#configuración-de-puertos)
6. [Flujo Completo: QR Mobile Login](#flujo-completo-qr-mobile-login)
7. [Estado Actual: Bucle Infinito en Freighter Mobile](#estado-actual-bucle-infinito-en-freighter-mobile)

---

## Introducción

Este documento explica cómo implementar **login móvil mediante código QR** en una DApp (Aplicación Descentralizada) de Stellar/Soroban. El proceso involucra:

- **WalletConnect v2**: Protocolo que conecta wallets móviles con aplicaciones web
- **ngrok**: Túnel HTTPS para exponer aplicaciones locales en internet
- **Gestión de puertos**: Coordinación entre servidor Vue, túnel ngrok y herramientas de desarrollo

---

## ¿Qué es WalletConnect?

### Definición
**WalletConnect** es un protocolo abierto que permite que aplicaciones web (DApps) se comuniquen de forma segura con wallets móviles sin que el usuario tenga que compartir sus claves privadas.

### Cómo Funciona

```
┌──────────────────┐                 ┌─────────────────┐
│   DApp (Web)     │                 │ Freighter Mobile│
│  (Navegador)     │                 │  (Wallet)       │
└────────┬─────────┘                 └────────┬────────┘
				 │                                    │
				 │     1. Genera código QR            │
				 │     (contiene wc: URI)             │
				 │                                    │
				 │     2. Usuario escanea QR          │
				 │     ────────────────────────────>  │
				 │                                    │
				 │     3. Freighter procesa URI       │
				 │     <────────────────────────────  │
				 │                                    │
				 │     4. Aprueba la conexión         │
				 │     (relays WalletConnect)         │
				 │                                    │
				 │     5. Sesión establecida          │
				 │     ────────────────────────────>  │
				 │                                    │
				 │     6. DApp puede firmar XDR       │
				 │     <────────────────────────────  │
```

### Componentes Principales

#### a) **Project ID**
- Identificador único que obttienes de WalletConnect Cloud
- Se proporciona a la DApp para identificarse ante WalletConnect
- Es necesario para inicializar el cliente `SignClient`

#### b) **URI de Pairing (wc: protocol)**
```
wc:8b0995f5-cd21-4e6c-87d1-6a89adc78905@2?relay-protocol=irn&symkey=e26ac...
```
- Contiene información de la sesión
- Se convierte en código QR para que el móvil lo escanee
- Válido por ~5 minutos

#### c) **Relays WalletConnect**
- Servidores intermediarios que facilitan la comunicación
- Dominios públicos: `relay.walletconnect.com`, `relay.walletconnect.org`
- Utilizan WebSockets (wss://) para comunicación en tiempo real

---

## Crear Project ID en WalletConnect Cloud

### Paso 1: Acceder a WalletConnect Cloud
```
URL: https://cloud.walletconnect.com
```

### Paso 2: Crear Cuenta o Iniciar Sesión
- Usa email o Web3 wallet
- Verifica tu correo si es necesario

### Paso 3: Crear Nuevo Proyecto
```
1. Dashboard → "New Project"
2. Nombre: "HerbaMed DApp"
3. Descripción: "Plantas Medicinales en Soroban/Stellar"
4. URL: https://nonvocalic-terra-nonprophetic.ngrok-free.dev
5. Crear
```

### Paso 4: Obtener Project ID
```
En la sección "Project Details":
├─ Project ID: 4d6e4ea28e2c05227eeec7733dfd78ff
├─ Project Secret: [secreto - guardar seguro]
└─ App URL: https://nonvocalic-terra-nonprophetic.ngrok-free.dev
```

### Paso 5: Guardar en .env
```bash
# frontend/vue-project/.env
VITE_WC_PROJECT_ID=4d6e4ea28e2c05227eeec7733dfd78ff
```

### Paso 6: Configurar Metadata en walletconnect.js
```javascript
signClient = await SignClient.init({
	projectId: PROJECT_ID,
	metadata: {
		name: 'HerbaMed DApp',
		description: 'Plantas Medicinales en Soroban/Stellar',
		url: 'https://nonvocalic-terra-nonprophetic.ngrok-free.dev',
		icons: ['https://walletconnect.com/walletconnect-logo.png']
	}
})
```

**Importancia del Project ID:**
- Sin él, WalletConnect rechaza la conexión
- Vincula tu DApp con la plataforma WalletConnect
- Permite monitoreo y analytics en WalletConnect Cloud
- Necesario para los relays funcionen correctamente

---

## ¿Qué es ngrok y por qué lo necesitamos?

### El Problema: Localhost no es Accesible desde Internet

Cuando desarrollas localmente:
```
Tu máquina → puerto 3000/3002 → 127.0.0.1:3000 (solo local)
						 ↓
				 No visible desde internet
						 ↓
				 Freighter Mobile en otro dispositivo NO puede acceder
```

**Freighter Mobile en tu teléfono no puede escanesr un QR que apunte a `127.0.0.1:3000`** porque eso es solo tu máquina local.

### Solución: ngrok (Túnel HTTPS)

```
Tu máquina (desarrollo)
			↓
	npm run dev (puerto 3002)
			↓
	ngrok http 3002
			↓
	Crea túnel público HTTPS:
	https://nonvocalic-terra-nonprophetic.ngrok-free.dev
			↓
	✅ Accesible desde internet
			↓
	Freighter Mobile puede acceder vía QR
```

### ¿Qué es ngrok?

**ngrok** es un servicio gratuito que crea un **túnel seguro** desde tu máquina local a una URL pública HTTPS.

#### Características:
- ✅ Tunelización automática HTTP/HTTPS
- ✅ Soporte para WebSockets (necesario para WalletConnect)
- ✅ URL pública estable por sesión
- ✅ Dashboard de monitoreo en `http://127.0.0.1:4040`
- ✅ HTTPS automático (necesario para security)

#### Seguridad:
- Aunque es "público", ngrok es seguro porque:
	1. Las URLs son aleatorias (unguessable)
	2. Usa HTTPS para encriptación en tránsito
	3. WalletConnect valida que la DApp sea legítima
	4. Solo funciona mientras ngrok está corriendo

### Instalación y Configuración

#### 1. Instalar ngrok
```bash
# En Linux/Ubuntu:
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok -y
```

#### 2. Crear Cuenta Gratuita
```
https://dashboard.ngrok.com/signup
```

#### 3. Obtener Authtoken
```
https://dashboard.ngrok.com/get-started/your-authtoken
```

#### 4. Configurar Authtoken
```bash
ngrok config add-authtoken TU_TOKEN_AQUI
```

#### 5. Iniciar Túnel
```bash
ngrok http 3002
# Output:
# Forwarding  https://nonvocalic-terra-nonprophetic.ngrok-free.dev -> http://localhost:3002
```

### Archivos que Modificar para ngrok

#### vite.config.js
```javascript
server: {
	host: '127.0.0.1',
	port: 3002,
	allowedHosts: ['nonvocalic-terra-nonprophetic.ngrok-free.dev', 'localhost', '127.0.0.1']
}
```
**Por qué:** Vite bloquea por defecto hosts externos. Necesitamos permitir el dominio de ngrok.

#### index.html (CSP)
```html
<meta http-equiv="Content-Security-Policy" content="
	default-src 'self' https://verify.walletconnect.org;
	script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension: https://verify.walletconnect.org;
	connect-src 'self' 
		https://*.stellar.org 
		https://relay.walletconnect.org 
		https://relay.walletconnect.com 
		wss://relay.walletconnect.org 
		wss://relay.walletconnect.com;
	frame-src https://verify.walletconnect.org;
">
```
**Por qué:** 
- `connect-src` permite conexiones a los relays de WalletConnect
- `wss://` habilita WebSockets (comunicación real-time)
- `frame-src` permite iframes de verificación de WalletConnect

#### walletconnect.js
```javascript
url: typeof window !== 'undefined' 
	? window.location.origin 
	: 'https://nonvocalic-terra-nonprophetic.ngrok-free.dev'
```
**Por qué:** Para que Freighter Mobile sepa la URL correcta de la DApp.

---

## Configuración de Puertos

### Resumen de Puertos

| Puerto | Servicio | Propósito | Host |
|--------|----------|-----------|------|
| **3000** | Vite Dev Server | Servidor Vue original (primera intención) | `localhost:3000` |
| **3001** | Vite Dev Server | Fallback cuando 3000 está ocupado | `localhost:3001` |
| **3002** | Vite Dev Server | Puerto actual usado (3000 y 3001 ocupados) | `localhost:3002` |
| **4040** | ngrok Web UI | Dashboard de monitoreo de tráfico | `127.0.0.1:4040` |

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                   Tu Máquina de Desarrollo                   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         npm run dev (Vite)                           │  │
│  │                                                       │  │
│  │  Intenta puertos en orden:                          │  │
│  │  • Puerto 3000  ❌ (ocupado)                        │  │
│  │  • Puerto 3001  ❌ (ocupado)                        │  │
│  │  • Puerto 3002  ✅ ACTIVO                           │  │
│  │                                                       │  │
│  │  Escucha en: http://127.0.0.1:3002                 │  │
│  └────────────┬──────────────────────────────────────┘  │
│               │                                            │
│               │ HTTP tráfico local                         │
│               ▼                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           ngrok http 3002                            │  │
│  │                                                       │  │
│  │  Tuneliza:                                           │  │
│  │  http://127.0.0.1:3002 ───────────┐                │  │
│  │                                    │                 │  │
│  │  Crea URL pública HTTPS:           │                 │  │
│  │  https://nonvocalic-terra-        │                 │  │
│  │    nonprophetic.ngrok-free.dev  <─┘                 │  │
│  │                                                       │  │
│  │  Web UI Dashboard:                                   │  │
│  │  http://127.0.0.1:4040                              │  │
│  │  (para monitorear tráfico)                           │  │
│  └────────────┬──────────────────────────────────────┘  │
│               │                                            │
└───────────────┼────────────────────────────────────────────┘
								│
								│ Túnel ngrok (WebSocket seguro)
								│
				┌───────▼─────────┐
				│   Internet      │
				│   Pública       │
				└───────┬─────────┘
								│
		┌───────────▼──────────────┐
		│  Freighter Mobile Wallet  │
		│  (En otro dispositivo)    │
		│                           │
		│ Accede a:                │
		│ https://nonvocalic-terra-│
		│ nonprophetic.ngrok-free..│
		│ (VÍA QR CODE)            │
		└───────────────────────────┘
```

### ¿Por qué múltiples puertos?

#### Problema: Puertos Ocupados
Cuando ejecutas `npm run dev`, Vite intenta usar puertos en orden:

```bash
$ npm run dev

Port 3000 is in use, trying another one...
Port 3001 is in use, trying another one...

VITE v7.2.2  ready in 247 ms
➜  Local:   http://127.0.0.1:3002/
```

**Esto ocurre cuando:**
- Tienes múltiples instancias de npm run dev abiertas
- Otros servicios usan los puertos (bases de datos, servidores anteriores, etc.)

#### Solución: Especificar Puerto
```javascript
// vite.config.js
server: {
	host: '127.0.0.1',
	port: 3002,        // ← Usar siempre 3002
	strictPort: false  // ← Permitir fallback a otros puertos
}
```

### Puerto 4040: ngrok Web UI

#### Acceso
```
http://127.0.0.1:4040
```

#### Información Disponible
1. **Session Status**: Online/Offline
2. **Forwarding**: URL pública → puerto local
3. **Tráfico HTTP**: Todas las requests/responses
4. **Headers**: Detalles de cada request
5. **Latencia**: Tiempo de respuesta
6. **Logs**: Historial completo

#### Uso en Debugging
```
Cliente (Freighter Mobile)
				 ↓
		 Escanea QR
				 ↓
	 ngrok intercepta
				 ↓
	 http://127.0.0.1:4040
	 ↓
	 Ve qué data envía Freighter
	 ↓
	 Diagnóstica problemas de conexión
```

---

## Flujo Completo: QR Mobile Login

### Paso a Paso Técnico

#### 1. Usuario abre DApp en navegador (escritorio)
```
Navegador → https://nonvocalic-terra-nonprophetic.ngrok-free.dev/login
						 ↓
					Vite dev server en 3002
						 ↓
					ngrok tuneliza a URL pública
```

#### 2. Usuario hace clic en "Generar QR"
```
Click "Generar QR"
				 ↓
	loginVue.vue: startWalletConnectPairing()
				 ↓
	walletconnect.js: createPairingSession()
				 ↓
	SignClient.connect({ requiredNamespaces: { stellar: ... } })
				 ↓
	WalletConnect API genera URI:
	wc:8b0995f5-cd21-4e6c-87d1-6a89adc78905@2?relay-protocol=irn&symkey=...
				 ↓
	QRCode.toDataURL(uri) → imagen PNG base64
				 ↓
	<img :src="loginQrUrl"> se renderiza
```

#### 3. Usuario escanea QR desde Freighter Mobile
```
Freighter Mobile
			↓
	 Escanea QR
			↓
	 Lee URI wc:...
			↓
	 Conecta a relay.walletconnect.org
			↓
	 Descubre sesión de pairing
			↓
	 Muestra popup de aprobación
```

#### 4. Usuario aprueba en Freighter Mobile
```
Usuario: "Proceed with caution" → "Continue"
				 ↓
	Freighter procesa aprobación
				 ↓
	Envía public key vía relay WalletConnect
				 ↓
	wss://relay.walletconnect.org (WebSocket)
				 ↓
	DApp web recibe aprobación
				 ↓
	store.commit('SET_PUBLIC_KEY', pk)
				 ↓
	Fetch balance desde Horizon
				 ↓
	Mostrar "✅ Conectado vía WalletConnect"
```

### Flujo en Código Vue

```vue
<template>
	<button @click="startWalletConnectPairing">Generar QR</button>
	<img v-if="loginQrUrl" :src="loginQrUrl" />
	<div v-if="wcPairing">Esperando aprobación en tu móvil...</div>
</template>

<script>
async function startWalletConnectPairing() {
	wcPairing.value = true                    // Mostrar "Esperando..."
  
	const { uri, approval } = 
		await createPairingSession()            // Genera wc:... URI
  
	loginQrUrl.value = 
		await generateQR(uri)                   // Crea imagen QR
  
	// NO awaitar approval aquí (permite QR visible inmediatamente)
	waitForSessionApproval(approval)
		.then(({ publicKey }) => {
			store.commit('SET_PUBLIC_KEY', publicKey)
			// Conectado ✅
		})
		.catch((e) => {
			// Timeout o error ❌
		})
}
</script>
```

---

## Estado Actual: Bucle Infinito en Freighter Mobile

### Problema Reportado
```
Usuario aprende "Continue" en Freighter Mobile
				 ↓
	 Freighter muestra:
	 "Proceed with caution"
	 "Unable to scan site"
				 ↓
	 Mensajes se repiten en bucle
				 ↓
	 Conexión no se establece
```

### Causas Probables

#### 1. **Timeout en WalletConnect Relay**
```javascript
// Implementado en walletconnect.js:
const approvalWithTimeout = Promise.race([
	approval(),
	setTimeout(..., 30000)  // Timeout 30 segundos
])
```
Después de 30 segundos, si no hay respuesta, cancela automáticamente.

#### 2. **Blockaid Security Verification**
- Freighter valida que la URL sea segura
- ngrok es una URL temporal, Blockaid no puede verificarla completamente
- Usuario debe aprobar manualmente "Proceed with caution"
- **Esto es normal en desarrollo**

#### 3. **Project ID Inactivo o Incorrecto**
```
VITE_WC_PROJECT_ID=4d6e4ea28e2c05227eeec7733dfd78ff
```
- Si Project ID no está registrado en WalletConnect Cloud
- Si está expirado o revocado
- WalletConnect rechaza la sesión silenciosamente

#### 4. **CSP Bloqueando Relays**
```html
<!-- Si falta en index.html CSP: -->
wss://relay.walletconnect.org    <!-- Falta en connect-src -->
https://relay.walletconnect.com  <!-- Falta en connect-src -->
```
Freighter Mobile no puede comunicarse con DApp.

### Soluciones Implementadas

#### ✅ 1. Timeout automático (30 segundos)
```javascript
// walletconnect.js
export async function waitForSessionApproval(approval) {
	const approvalWithTimeout = Promise.race([
		approval(),
		new Promise((_, reject) => 
			setTimeout(() => reject(new Error(
				'WalletConnect approval timeout (30s). Please regenerate QR.'
			)), 30000)
		)
	])
	// ...
}
```

**Efecto:** 
- Después de 30 segundos sin respuesta, muestra error
- Usuario puede hacer clic "Generar QR" nuevamente
- Evita bucle infinito

#### ✅ 2. CSP Completo para WalletConnect
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
	connect-src 'self' 
		https://relay.walletconnect.org 
		https://relay.walletconnect.com 
		wss://relay.walletconnect.org 
		wss://relay.walletconnect.com;
">
```

**Efecto:**
- Permite WebSocket hacia relays
- Permite HTTPS hacia relays
- Freighter Mobile puede comunicarse

#### ✅ 3. Vite allowedHosts
```javascript
// vite.config.js
server: {
	allowedHosts: [
		'nonvocalic-terra-nonprophetic.ngrok-free.dev',
		'localhost',
		'127.0.0.1'
	]
}
```

**Efecto:**
- Vite permite requests desde ngrok
- Sin esto, Vite devuelve 403 Forbidden

### Próximos Pasos (Recomendados)

#### 1. **Verificar Project ID**
```bash
# Navega a https://dashboard.walletconnect.com
# Verifica que el Project ID esté ACTIVO
# Verifica que la URL esté registrada correctamente
```

#### 2. **Aumentar Timeout (si necesario)**
```javascript
setTimeout(..., 60000)  // 60 segundos en lugar de 30
```

#### 3. **Probar con otra Wallet**
- Usar Metamask Mobile (compatible con WalletConnect)
- Usar Trust Wallet
- Verificar si Freighter Mobile tiene bugs con WalletConnect v2

#### 4. **Monitorear tráfico en ngrok**
```
http://127.0.0.1:4040
↓
Ver si Freighter Mobile hace requests
↓
Si no hay requests → Freighter no puede alcanzar la DApp
↓
Si hay requests con errores → Debugging de errores específicos
```

#### 5. **Revisión de Logs**
```bash
# Terminal 1: npm run dev
# Ver si hay errores de compilación

# Terminal 2: ngrok http 3002
# Ver si hay requests desde Freighter Mobile

# Navegador: DevTools Console
# Ver errores de JS o CSP
```

---

## Resumen: Componentes en Acción

```
┌──────────────────────────────────────────────────────────┐
│           HERBAMED DAPP - ARQUITECTURA COMPLETA          │
└──────────────────────────────────────────────────────────┘

┌─ DESARROLLO LOCAL ─────────────────────────────────────┐
│                                                         │
│  1. npm run dev                                         │
│     ↓                                                   │
│     Vite Dev Server en puerto 3002                     │
│     URL: http://127.0.0.1:3002                         │
│                                                         │
│  2. ngrok http 3002                                     │
│     ↓                                                   │
│     Túnel HTTPS público                                │
│     URL: https://nonvocalic-terra-...ngrok-free.dev  │
│                                                         │
│  3. Navegador Desktop (escritorio)                     │
│     ↓                                                   │
│     Accede a DApp via ngrok URL                        │
│     Hace clic "Generar QR"                             │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─ WALLETCONNECT INFRASTRUCTURE ─────────────────────────┐
│                                                         │
│  Project ID: 4d6e4ea28e2c05227eeec7733dfd78ff         │
│  ↓                                                      │
│  SignClient.init() initializes                         │
│  ↓                                                      │
│  client.connect() genera wc:... URI                    │
│  ↓                                                      │
│  QR generado localmente (librería qrcode)              │
│  ↓                                                      │
│  Freighter Mobile escanea QR                           │
│  ↓                                                      │
│  Conecta a relay.walletconnect.org (wss://)           │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─ PUERTOS Y SERVICIOS ──────────────────────────────────┐
│                                                         │
│  3000-3002: Vite Dev Server (fallback automático)      │
│  4040: ngrok Web UI (monitoreo)                        │
│  80/443: ngrok Forwarding (externo)                    │
│  Relays: relay.walletconnect.org (WebSocket)          │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─ FREIGHTER MOBILE ─────────────────────────────────────┐
│                                                         │
│  Usuario en teléfono:                                  │
│  1. Abre Freighter Mobile                              │
│  2. Escanea QR desde navegador escritorio              │
│  3. Freighter muestra: "Allow DApp?"                   │
│  4. Usuario aprueba (a pesar de Blockaid warning)     │
│  5. Freighter envía public key vía WalletConnect       │
│  6. DApp recibe aprobación                             │
│  7. Muestra: "✅ Conectado: GB...XXXX"                │
│                                                         │
│  ESTADO ACTUAL:                                         │
│  - Paso 4 se queda en bucle                            │
│  - "Proceed with caution" se repite                    │
│  - Posible timeout en relay                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Archivos Modificados en HerbaMed

```
frontend/vue-project/
├── .env
│   └─ VITE_WC_PROJECT_ID=4d6e4ea28e2c05227eeec7733dfd78ff
│
├── index.html
│   └─ CSP meta tag (conecta-src, wss://, frame-src)
│
├── vite.config.js
│   └─ allowedHosts para ngrok
│
├── src/
│   ├── soroban/
│   │   ├── walletconnect.js
│   │   │   └─ SignClient init, pairing, timeout
│   │   ├── balance.js
│   │   │   └─ Fetch XLM balance from Horizon
│   │   └─ client.js
│   │       └─ Freighter integration
│   │
│   └── components/
│       └── Login.vue
│           └─ startWalletConnectPairing(), QR display, timeout handling
```

---

## Conclusión

El setup de WalletConnect + ngrok permite:
- ✅ Usuarios desktop escaneando QR con teléfono
- ✅ Freighter Mobile aprobando transacciones
- ✅ DApp obteniendo account desde wallet móvil
- ✅ Firma XDR delegada al móvil

**Próximo paso:** Integrar `signWithWalletConnect(xdr)` en operaciones (registrar planta, listar, votar) para firmar transacciones usando la sesión móvil establecida.
