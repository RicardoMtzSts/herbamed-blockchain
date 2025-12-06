<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">HerbaMed</a>
        
        <!-- Indicador de autenticación -->
        <div v-if="isAuthenticated" class="d-flex align-items-center me-3">
          <span class="badge bg-success fs-6">
            ✅ Conectado
          </span>
        </div>
        <div v-else class="d-flex align-items-center me-3">
          <span class="badge bg-warning fs-6">
            ⚠️ Sin sesión
          </span>
        </div>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link 
                :class="['nav-link', !isAuthenticated ? 'disabled' : '']" 
                :to="isAuthenticated ? '/plants' : '#'"
                @click.prevent="!isAuthenticated && showAuthWarning()"
              >
                🌱 Plantas
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                :class="['nav-link', !isAuthenticated ? 'disabled' : '']" 
                :to="isAuthenticated ? '/plants/register' : '#'"
                @click.prevent="!isAuthenticated && showAuthWarning()"
              >
                ➕ Registrar
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                :class="['nav-link', !isAuthenticated ? 'disabled' : '']" 
                :to="isAuthenticated ? '/marketplace' : '#'"
                @click.prevent="!isAuthenticated && showAuthWarning()"
              >
                🛒 Marketplace
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                :class="['nav-link', !isAuthenticated ? 'disabled' : '']" 
                :to="isAuthenticated ? '/validator' : '#'"
                @click.prevent="!isAuthenticated && showAuthWarning()"
              >
                ✓ Validadores
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">🔑 Wallet</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-5">
      <!-- Keep-alive para cachear componentes pero con reactividad en activación -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    
    const isAuthenticated = computed(() => store.state.isAuthenticated)
    
    const showAuthWarning = () => {
      alert('⚠️ Debes conectar tu wallet en la sección de Login primero')
    }
    
    return {
      isAuthenticated,
      showAuthWarning
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}

.nav-link.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>