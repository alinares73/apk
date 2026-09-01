# 📱 Plan de Migración: PWA → App Móvil Nativa
**Proyecto:** Comedor Ciudadela | **Fecha:** 2026-08-31

---

## 📊 ANÁLISIS DEL CÓDIGO ACTUAL

### Fortalezas ✅
1. **PWA bien estructurada**: Manifest válido, mode="standalone", theme-color configurado
2. **Diseño responsive**: Tailwind CSS con breakpoints para móvil/tablet/desktop
3. **Offline-first**: LocalStorage para caché de datos y cambios pendientes
4. **Interfaz UX**: Animaciones suaves, scroll-snap, accesibilidad táctil optimizada
5. **Integración backend**: Google Apps Script como API

### Limitaciones 🚫
1. **No tiene service worker** (crítico para PWA real)
2. **Código monolítico**: Todo en un archivo HTML + script inline
3. **Sin gestión de estado**: Uso directo del DOM para datos
4. **Sin modularidad**: Difícil mantenimiento y escalabilidad
5. **Performance**: CDN de Tailwind en cada carga
6. **No tiene icono de app**: `icono.png` referenciado pero sin optimización

### Stack Tecnológico Actual
- **Frontend:** Vanilla JS, Tailwind CSS, HTML5
- **Backend:** Google Apps Script (REST API)
- **Base de datos:** Google Sheets
- **Storage:** LocalStorage (caché)
- **Packaging:** PWA (web manifest)

---

## 🏗️ ARQUITECTURA RECOMENDADA PARA APP MÓVIL

### Opción 1: React Native (⭐ RECOMENDADO)
**Por qué:** Código compartido iOS/Android, desarrollo rápido, comunidad grande
```
react-native
├── src/
│   ├── screens/
│   │   ├── MainScreen.tsx
│   │   ├── AbsencesScreen.tsx
│   │   └── DetailsScreen.tsx
│   ├── components/
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── redux o Zustand
│   └── assets/
├── app.json
└── package.json
```
- **Ventajas:** Hot reload, código compartido, acceso a APIs nativas
- **Desventajas:** Curva aprendizaje, tamaño de app (~100MB)
- **Tiempo estimado:** 2-3 semanas

### Opción 2: Flutter
**Por qué:** Performance superior, Material Design nativo
- **Ventajas:** Muy rápido, código limpio, compilación AOT
- **Desventajas:** Aprender Dart, menos librerías de terceros
- **Tiempo estimado:** 3-4 semanas

### Opción 3: Ionic + Angular/React
**Por qué:** Extensión natural de tu PWA (capacitor)
- **Ventajas:** Reutiliza componentes web, fácil transición
- **Desventajas:** Menos nativo, performance moderada
- **Tiempo estimado:** 2 semanas

### Opción 4: Kotlin + Swift (Nativo puro)
**Por qué:** Máxima performance
- **Desventajas:** Duplicar código, doble mantenimiento
- **Tiempo estimado:** 6-8 semanas

---

## 🎯 RECOMENDACIÓN FINAL: React Native + TypeScript

### Por qué esta combinación:
1. ✅ Compartir lógica iOS/Android
2. ✅ Mejor performance que PWA
3. ✅ Acceso a APIs nativas (cámara, notificaciones, storage)
4. ✅ EAS Build (compilación en la nube)
5. ✅ Fácil distribución en App Store/Play Store

### Arquitectura propuesta:
```
comedor-app/
├── app.json                    # Config Expo
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Pantalla principal
│   │   ├── absences.tsx       # Gestión ausencias
│   │   └── reports.tsx        # Reportes
│   ├── _layout.tsx            # Navegación
│   └── modal.tsx              # Modales
├── components/
│   ├── MealCard.tsx           # Card de servicio
│   ├── DayCarousel.tsx        # Carrusel días
│   └── AttendanceList.tsx     # Lista asistentes
├── services/
│   ├── api.ts                 # Llamadas Google Apps Script
│   ├── storage.ts             # AsyncStorage
│   └── sync.ts                # Sincronización offline
├── store/
│   └── appStore.ts            # Zustand o Redux
├── types/
│   └── index.ts               # TypeScript interfaces
└── assets/
    └── icons/                 # Iconos app
```

---

## 🚀 PRIMER PASO: Crear estructura React Native con Expo

### Herramientas necesarias:
- **Node.js** v18+ (ya debes tenerlo)
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI**: `npm install -g eas-cli`
- **Cuenta Expo:** https://expo.dev

### Comando a ejecutar:
```bash
npx create-expo-app comedor-ciudadela
cd comedor-ciudadela
npm install expo-router @react-navigation/native zustand axios
```

---

## 📋 PLAN PASO A PASO (4 SEMANAS)

### **Semana 1: Configuración y UI base**
- [ ] Crear proyecto Expo
- [ ] Instalar dependencias
- [ ] Reproducir UI con React Native Paper
- [ ] Implementar navegación bottom tabs

### **Semana 2: Lógica de datos**
- [ ] Conectar API Google Apps Script
- [ ] Implementar Zustand store
- [ ] Caché con AsyncStorage
- [ ] Sincronización offline/online

### **Semana 3: Funcionalidades**
- [ ] Selección de fechas (carrusel)
- [ ] Modal de estados
- [ ] Gestión de ausencias
- [ ] Observaciones dinámicas

### **Semana 4: Polish y distribución**
- [ ] Notificaciones push
- [ ] Testing
- [ ] Build para iOS/Android
- [ ] Deploy a App Store/Play Store

---

## 💾 MIGRACIÓN DE DATOS

1. **Mantener Google Apps Script** como backend
2. **Consumir misma API** desde React Native
3. **Usar AsyncStorage** en lugar de localStorage
4. **Adaptar formatos** de respuesta si es necesario

---

## 📱 DIFERENCIAS PWA vs App Nativa

| Aspecto | PWA Actual | App Nativa (React Native) |
|---------|-----------|---------------------------|
| Performance | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Distribución | Web | App Store + Play Store |
| Acceso a APIs | Limitado | Completo (cámara, sensores, etc.) |
| Notificaciones | Básicas | Avanzadas con contexto |
| Tamaño app | < 1 MB | ~100 MB |
| Desarrollo | Rápido | Moderado |
| Instalación | Sin fricción | 1 tap en tienda |

---

## ✅ SIGUIENTES ACCIONES INMEDIATAS

1. **Instalar Node.js y Expo CLI**
2. **Crear proyecto React Native**
3. **Reproducir estructura UI actual**
4. **Conectar API existente**
5. **Pruebas en simulador iOS/Android**

---

*Recomendación: Comenzar con React Native + Expo. Es la opción más equilibrada entre rapidez y calidad final.*
