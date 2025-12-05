# Setup ngrok para Testing Mobile

## 1. Verificar ngrok está instalado

```bash
ngrok --version
```

Si no está instalado:
```bash
# Descargar desde https://ngrok.com/download
# O instalar con apt (Linux):
sudo apt-get install ngrok
```

## 2. Autenticar ngrok

Tu token ya fue configurado. Verificar:

```bash
cat ~/.ngrok2/ngrok.yml
```

Debería contener tu auth token.

## 3. Iniciar tunnel HTTPS

En una terminal nueva, ejecuta:

```bash
ngrok http 3000
```

Verás output como:

```
ngrok                                                   (Ctrl+C to quit)

Session Status       online
Account             your-email@example.com
Version             3.x.x
Region              us (United States)
Latency             25ms
Web Interface        http://127.0.0.1:4040

Forwarding          https://xxxx-xx-xxx-xxx.ngrok.io -> http://localhost:3000
```

## 4. Actualizar `.env` para mobile testing

Editar `/frontend/vue-project/.env`:

```
VITE_APP_URL=https://xxxx-xx-xxx-xxx.ngrok.io
VITE_STELLAR_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_WC_PROJECT_ID=4d6e4ea28e2c05227eeec7733dfd78ff
```

Recargar página en navegador.

## 5. Test en Mobile

### Con Freighter Mobile:

1. Abre el navegador móvil (Chrome/Firefox)
2. Navega a: `https://xxxx-xx-xxx-xxx.ngrok.io` (la URL que ngrok mostró)
3. Acepta warning de certificado autofirmado
4. Ve a sección "Login" → Tab "Ingresar" → "Conectar Mobile con QR"
5. Click en "📱 Generar QR"
6. Abre Freighter Mobile
7. Toca el ícono de scan/QR
8. Escanea el QR que aparece
9. Aprueba la conexión en Freighter Mobile
10. Verá "Cuenta Activa" en el navegador

### Alternativa: Testnet Browser (sin QR)

Si Freighter no está disponible en mobile, puedes:

1. Importar un SECRET_KEY en Desktop Freighter
2. Copiar su PUBLIC_KEY
3. Usar Freighter Desktop para firmar transacciones
4. Luego probar WalletConnect cuando esté disponible

## 6. Debugging

### Ver requests en ngrok dashboard:

```bash
open http://localhost:4040
```

### Logs en Vite:

En terminal donde corre Vite, verás hot-reload confirmations.

### Errores de certificado:

Si ngrok dice "SSL certificate problem":
- Usar navegador mobile que acepte certificados autofirmados
- O generar certificado válido en ngrok (plan Premium)

## 7. Detener ngrok

Presionar `Ctrl+C` en la terminal de ngrok.

---

## Flujo Completo de Testing

```
Terminal 1: Vite dev server
$ cd frontend/vue-project && npm run dev
✅ VITE v7.2.2 ready in 123 ms

Terminal 2: ngrok tunnel
$ ngrok http 3000
✅ Session Status: online
   Forwarding: https://xxxx-xxxx.ngrok.io -> http://localhost:3000

Desktop Browser: http://127.0.0.1:3000
✅ Acceso local (para development)
   - Usar Freighter Desktop
   - O importar SECRET_KEY local

Mobile Browser: https://xxxx-xxxx.ngrok.io
✅ Acceso remote (para testing mobile)
   - WalletConnect QR scan desde Freighter Mobile
   - Ver balance en XLM
   - Solo acceso a plantas/marketplace/validadores si autenticado
```

---

**Estado Actual:**
- ✅ Vite servidor corriendo en `http://127.0.0.1:3000`
- ✅ WalletConnect client inicializado con Project ID correcto
- ✅ QR generation funcional con `qrcode` npm package
- ✅ Auth guard bloqueando rutas sin autenticación
- ⏳ ngrok tunnel (ready cuando necesites mobile testing)
