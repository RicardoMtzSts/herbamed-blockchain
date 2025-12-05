# 🌿 HerbaMed - Blockchain para Plantas Medicinales

Sistema descentralizado de registro, validación y comercio de plantas medicinales construido sobre Stellar/Soroban.

**🎯 Estado:** ✅ **Producción - Funcional Completo**  
**📅 Última Actualización:** 5 de Diciembre, 2025  
**🔗 Network:** Stellar Testnet

---

## ⚡ Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/RicardoMtzSts/herbamed-blockchain.git
cd herbamed-blockchain/frontend/vue-project
npm install

# Configurar
cp .env.example .env
# Editar .env con valores necesarios

# Ejecutar
npm run dev
# Abre http://127.0.0.1:3000
```

---

## 🎯 Características Principales

✅ **Autenticación Multi-Método**
- Clave Local Cifrada (AES-GCM + PBKDF2)
- Freighter Desktop Wallet
- WalletConnect v2 Mobile (QR)

✅ **Smart Contract Funcional**
- Registro descentralizado de plantas
- Marketplace compra/venta
- Sistema de validación comunitario
- Trazabilidad completa en blockchain

✅ **UI Completa**
- Vue 3 + Vite
- Bootstrap 5 responsive
- Auth guard en rutas
- Indicador de cuenta activa + balance

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[PROYECTO_HERBAMED_COMPLETO.md](./PROYECTO_HERBAMED_COMPLETO.md)** | 📖 **Documentación Maestra Completa** |
| [QUICKSTART.md](./QUICKSTART.md) | Guía rápida de inicio |
| [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) | Guía para desarrolladores |
| [USER_MANUAL.md](./USER_MANUAL.md) | Manual de usuario |
| [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) | Casos de prueba |
| [NGROK_SETUP.md](./NGROK_SETUP.md) | Setup mobile testing |
| [.github/copilot-instructions.md](./.github/copilot-instructions.md) | Instrucciones AI agents |

---

## 🛠️ Stack Tecnológico

**Blockchain**
- Stellar Testnet
- Soroban Smart Contracts (Rust)
- Contract: `CA5C74SZ5XHXENOVQ454WQN66PMVSPMIZV5FYUR6OWDUQKC4PKOOXNPR`

**Frontend**
- Vue 3.3.8 + Vite 7.2.2
- Vuex 4.1.0 (state)
- Vue Router 4.2.5 (routing + guards)
- Bootstrap 5.3.2 (UI)
- Stellar SDK 14.3.3
- WalletConnect v2.23.0

---

## 🚀 Uso

### 1. Crear Cuenta

```
Login → Crear Cuenta
  ↓
Ingresar contraseña
  ↓
✅ Cuenta creada
  ↓
Guardar SECRET_KEY
```

### 2. Financiar (Testnet)

```
Copiar PUBLIC_KEY
  ↓
https://laboratory.stellar.org/#account-creator
  ↓
Get test network lumens (10,000 XLM)
```

### 3. Registrar Planta

```
Plantas → Registrar
  ↓
Completar formulario
  ↓
Firmar transacción
  ↓
✅ Planta en blockchain
```

### 4. Marketplace

```
Plantas → Listar para Venta
  ↓
Ingresar precio XLM
  ↓
Marketplace → Comprar
```

---

## 📁 Estructura

```
herbamed-blockchain/
├── contracts/medicinal-plants/    # Smart contract Soroban
│   └── src/lib.rs
├── frontend/vue-project/          # DApp Vue 3
│   ├── src/
│   │   ├── components/Login.vue   # Auth (3 métodos)
│   │   ├── views/                 # Plantas, Marketplace, Validadores
│   │   ├── soroban/               # Cliente blockchain
│   │   ├── store/                 # Vuex state
│   │   └── router/                # Vue Router + guards
│   └── .env
├── PROYECTO_HERBAMED_COMPLETO.md  # 📖 Doc Completa
└── README.md                      # Este archivo
```

---

## 🧪 Testing

```bash
# Desktop
npm run dev
# → http://127.0.0.1:3000

# Mobile (con ngrok)
# Terminal 1:
npm run dev

# Terminal 2:
ngrok http 3000
# → Usar URL HTTPS en mobile
```

Ver [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) para casos completos.

---

## 🗺️ Roadmap

- [x] Smart contract deployed
- [x] Frontend funcional
- [x] Auth multi-método
- [x] CRUD plantas
- [x] Marketplace
- [x] Sistema validación
- [ ] Persistencia sesión localStorage
- [ ] Balance auto-refresh
- [ ] Historial transacciones
- [ ] Mainnet deployment

---

## 📞 Soporte

- **Issues:** https://github.com/RicardoMtzSts/herbamed-blockchain/issues
- **Docs:** [PROYECTO_HERBAMED_COMPLETO.md](./PROYECTO_HERBAMED_COMPLETO.md)

---

## 📄 Licencia

MIT License

---

**¿Listo para registrar plantas en blockchain?** 🌱

```bash
npm install && npm run dev
```
