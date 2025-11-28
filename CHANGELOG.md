# Changelog

Todos los cambios notables del proyecto Herbamed serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

---

## [Unreleased]

### Planeado
- Sistema de notificaciones en tiempo real
- Chat entre usuarios para marketplace
- Sistema de reputación para vendedores
- Integración con pasarelas de pago fiat
- App móvil nativa (React Native)
- Panel de analytics y métricas

---

## [1.1.0] - 2025-11-27

###  Agregado
- **Sistema de Modo Global (Demo/Blockchain)**
  - Selección obligatoria de modo en pantalla de login
  - Persistencia de modo en localStorage con clave `herbamed:mode`
  - Router guard que previene acceso sin modo configurado
  - Indicador visual de modo activo en navbar con badge distintivo
  - Status bar mostrando modo actual y vista navegada

- **Interfaz Adaptativa en Wallet**
  - Modo Demo: Muestra solo "Ingresar (local)" y "Crear Cuenta"
  - Modo Blockchain: Muestra solo "Ingresar (Freighter)" e "Importar Clave"
  - Tabs condicionales según modo seleccionado
  - Mensajes de confirmación específicos por modo con emojis
  - Watcher reactivo que actualiza UI automáticamente al cambiar modo

- **Mejoras de UX**
  - Confirmación de modo permanece en pestaña Wallet (sin redirección)
  - Mensajes de estado con formato claro ( éxito,  error)
  - Empty states para vistas sin contenido
  - Limpieza automática de mensajes al cambiar contexto
  - Navegación fluida sin recargas entre pestañas

- **Documentación**
  - Archivo CONTRATO_POST_PR.md con compromisos post-PR
  - Archivo CONTRIBUTORS.md reconociendo al equipo
  - CHANGELOG.md para seguimiento de versiones

###  Modificado
- **Vuex Store**
  - Agregado estado `mode` con mutations y actions
  - Getter `currentMode` para acceso reactivo
  - Action `initMode` para cargar modo desde localStorage
  - Action `setMode` para guardar modo con persistencia

- **Router**
  - Guard `beforeEach` implementado
  - Redirección a `/login` si no hay modo configurado
  - Inicialización de modo desde localStorage al cargar app

- **Componente Login.vue**
  - Refactorización completa de lógica de autenticación
  - Separación de flujos Demo vs Blockchain
  - Implementación de watchers para reactividad
  - Mejora en validaciones de modo antes de confirmación

- **Componentes de Vistas**
  - PlantList.vue: Agregado watcher de modo para recargar plantas
  - ValidatorDashboard.vue: Reactivo a cambios de modo
  - MarketPlace.vue: Computed property para modo reactivo

###  Estilo
- Theme personalizado verde/cyan (480 líneas CSS)
- Background de plantas medicinales con overlay
- Componentes Bootstrap personalizados
- Fuentes Google: Poppins (body) y Playfair Display (headings)
- Gradientes personalizados en navbar y botones
- Scrollbar personalizado
- Badges distintivos para cada modo

###  Seguridad
- Cifrado de claves privadas con Web Crypto API
- Validación de modo antes de acceso a funcionalidades críticas
- Separación estricta entre entorno Demo y Blockchain
- No almacenamiento de claves sin cifrar
- Sanitización de inputs de usuario

###  Corregido
- Error de inject() al usar composables fuera de setup()
- Problema de reactividad al navegar entre pestañas
- Wallet no mostraba modo actualizado tras confirmación
- Vistas no se refrescaban al cambiar de modo
- Redirección no deseada tras confirmar modo
- Syntax error en Vuex store (cierre de llave extra)

###  Técnico
- Migración a Vue 3 Composition API en todos los componentes
- Uso de `computed` y `watch` para reactividad óptima
- Implementación de router guards para protección de rutas
- Persistencia de estado con localStorage
- Hot Module Replacement (HMR) configurado con Vite

---

## [1.0.0] - 2025-11-18

###  Lanzamiento Inicial MVP

#### Agregado
- **Sistema de Autenticación Dual**
  - Login local con cifrado de claves
  - Integración con Freighter Wallet
  - Importación segura de claves privadas
  - Gestión de sesiones persistentes

- **Gestión de Plantas Medicinales**
  - Registro de nuevas plantas con metadata
  - Lista completa de plantas registradas
  - Validación científica por especialistas
  - Fichas técnicas detalladas

- **Marketplace Descentralizado**
  - Listado de plantas en venta
  - Sistema de compra con tokens
  - Historial de transacciones
  - Filtros y búsqueda

- **Panel de Validadores**
  - Dashboard para validadores certificados
  - Aprobación/rechazo de plantas pendientes
  - Sistema de reputación básico

- **Integración Blockchain**
  - Smart contracts en Stellar Soroban
  - Conexión a testnet
  - Manejo de transacciones
  - Consulta de estado on-chain

#### Infraestructura
- Frontend: Vue 3.3.8 con Vite
- Backend: Node.js con Express
- Blockchain: Stellar SDK 14.3.3
- Estilos: Bootstrap 5.3.2
- Estado: Vuex 4.x
- Routing: Vue Router 4.2.5

#### Base de Datos
- 50+ plantas medicinales catalogadas
- Información validada científicamente
- Metadata completa (usos, contraindicaciones, preparación)

---

## Tipos de Cambios

- ` Agregado` - Nuevas funcionalidades
- ` Modificado` - Cambios en funcionalidades existentes
- ` Eliminado` - Funcionalidades removidas
- ` Corregido` - Corrección de bugs
- ` Seguridad` - Correcciones de seguridad
- ` Técnico` - Cambios técnicos internos
- ` Estilo` - Cambios visuales y de diseño
- ` Documentación` - Solo cambios en docs

---

## Links de Referencia

- **Repositorio:** https://github.com/RicardoMtzSts/herbamed-blockchain
- **Issues:** https://github.com/RicardoMtzSts/herbamed-blockchain/issues
- **Pull Requests:** https://github.com/RicardoMtzSts/herbamed-blockchain/pulls
- **Documentación:** [En desarrollo]

---

**Última actualización:** 27 de Noviembre de 2025  
**Mantenido por:** Equipo Herbamed
