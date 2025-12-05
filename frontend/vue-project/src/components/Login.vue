<template>
  <div class="container mt-4">
    <div class="card mx-auto" style="max-width:760px">
      <div class="card-body">
        <h4 class="card-title text-center">Conectar Wallet</h4>

        <!-- Indicador de cuenta activa -->
        <div v-if="isAuthenticated" class="alert alert-success mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>✅ Cuenta Activa</strong>
              <div class="small mt-1">
                <strong>Clave Pública:</strong> {{ publicKey.slice(0, 8) }}…{{ publicKey.slice(-8) }}
                <div class="mt-1"><strong>Balance:</strong> {{ balance }} XLM</div>
                <div class="mt-1 small text-success"><strong>Método:</strong> {{ authMethodLabel }}</div>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" @click="logout">Cerrar Sesión</button>
          </div>
        </div>

        <!-- Alerta si no hay cuenta activa -->
        <div v-else class="alert alert-warning mb-3">
          <strong>⚠️ Sin sesión activa.</strong> Debes conectar tu wallet para acceder a otras secciones.
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a :class="['nav-link', activeTab==='login' ? 'active' : '']" href="#" @click.prevent="activeTab='login'">Ingresar</a>
          </li>
          <li class="nav-item">
            <a :class="['nav-link', activeTab==='create' ? 'active' : '']" href="#" @click.prevent="activeTab='create'">Crear Cuenta</a>
          </li>
          <li class="nav-item">
            <a :class="['nav-link', activeTab==='import' ? 'active' : '']" href="#" @click.prevent="activeTab='import'">Importar Clave</a>
          </li>
        </ul>

        <!-- TAB: LOGIN -->
        <div v-if="activeTab==='login'">
          <h5 class="mb-3">Métodos de Acceso</h5>

          <!-- Desbloquear clave local -->
          <div class="mb-4 p-3 border rounded bg-light">
            <h6 class="mb-2">1️⃣ Desbloquear Clave Cifrada Local</h6>
            <p class="small text-muted">Usa tu clave guardada cifrada en el navegador.</p>
            <div class="mb-2">
              <label class="form-label">Contraseña</label>
              <input v-model="loginPassword" type="password" class="form-control" placeholder="Tu contraseña" />
            </div>
            <button class="btn btn-primary btn-sm" @click="loginLocal">Desbloquear</button>
          </div>

          <!-- Conectar Freighter -->
          <div class="mb-4 p-3 border rounded bg-light">
            <h6 class="mb-2">2️⃣ Conectar Freighter (Desktop)</h6>
            <p class="small text-muted">Wallet para navegador desktop de Stellar.</p>
            <button class="btn btn-success btn-sm" @click="connectFreighter">Conectar Freighter</button>
            <span v-if="freighterText" class="small ms-2" :class="freighterText.includes('✓') ? 'text-success' : 'text-muted'">{{ freighterText }}</span>
          </div>

          <!-- WalletConnect QR (Mobile) -->
          <div class="mb-4 p-3 border rounded bg-light">
            <h6 class="mb-2">3️⃣ Conectar Mobile con QR</h6>
            <p class="small text-muted">Escanea desde Freighter móvil (WalletConnect v2).</p>
            <button class="btn btn-info btn-sm" @click="toggleWalletConnectQR" :disabled="generatingQR">
              {{ wcQRVisible ? '🔻 Ocultar QR' : '📱 Generar QR' }}
            </button>
            <div v-if="wcQRVisible" class="mt-3 text-center">
              <div v-if="generatingQR" class="spinner-border spinner-border-sm text-info" role="status">
                <span class="visually-hidden">Generando QR...</span>
              </div>
              <div v-else>
                <canvas id="walletConnectQR" style="max-width: 300px; border: 2px solid #ddd; padding: 10px; background: white;"></canvas>
                <p class="small text-muted mt-2">{{ wcQRMessage }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB: CREATE -->
        <div v-if="activeTab==='create'">
          <p class="text-muted">Genera una nueva clave y guárdala cifrada con tu contraseña.</p>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="createPassword" type="password" class="form-control" placeholder="Nueva contraseña" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirmar contraseña</label>
            <input v-model="createPasswordConfirm" type="password" class="form-control" placeholder="Repetir contraseña" />
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm" @click="createAccount">Crear Cuenta</button>
            <button class="btn btn-outline-secondary btn-sm" @click="generateOnly">Generar (no guardar)</button>
          </div>

          <div v-if="newAccount" class="mt-3">
            <hr />
            <h5>Cuenta Generada</h5>
            <p><strong>Public Key:</strong></p>
            <pre class="p-2 bg-light small">{{ newAccount.publicKey }}</pre>
            <p class="text-danger"><strong>Secret (guárdala en lugar seguro):</strong></p>
            <pre class="p-2 bg-danger bg-opacity-10 small">{{ newAccount.secret }}</pre>
            <p class="small text-muted">Escanea el QR para guardar en móvil (no compartas):</p>
            <img :src="qrUrl(newAccount.secret)" alt="QR" style="max-width: 200px;" />
          </div>
        </div>

        <!-- TAB: IMPORT -->
        <div v-if="activeTab==='import'">
          <div class="alert alert-success mb-3">
            <strong>✅ Recomendado:</strong> Importa SECRET_KEY para firmar sin depender de Freighter.
          </div>
          <p class="text-muted">Pega tu clave secreta (empieza con 'S').</p>
          <div class="mb-3">
            <label class="form-label">Clave Secreta</label>
            <input v-model="importSecret" type="text" class="form-control" placeholder="S..." />
          </div>
          <div class="mb-3">
            <label class="form-label">Guardar Cifrada (opcional)</label>
            <input v-model="importPassword" type="password" class="form-control" placeholder="Contraseña para cifrar" />
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="importAndSave">Importar y Guardar</button>
            <button class="btn btn-outline-primary btn-sm" @click="importOnly">Solo Importar</button>
          </div>
        </div>

        <!-- Status Messages -->
        <div v-if="status" class="mt-3 alert" :class="status.type === 'error' ? 'alert-danger' : 'alert-success'">
          {{ status.message }}
        </div>

        <!-- Footer Info -->
        <div class="mt-3 text-center small text-muted">
          Freighter: <strong>{{ freighterText }}</strong> • RPC: <strong>{{ rpcText }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { connectWallet, setLocalSecret, isFreighterInstalled, isRpcAvailable, waitForFreighterInjection } from '@/soroban/client'
import { initializeWalletConnect, generateWalletConnectQR, getWalletConnectPublicKey, getActiveSession, disconnectWalletConnect } from '@/soroban/walletconnect'
import { getAccountInfo } from '@/soroban/balance'
import { Keypair } from '@stellar/stellar-sdk'
import QRCode from 'qrcode'

// Crypto helpers
function buf2b64(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))) }
function b642buf(b64) { return Uint8Array.from(atob(b64), c => c.charCodeAt(0)) }

async function deriveKey(password, salt) {
  const enc = new TextEncoder()
  const passKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, passKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

async function encryptSecret(secret, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const enc = new TextEncoder()
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(secret))
  return { salt: buf2b64(salt), iv: buf2b64(iv), data: buf2b64(ct) }
}

async function decryptSecret(payload, password) {
  const salt = b642buf(payload.salt)
  const iv = b642buf(payload.iv)
  const data = b642buf(payload.data)
  const key = await deriveKey(password, salt)
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
  const dec = new TextDecoder()
  return dec.decode(pt)
}

export default {
  name: 'LoginAdvanced',
  setup() {
    const store = useStore()
    
    const activeTab = ref('login')
    const loginPassword = ref('')
    const createPassword = ref('')
    const createPasswordConfirm = ref('')
    const newAccount = ref(null)
    const importSecret = ref('')
    const importPassword = ref('')
    const status = ref(null)
    const freighterText = ref('Detectando...')
    const rpcText = ref('...')
    const wcQRUrl = ref(null)
    const wcQRVisible = ref(false)
    const generatingQR = ref(false)
    const wcQRMessage = ref('Escanea con Freighter móvil')

    const isAuthenticated = computed(() => store.state.isAuthenticated)
    const publicKey = computed(() => store.state.publicKey)
    const balance = computed(() => store.state.balance || '—')
    const authMethodLabel = computed(() => {
      const method = store.state.authMethod
      return method === 'local-key' ? 'Clave Local' : method === 'freighter' ? 'Freighter' : method === 'walletconnect' ? 'WalletConnect Mobile' : '—'
    })

    onMounted(async () => {
      await waitForFreighterInjection()
      freighterText.value = isFreighterInstalled() ? 'Instalada ✓' : 'No detectada'
      
      const rpcAvailable = await isRpcAvailable()
      rpcText.value = rpcAvailable ? 'Disponible' : 'No disponible'

      // Initialize WalletConnect
      try {
        await initializeWalletConnect()
      } catch (e) {
        console.warn('WalletConnect init failed (non-critical):', e.message)
      }
    })

    function qrUrl(content) {
      const encoded = encodeURIComponent(content)
      return `https://chart.googleapis.com/chart?chs=240x240&cht=qr&chl=${encoded}`
    }

    async function toggleWalletConnectQR() {
      if (wcQRVisible.value) {
        wcQRVisible.value = false
        return
      }

      // Primero mostrar el contenedor con canvas
      wcQRVisible.value = true
      generatingQR.value = false // Mostrar canvas inmediatamente
      
      // Esperar a que el DOM se actualice
      await nextTick()
      
      try {
        const { uri, approval } = await generateWalletConnectQR()
        console.log('WalletConnect URI:', uri)
        
        // Obtener canvas directamente del DOM
        const canvas = document.getElementById('walletConnectQR')
        console.log('Canvas element:', canvas)
        
        if (!canvas) {
          throw new Error('Canvas element no encontrado en el DOM')
        }
        
        // Renderizar QR directamente en canvas (evita CSP issues)
        await QRCode.toCanvas(canvas, uri, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        
        wcQRUrl.value = uri // Guardar URI para referencia
        wcQRMessage.value = 'Escanea con Freighter móvil para conectar'
        console.log('QR generado exitosamente')

        // Wait for approval in background
        approval().then(async (session) => {
          if (session) {
            const pk = getWalletConnectPublicKey()
            if (pk) {
              await setSessionAsActive(pk, 'walletconnect')
              wcQRVisible.value = false
              status.value = { type: 'success', message: 'WalletConnect conectado correctamente' }
            }
          }
        }).catch(e => {
          console.error('WalletConnect approval failed:', e)
          status.value = { type: 'error', message: 'Error en aprobación de WalletConnect' }
        })
      } catch (e) {
        console.error('Error generando QR:', e)
        status.value = { type: 'error', message: 'Error generando QR: ' + e.message }
      } finally {
        generatingQR.value = false
      }
    }

    async function setSessionAsActive(pk, method) {
      store.commit('SET_PUBLIC_KEY', pk)
      store.commit('SET_AUTH_METHOD', method)
      store.commit('SET_AUTHENTICATED', true)

      // Fetch balance
      try {
        const info = await getAccountInfo(pk)
        if (info) {
          store.commit('SET_BALANCE', info.balance)
        }
      } catch (e) {
        console.warn('Balance fetch failed:', e.message)
      }
    }

    async function createAccount() {
      status.value = null
      if (!createPassword.value) {
        status.value = { type: 'error', message: 'Ingresa contraseña' }
        return
      }
      if (createPassword.value !== createPasswordConfirm.value) {
        status.value = { type: 'error', message: 'Contraseñas no coinciden' }
        return
      }
      try {
        const kp = Keypair.random()
        const payload = await encryptSecret(kp.secret(), createPassword.value)
        localStorage.setItem('herbamed:account', JSON.stringify(payload))
        setLocalSecret(kp.secret())
        newAccount.value = { secret: kp.secret(), publicKey: kp.publicKey() }
        await setSessionAsActive(kp.publicKey(), 'local-key')
        status.value = { type: 'success', message: 'Cuenta creada y guardada cifrada.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error: ' + e.message }
      }
    }

    function generateOnly() {
      const kp = Keypair.random()
      newAccount.value = { secret: kp.secret(), publicKey: kp.publicKey() }
      status.value = { type: 'success', message: 'Cuenta generada (no guardada).' }
    }

    async function loginLocal() {
      status.value = null
      const raw = localStorage.getItem('herbamed:account')
      if (!raw) {
        status.value = { type: 'error', message: 'No hay cuenta guardada.' }
        return
      }
      try {
        const payload = JSON.parse(raw)
        const secret = await decryptSecret(payload, loginPassword.value)
        const kp = Keypair.fromSecret(secret)
        setLocalSecret(secret)
        await setSessionAsActive(kp.publicKey(), 'local-key')
        status.value = { type: 'success', message: 'Sesión iniciada con clave local.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error: ' + e.message }
      }
    }

    async function importAndSave() {
      status.value = null
      if (!importSecret.value) {
        status.value = { type: 'error', message: 'Pega la clave secreta' }
        return
      }
      if (!importPassword.value) {
        status.value = { type: 'error', message: 'Ingresa contraseña para guardar' }
        return
      }
      try {
        const kp = Keypair.fromSecret(importSecret.value)
        const payload = await encryptSecret(importSecret.value, importPassword.value)
        localStorage.setItem('herbamed:account', JSON.stringify(payload))
        setLocalSecret(importSecret.value)
        await setSessionAsActive(kp.publicKey(), 'local-key')
        status.value = { type: 'success', message: 'Clave importada y guardada.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error: ' + e.message }
      }
    }

    function importOnly() {
      try {
        const kp = Keypair.fromSecret(importSecret.value)
        setLocalSecret(importSecret.value)
        status.value = { type: 'success', message: 'Clave importada en memoria.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error: ' + e.message }
      }
    }

    async function connectFreighter() {
      status.value = null
      try {
        const pk = await connectWallet()
        if (!pk) {
          status.value = { type: 'error', message: 'Freighter rechazó la conexión' }
          return
        }
        freighterText.value = 'Conectada ✓'
        await setSessionAsActive(pk, 'freighter')
        status.value = { type: 'success', message: 'Freighter conectada: ' + pk }
      } catch (e) {
        const msg = e.message || String(e)
        if (msg.includes('not available')) {
          status.value = { type: 'error', message: 'Freighter no está instalada. Descárgala en: https://freighter.app' }
        } else {
          status.value = { type: 'error', message: 'Error: ' + msg }
        }
      }
    }

    async function logout() {
      try {
        // Disconnect WalletConnect if active
        if (store.state.authMethod === 'walletconnect') {
          await disconnectWalletConnect()
        }
        
        setLocalSecret('')
        store.commit('SET_PUBLIC_KEY', null)
        store.commit('SET_BALANCE', null)
        store.commit('SET_AUTHENTICATED', false)
        store.commit('SET_AUTH_METHOD', null)
        status.value = { type: 'success', message: 'Sesión cerrada.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error al cerrar sesión: ' + e.message }
      }
    }

    function handleQRError(event) {
      console.error('Error cargando imagen QR:', event)
      status.value = { type: 'error', message: 'Error cargando imagen QR. Verifica la consola.' }
    }

    return {
      activeTab,
      loginPassword,
      createPassword,
      createPasswordConfirm,
      newAccount,
      importSecret,
      importPassword,
      status,
      freighterText,
      rpcText,
      wcQRUrl,
      wcQRVisible,
      generatingQR,
      wcQRMessage,
      isAuthenticated,
      publicKey,
      balance,
      authMethodLabel,
      qrUrl,
      toggleWalletConnectQR,
      handleQRError,
      createAccount,
      generateOnly,
      loginLocal,
      importAndSave,
      importOnly,
      connectFreighter,
      logout
    }
  }
}
</script>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; font-size: 0.85rem; }
.border { border-color: #ddd !important; }
.bg-light { background-color: #f8f9fa !important; }
</style>
