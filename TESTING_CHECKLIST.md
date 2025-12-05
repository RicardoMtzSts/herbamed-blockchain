# Checklist de Funcionalidad - Herbamed DApp

## ✅ Setup Completado

- [x] Vite dev server en `http://127.0.0.1:3000`
- [x] WalletConnect Cloud Project ID configurado
- [x] Stellar Testnet RPC configurado
- [x] Vuex store con estado de autenticación
- [x] Router con auth guard
- [x] Login.vue con 3 métodos de autenticación

## 🧪 Testing Checklist - Desktop

### 1. **Navegación Sin Autenticación**
```
1. Abre http://127.0.0.1:3000
2. Intenta acceder a "Plantas" → Debe redirigir a /login
3. Navbar debe mostrar "⚠️ Sin sesión"
4. Los links de Plantas/Registrar/Marketplace/Validadores deben estar deshabilitados
```

### 2. **Crear Cuenta Nueva**
```
1. En Login → Tab "Crear Cuenta"
2. Ingresa contraseña (ej: "test123")
3. Confirma contraseña
4. Click "Crear Cuenta"
5. Debe mostrar:
   ✓ Alert verde "Cuenta creada y guardada cifrada"
   ✓ Public Key (formato: GXXXXXX...)
   ✓ Secret Key (formato: SXXXXXX...)
   ✓ QR code para el Secret
6. Debe actualizar store:
   ✓ Navbar cambia a "✅ Conectado"
   ✓ Indicador verde en Login mostrando clave + balance
   ✓ Balance debe decir "—" si no hay fondos
```

### 3. **Acceso con Clave Local Guardada**
```
1. (Después de crear cuenta)
2. En Login → Tab "Ingresar" → "Desbloquear Clave Local"
3. Ingresa contraseña (ej: "test123")
4. Click "Desbloquear"
5. Debe mostrar:
   ✓ Alert verde "Sesión iniciada con clave local"
   ✓ Indicador de cuenta activa
   ✓ Puede acceder a Plantas ahora
```

### 4. **Importar Clave Secreta Existente**
```
Prerequisito: Tener un SECRET_KEY válido de Stellar testnet

1. En Login → Tab "Importar Clave"
2. Pega el SECRET (empieza con 'S')
3. Ingresa contraseña para cifrar (opcional)
4. Click "Importar y Guardar"
5. Debe mostrar:
   ✓ Alert verde "Clave importada y guardada"
   ✓ Acceso a Plantas funcionando
```

### 5. **Conectar Freighter (Si está instalada)**
```
Prerequisito: Freighter extension instalada en navegador

1. En Login → Tab "Ingresar" → "Conectar Freighter"
2. Debe mostrar: "Detectada ✓" en el footer
3. Click "Conectar Freighter"
4. Freighter popup aparece pidiendo aprobación
5. Click "Approve" en Freighter
6. Debe mostrar:
   ✓ Alert verde con public key de Freighter
   ✓ Navbar "✅ Conectado"
   ✓ Puede acceder a Plantas
```

### 6. **WalletConnect QR (Desktop)**
```
1. En Login → Tab "Ingresar" → "Conectar Mobile con QR"
2. Click "📱 Generar QR"
3. Debe mostrar:
   ✓ Spinner mientras genera
   ✓ QR code de WalletConnect
   ✓ Mensaje "Escanea con Freighter móvil para conectar"
4. (Para completar: Necesita escanear desde mobile)
```

### 7. **Acceso a Plantas (Cuando Autenticado)**
```
Prerequisito: Estar autenticado

1. Click en "Plantas" del navbar
2. Debe cargar página de plantas SIN redireccionar a login
3. Navbar debe mostrar "✅ Conectado"
```

### 8. **Cerrar Sesión**
```
1. En Login (si está autenticado)
2. En indicador verde "✅ Cuenta Activa"
3. Click "Cerrar Sesión"
4. Debe mostrar:
   ✓ Alert verde "Sesión cerrada"
   ✓ Indicador pasa a "⚠️ Sin sesión"
   ✓ Navbar desactiva links
   ✓ Intenta acceder a Plantas → Redirige a /login
```

## 📱 Testing Checklist - Mobile (Con ngrok)

### Setup ngrok

```bash
# Terminal 1: Vite ya corriendo
cd ~/herbamed-blockchain/frontend/vue-project

# Terminal 2: Iniciar ngrok
ngrok http 3000

# Salida esperada:
# Forwarding   https://xxxx-xxx-xxx.ngrok.io -> http://localhost:3000
```

### 1. **Acceso Mobile via HTTPS**
```
1. Abre navegador móvil
2. Navega a: https://xxxx-xxx-xxx.ngrok.io
3. Acepta warning de certificado autofirmado
4. Debe cargar Login page igual que desktop
```

### 2. **Crear Cuenta en Mobile**
```
(Igual que en desktop, pero desde HTTPS ngrok URL)
```

### 3. **WalletConnect QR Scan**
```
Prerequisito: Freighter Mobile instalada

1. En Login Mobile → Tab "Ingresar"
2. Click "📱 Generar QR"
3. QR debe aparecer
4. Abre Freighter Mobile
5. Toca botón scan/QR (usualmente en esquina)
6. Escanea el QR de pantalla
7. Freighter muestra "Aprobar conexión con Herbamed DApp"
8. Toca "Aprobar"
9. Vuelve a navegador
10. Debe mostrar:
    ✓ Alert verde "WalletConnect conectado correctamente"
    ✓ Indicador con public key + balance
    ✓ Puede acceder a Plantas
```

## 🐛 Debugging

### Errores Comunes

#### "Freighter no está instalada"
- Descargar desde: https://freighter.app
- O instalar en Chrome Web Store

#### "RPC URL no disponible"
- Verificar `.env` tiene `VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org`
- Verificar conexión a internet
- Comprobar que Stellar testnet está disponible

#### "Balance muestra —"
- Es normal si la cuenta no tiene fondos
- Solicitar XLM de testnet faucet: https://laboratory.stellar.org/#account-creator

#### WalletConnect QR no aparece
- Verificar `qrcode` está instalado: `npm ls qrcode`
- Check console del navegador para errores
- Verificar Project ID en `.env`: `4d6e4ea28e2c05227eeec7733dfd78ff`

#### ngrok certificado autofirmado
- Normal en desarrollo
- En producción: usar certificado válido
- Navegadores móviles suelen aceptar automáticamente

### Ver Logs

```bash
# Vite dev server
# (En terminal donde corre npm run dev)
# Buscar "VITE v7.2.2" y "ready in Xms"

# WalletConnect
# (En console del navegador)
console.log('isWalletConnectReady:', typeof signClient !== 'undefined')

# Vuex store
# (En console del navegador)
console.log(store.state)
// Debe mostrar: { isAuthenticated, authMethod, publicKey, balance, ... }
```

## 📊 Estado Actual

| Componente | Estado | Notas |
|-----------|--------|-------|
| Vite Server | ✅ Running | `http://127.0.0.1:3000` |
| Login.vue | ✅ Completo | 3 auth methods + QR |
| Vuex Store | ✅ Configurado | Auth state + balance |
| Router Guard | ✅ Activo | Bloquea rutas sin auth |
| Freighter | ✅ Soportado | Requiere extension |
| WalletConnect | ✅ Soportado | Requiere testnet mobile |
| ngrok | ⏳ Ready | Ejecutar `ngrok http 3000` |

## 🎯 Próximos Pasos (Si necesario)

1. **Balance Refresh**: Agregar botón "Refrescar Balance" en indicador
2. **Persistence**: Guardar auth state en localStorage para recargas
3. **Faucet Link**: Agregar enlace a testnet faucet en Login
4. **Error Handling**: Mejorar mensajes de error con más detalles
5. **Rate Limiting**: Implementar throttling para requests de balance
6. **Historial**: Agregar historial de transacciones/sesiones

---

**Para empezar testing inmediatamente:**

```bash
# Terminal 1: (Ya corriendo Vite)
cd ~/herbamed-blockchain/frontend/vue-project
npm run dev

# Luego en navegador:
http://127.0.0.1:3000
# → Ve a Login
# → Crea una cuenta nueva
# → Verifica que puedes acceder a Plantas

# Para mobile + WalletConnect:
# Terminal 2:
ngrok http 3000
# → Copia URL HTTPS
# → Abre en mobile browser
# → Prueba QR scan con Freighter Mobile
```
