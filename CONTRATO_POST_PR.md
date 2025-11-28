# ANEXO II – CONTRATO SIMBÓLICO POSTERIOR AL PULL REQUEST

**Fecha de Actualización:** 27/11/2025  
**Pull Request Asociada:** PR-PostCompromiso-Herbamed  
**Repositorio Oficial:** https://github.com/RicardoMtzSts/herbamed-blockchain  
**Rama Asociada:** pr/post-compromiso-herbamed

Tras la aprobación formal del Pull Request principal donde se estableció el Contrato Simbólico de Compromiso del Proyecto Herbamed, se genera el presente documento como extensión oficial, para reforzar la continuidad del compromiso del equipo y agregar acuerdos adicionales surgidos después de la revisión técnica y organizativa del proyecto.

---

## ARTÍCULO 7: COMPROMISOS POST-PULL REQUEST

### 7.1 Compromisos de Mantenimiento Continuo

Una vez aceptado el Pull Request inicial, cada miembro se compromete a:

- Mantener actualizado su entorno de desarrollo con la rama principal
- Documentar cualquier cambio significativo en el README o Wiki del repositorio
- Evitar deuda técnica innecesaria y reportarla en caso de generarse
- Garantizar que cada nuevo feature cuente con pruebas funcionales básicas
- Mantener la calidad del código mediante revisiones continuas

### 7.2 Compromisos de Integración Continua

El equipo asume que toda contribución posterior deberá:

- Pasar validaciones automáticas (lint, build y pruebas unitarias)
- Ser revisada al menos por un miembro diferente al autor
- Mantener la integridad y estabilidad de la rama principal
- Cumplir con los lineamientos de commits semánticos establecidos
- Documentar los cambios en el archivo CHANGELOG.md

---

## ARTÍCULO 8: NUEVAS DIRECTRICES DE DESARROLLO

### 8.1 Accesibilidad y Experiencia de Usuario

Cualquier feature nuevo deberá considerar:

- Buen contraste visual y diseño responsivo
- Flujo intuitivo incluso para usuarios principiantes
- Compatibilidad con accesibilidad básica (tamaño de fuente, navegación clara)
- Mensajes de error claros y acciones correctivas evidentes
- Tiempos de carga optimizados (< 3 segundos en conexiones estándar)

### 8.2 Seguridad Ampliada

El equipo añade los siguientes requisitos de seguridad:

- No almacenar datos sensibles sin cifrado (implementado con Web Crypto API)
- Aplicar sanitización a todos los inputs de usuario
- Mantener registros de actividad relevantes para depuración
- Implementar rate limiting en endpoints críticos
- Validar todas las transacciones blockchain antes de firmar
- Mantener claves privadas únicamente en el lado del cliente

### 8.3 Escalabilidad Técnica

Las nuevas implementaciones deben estar preparadas para:

- Incremento progresivo de usuarios (hasta 10,000 en la siguiente fase)
- Una arquitectura que soporte microservicios a futuro
- Modularidad en los componentes para facilitar su mantenimiento
- Caché inteligente para reducir llamadas a blockchain
- Optimización de consultas y minimización de latencia

---

## ARTÍCULO 9: PROCESO DE APROBACIÓN DE NUEVOS CAMBIOS

### 9.1 Flujo Estándar de PR

Todo nuevo código deberá seguir este flujo:

1. Crear rama con nombre estándar siguiendo convención:
   - `feat/` - Nuevas funcionalidades
   - `fix/` - Corrección de bugs
   - `hotfix/` - Correcciones urgentes en producción
   - `refactor/` - Mejoras de código sin cambio funcional
   - `docs/` - Cambios en documentación
   - `style/` - Cambios de formato o estilo

2. Descripción clara de cambios en el Pull Request incluyendo:
   - Descripción del problema o feature
   - Solución implementada
   - Archivos modificados principales
   - Impacto en otras funcionalidades

3. Adjuntar evidencia funcional (capturas de pantalla o video demostrativo)

4. Asignar revisores correspondientes según el área afectada

5. Resolver todas las observaciones antes del merge

6. Ejecutar pruebas locales antes de solicitar revisión

### 9.2 Criterios de Rechazo

Un Pull Request será rechazado si:

- No cumple los estándares de calidad establecidos
- Introduce vulnerabilidades de seguridad o prácticas no recomendadas
- No respeta el estilo de código del proyecto (Vue 3, Composition API)
- Presenta falta de documentación en funciones críticas
- Rompe funcionalidades existentes sin justificación válida
- No incluye commits semánticos apropiados

### 9.3 Revisión Técnica

Cada PR será evaluado considerando:

- **Funcionalidad:** ¿Resuelve el problema planteado?
- **Rendimiento:** ¿Introduce lag o consumo excesivo de recursos?
- **Seguridad:** ¿Expone vulnerabilidades o datos sensibles?
- **Mantenibilidad:** ¿Es el código legible y documentado?
- **Compatibilidad:** ¿Funciona en ambos modos (Demo/Blockchain)?

---

## ARTÍCULO 10: RECONOCIMIENTO DEL PROGRESO COLECTIVO

### 10.1 Celebración de Avances

Cada fase completada será registrada en el repositorio con:

- Un tag oficial siguiendo versionado semántico (ej: `v1.0.0`, `v1.1.0`)
- Una nota de versión detallada en `CHANGELOG.md`
- Un agradecimiento simbólico en el archivo `CONTRIBUTORS.md`
- Actualización del README con nuevas funcionalidades
- Documentación de lecciones aprendidas

### 10.2 Métricas y Evaluación de Avance

El proyecto evaluará su progreso por medio de:

- Número de issues completados por semana (meta: 5-10)
- Tiempo promedio de respuesta a mensajes internos (< 24 horas)
- Número de Pull Requests aprobadas mensualmente
- Estabilidad del sistema tras cada merge (0 bugs críticos)
- Cobertura de pruebas (meta: > 70%)
- Satisfacción del usuario (mediante feedback directo)

### 10.3 Hitos Técnicos Alcanzados

El equipo reconoce oficialmente los siguientes logros:

 **Sistema de Modo Global (Demo/Blockchain)**
- Implementación de selección de modo persistente
- Router guard para protección de rutas
- UI adaptativa según modo seleccionado
- Integración con Vuex para estado global

 **Interfaz Personalizada**
- Theme verde/cyan con identidad visual médica
- Background de plantas medicinales
- Componentes Bootstrap personalizados
- Fuentes Google (Poppins/Playfair Display)

 **Sistema de Autenticación Dual**
- Login local con cifrado Web Crypto API
- Integración Freighter para blockchain
- Importación segura de claves privadas
- Gestión de sesiones persistentes

 **Arquitectura Modular**
- Componentes Vue 3 con Composition API
- Separación clara de responsabilidades
- Estado reactivo con watchers
- Navegación fluida sin recargas

---

## ARTÍCULO 11: FIRMAS DE RATIFICACIÓN DEL POST-PR

Cada miembro reafirma su compromiso con las nuevas responsabilidades surgidas después del Pull Request inicial.

**Director de Proyecto:**  
**Ricardo** – _"Ratifico mi compromiso de mantener el rumbo y la calidad del proyecto. Me aseguraré de que cada milestone se alcance con excelencia técnica."_

**CTO:**  
**Ricardo** – _"Garantizo la continuidad técnica y el crecimiento seguro del sistema. Implementaré las mejores prácticas de arquitectura blockchain y web3."_

**Desarrollador Backend:**  
**Maviel** – _"Confirmo mi responsabilidad en asegurar integración estable y funcionalidad sólida. Mantendré APIs eficientes y seguras."_

**Desarrollador Frontend:**  
**Karen** – _"Reafirmo mi compromiso con interfaces accesibles, rápidas y consistentes. Cada componente será intuitivo y elegante."_

**Diseñador UX/UI:**  
**Maviel** – _"Mantengo mi compromiso con la mejora continua de la experiencia del usuario. El diseño será siempre centrado en el usuario final."_

**Especialista en Herbolaria:**  
**Karen** – _"Ratifico mi compromiso con la precisión del contenido científico y cultural. Cada planta será validada con rigor académico."_

**Director de Marketing:**  
**Maviel** – _"Confirmo mi compromiso con estrategias de difusión y crecimiento continuo. Herbamed será reconocida como líder en su categoría."_

---

## ARTÍCULO 12: MEJORAS TÉCNICAS IMPLEMENTADAS

### 12.1 Funcionalidades Agregadas en esta PR

Esta Pull Request incluye las siguientes mejoras críticas:

#### **Sistema de Modo Global**
- Selección obligatoria de modo (Demo/Blockchain) en login
- Persistencia de modo seleccionado en localStorage
- Router guard que previene acceso sin modo configurado
- Indicador visual de modo actual en navbar con badge
- Status bar mostrando modo y vista actual

#### **Interfaz Adaptativa en Wallet**
- **Modo Demo:** Muestra solo "Ingresar (local)" y "Crear Cuenta"
- **Modo Blockchain:** Muestra solo "Ingresar (Freighter)" e "Importar Clave"
- Confirmación de modo permanece en la pestaña Wallet
- Mensajes de éxito específicos por modo
- Watcher reactivo que actualiza UI al cambiar modo

#### **Mejoras de UX**
- Navegación sin recargas entre pestañas
- Mensajes de estado claros con emojis ( éxito,  error)
- Empty states para vistas sin contenido
- Limpieza automática de mensajes al cambiar contexto
- Validaciones en tiempo real

#### **Mejoras de Seguridad**
- Cifrado de claves privadas con contraseña usando Web Crypto API
- No redirección automática tras login (previene ataques de timing)
- Validación de modo antes de permitir acceso a funcionalidades
- Separación clara entre entorno Demo y Blockchain

### 12.2 Archivos Modificados

```
frontend/vue-project/src/
├── assets/theme.css (480 líneas) - Theme personalizado
├── store/index.js - Vuex con modo global
├── router/index.js - Guard de rutas
├── App.vue - Navbar con indicadores de modo
├── components/
│   └── Login.vue - UI adaptativa por modo
└── views/
    ├── plants/PlantList.vue - Reactivo a cambios de modo
    ├── validators/ValidatorDashboard.vue - Reactivo a cambios
    └── plants/MarketPlace.vue - Reactivo a cambios
```

### 12.3 Tecnologías y Patrones Aplicados

- **Vue 3.3.8:** Composition API con setup, ref, computed, watch
- **Vuex 4.x:** Estado global con persistencia localStorage
- **Vue Router 4.2.5:** Guards de navegación
- **Bootstrap 5.3.2:** Componentes UI personalizados
- **Stellar SDK 14.3.3:** Integración blockchain Soroban
- **Web Crypto API:** Cifrado seguro de claves
- **Vite 7.2.2:** Hot Module Replacement (HMR)

---

## ARTÍCULO 13: PLAN DE CONTINUIDAD

### 13.1 Próximos Pasos Inmediatos

1. **Testing Exhaustivo:**
   - Probar flujo completo Demo: crear cuenta → registrar planta → validar
   - Probar flujo Blockchain: conectar Freighter → listar planta → comprar
   - Validar navegación entre todos los modos y pestañas
   - Verificar persistencia de sesión tras recargar página

2. **Documentación:**
   - Actualizar README con instrucciones de uso de modos
   - Crear guía de usuario para modo Demo vs Blockchain
   - Documentar API de Vuex store
   - Agregar comentarios en funciones críticas

3. **Optimización:**
   - Implementar lazy loading de componentes
   - Optimizar watchers para evitar renders innecesarios
   - Agregar debounce a inputs de búsqueda
   - Comprimir assets y optimizar imágenes

### 13.2 Roadmap Fase 2 (Mes 4-6)

- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat entre usuarios para marketplace
- [ ] Sistema de reputación para vendedores
- [ ] Integración con pasarelas de pago fiat
- [ ] App móvil nativa (React Native)
- [ ] Panel de analytics y métricas
- [ ] Sistema de recomendaciones basado en IA
- [ ] Multilenguaje (español/inglés/náhuatl)

### 13.3 Visión a Largo Plazo

**Meta 2026:**
- 10,000 usuarios registrados
- 500 plantas medicinales catalogadas
- Alianzas con universidades y herbolarios tradicionales
- Reconocimiento por CONACYT o instituciones similares
- Expansión a Centroamérica

---

## ARTÍCULO 14: CLAUSURA Y REAFIRMACIÓN

El equipo de Herbamed declara que este anexo se adjuntará al contrato original como parte integral del compromiso colectivo.

### Retención del Compromiso

La presente extensión permanecerá vigente mientras el proyecto siga activo, y será revisada trimestralmente para ajustes necesarios.

### Revisión Adicional

Se generará un nuevo anexo cuando el proyecto entre en las siguientes fases:
- **Fase "Expansión Nacional"** (estimada Q2 2026)
- **Fase "Internacionalización"** (estimada Q4 2026)
- **Fase "Plataforma Educativa"** (estimada 2027)

### Declaración de Valores

El equipo reafirma los valores fundamentales del proyecto:
-  **Preservación cultural:** Rescatar conocimiento ancestral
-  **Rigor científico:** Validación técnica de toda información
-  **Accesibilidad:** Democratizar el acceso al conocimiento herbolario
-  **Seguridad:** Proteger datos de usuarios y transacciones
- 🌎 **Impacto social:** Contribuir al bienestar de las comunidades

---

## DECLARACIÓN FINAL

**"Seguimos firmes en nuestra misión: preservar, compartir y modernizar la herbolaria mexicana con responsabilidad, respeto y excelencia tecnológica."**

**"Este Pull Request marca un hito en nuestro compromiso con la excelencia técnica y la innovación responsable en tecnología blockchain aplicada al patrimonio cultural."**

---

## CHECKLIST DE ACEPTACIÓN DE ESTE ANEXO

- [ ] Todos los miembros han leído el anexo completo
- [ ] Cada miembro ha ratificado su firma digital mediante aprobación de PR
- [ ] Los nuevos compromisos técnicos han sido comprendidos
- [ ] El roadmap de continuidad ha sido validado colectivamente
- [ ] Las métricas de evaluación son aceptadas por el equipo
- [ ] El código implementado ha sido revisado y probado

**Esta Pull Request formalizará las mejoras técnicas implementadas y renovará nuestro pacto de colaboración.**

**Próxima revisión de compromisos:** Febrero 2026

---

**Hash del Commit:** _[Se generará al hacer merge]_  
**Firmado digitalmente por el equipo Herbamed**  
**27 de Noviembre de 2025**

_"Juntos construimos el futuro de la herbolaria mexicana, un commit a la vez."_

 **#Herbamed #BlockchainConPropósito #HerbolariaMexicana #Web3Cultural**
