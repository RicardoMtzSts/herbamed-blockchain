# ANEXO II – CONTRATO SIMBÓLICO POSTERIOR AL PULL REQUEST

**Fecha de Actualización:** 27/11/2025  
**Pull Request Asociada:** PR-PostCompromiso-Herbamed  
**Repositorio Oficial:** https://github.com/RicardoMtzSts/herbamed-blockchain  
**Branch:** pr/post-compromiso-herbamed

---

## INTRODUCCIÓN

Tras la aprobación formal del Pull Request principal donde se estableció el Contrato Simbólico de Compromiso del Proyecto Herbamed, se genera el presente documento como extensión oficial, para reforzar la continuidad del compromiso del equipo y agregar acuerdos adicionales surgidos después de la revisión técnica y organizativa del proyecto.

---

## ARTÍCULO 7: COMPROMISOS POST-PULL REQUEST

### 7.1 Compromisos de Mantenimiento Continuo

Una vez aceptado el Pull Request inicial, cada miembro se compromete a:

-  Mantener actualizado su entorno de desarrollo con la rama principal
-  Documentar cualquier cambio significativo en el README o Wiki del repositorio
-  Evitar deuda técnica innecesaria y reportarla en caso de generarse
-  Garantizar que cada nuevo feature cuente con pruebas funcionales básicas

### 7.2 Compromisos de Integración Continua

El equipo asume que toda contribución posterior deberá:

-  Pasar validaciones automáticas (lint, build y pruebas unitarias)
-  Ser revisada al menos por un miembro diferente al autor
-  Mantener la integridad y estabilidad de la rama principal
-  Cumplir con los lineamientos de commits semánticos establecidos

---

## ARTÍCULO 8: NUEVAS DIRECTRICES DE DESARROLLO

### 8.1 Accesibilidad y Experiencia de Usuario

Cualquier feature nuevo deberá considerar:

-  **Buen contraste visual**: Paleta verde/cian profesional
- 🧭 **Flujo intuitivo** incluso para usuarios principiantes
- ♿ **Compatibilidad con accesibilidad básica**
- 📱 **Responsividad**: Interfaz adaptable

**Implementado:**
-  Tema personalizado verde/cian
-  Interfaz adaptativa según modo Demo/Blockchain
-  Navegación intuitiva con indicadores de modo
-  Estados vacíos informativos

### 8.2 Seguridad Ampliada

- 🔐 No almacenar datos sensibles sin cifrado
-  Aplicar sanitización a todos los inputs
-  Mantener registros de actividad

**Implementado:**
-  Cifrado AES-GCM para claves privadas
-  Variables de entorno en `.env.local`
-  Validación de modos antes de permitir acceso

### 8.3 Escalabilidad Técnica

-  Incremento progresivo de usuarios (hasta 10,000)
- 🏗️ Arquitectura preparada para microservicios
- 🧩 Modularidad en componentes

**Implementado:**
-  Sistema de modos global con Vuex
-  Arquitectura modular frontend/backend/contracts
-  Router guards para control de acceso

---

## ARTÍCULO 9: PROCESO DE APROBACIÓN DE NUEVOS CAMBIOS

### 9.1 Flujo Estándar de PR

1.  Crear rama con nombre estándar (feat/, fix/, hotfix/, refactor/, docs/)
2.  Descripción clara de cambios
3. 📸 Adjuntar evidencia funcional
4.  Asignar revisores correspondientes
5. ✔️ Resolver observaciones antes del merge

### 9.2 Criterios de Rechazo

Un Pull Request será rechazado si:

-  No cumple los estándares de calidad
-  Introduce vulnerabilidades
-  No respeta el estilo de código
-  Presenta falta de documentación

---

## ARTÍCULO 10: RECONOCIMIENTO DEL PROGRESO COLECTIVO

### 10.1 Celebración de Avances

Cada fase completada será registrada con:

- 🏷️ Un tag oficial (v1.0.0, v1.1.0, etc.)
- 📄 Una nota de versión en CHANGELOG.md
- 🙏 Un agradecimiento en CONTRIBUTORS.md

**Hitos Recientes:**
-  Sistema de autenticación dual (local/Freighter)
-  Interfaz adaptativa por modo
-  Tema personalizado verde/cian
-  Router guards para control de acceso

### 10.2 Métricas y Evaluación de Avance

-  Issues completados por semana: Meta 3-5
- ⏱️ Tiempo promedio de respuesta: < 24 horas
- 🔀 Pull Requests aprobadas: Histórico y tendencia
-  Estabilidad del sistema: 0 critical bugs

**Métricas Actuales (27/11/2025):**
-  PRs completados: 8+
-  Issues resueltos: 15+
-  Uptime del sistema: 99%
-  Tiempo promedio de merge: < 48 horas

---

## ARTÍCULO 11: FIRMAS DE RATIFICACIÓN DEL POST-PR

Cada miembro reafirma su compromiso con las nuevas responsabilidades.

**Director de Proyecto - Ricardo:**  
_"Ratifico mi compromiso de mantener el rumbo y la calidad del proyecto."_

**CTO - Ricardo:**  
_"Garantizo la continuidad técnica y el crecimiento seguro del sistema."_

**Desarrollador Backend - Maviel:**  
_"Confirmo mi responsabilidad en asegurar integración estable y funcionalidad sólida."_

**Desarrollador Frontend - Karen:**  
_"Reafirmo mi compromiso con interfaces accesibles, rápidas y consistentes."_

**Diseñador UX/UI - Maviel:**  
_"Mantengo mi compromiso con la mejora continua de la experiencia del usuario."_

**Especialista en Herbolaria - Karen:**  
_"Ratifico mi compromiso con la precisión del contenido científico y cultural."_

**Director de Marketing - Maviel:**  
_"Confirmo mi compromiso con estrategias de difusión y crecimiento continuo."_

---

## ARTÍCULO 12: CLAUSURA Y REAFIRMACIÓN

### Retención del Compromiso:
La presente extensión permanecerá vigente mientras el proyecto siga activo.

### Revisión Adicional:
Se generará un nuevo anexo cuando el proyecto entre en la fase de "Expansión Nacional" (Q3 2026).

---

## DECLARACIÓN FINAL

> **"Seguimos firmes en nuestra misión: preservar, compartir y modernizar la herbolaria mexicana con responsabilidad, respeto y excelencia tecnológica."**

**Herbamed** es un puente entre el conocimiento ancestral y la innovación moderna.

---

_"La tecnología al servicio de la medicina tradicional mexicana."_

**© 2025 Equipo Herbamed**
