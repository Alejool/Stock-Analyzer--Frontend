# Stock Analyzer Frontend

Un dashboard minimalista para análisis de inversiones construido con Vue 3, Tailwind CSS y una arquitectura de componentes modular. Esta aplicación frontend proporciona una interfaz intuitiva para visualizar recomendaciones de acciones, análisis y datos del mercado.

## 🚀 Características

- **Diseño Minimalista**: Interfaz limpia y moderna con Tailwind CSS
- **Arquitectura Modular**: Componentes reutilizables y bien organizados
- **Responsive**: Diseño adaptable a diferentes dispositivos
- **Performance**: Optimizado para carga rápida
- **Gestión de Estado**: Estado centralizado con stores de Pinia
- **Datos en Tiempo Real**: Datos dinámicos de acciones y recomendaciones

## 🛠️ Tecnologías Utilizadas

### Framework Principal
- **Vue 3**: Framework JavaScript progresivo con Composition API
- **Vite**: Herramienta de build rápida y servidor de desarrollo

### Estilos y UI
- **Tailwind CSS**: Framework CSS utility-first

### Gestión de Estado y Enrutamiento
- **Pinia**: Librería de store para Vue para gestión de estado
- **Vue Router**: Router oficial para aplicaciones Vue.js

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── CardMetric.vue           # Tarjeta para mostrar métricas
│   ├── CardStock.vue            # Tarjeta de información de acciones
│   ├── SectionSubHeader.vue     # Componente de encabezado de sección
│   └── shared/                  # Componentes compartidos
├── views/
│   ├── Analytics.vue            # Vista del dashboard de análisis
│   └── Dashboard.vue            # Vista principal del dashboard
├── stores/
│   ├── analytics.ts             # Store de datos de análisis
│   ├── stockStore.ts            # Gestión de datos de acciones
│   └── stockStoreDetail.ts      # Información detallada de acciones
├── router/
│   └── index.ts                 # Configuración de enrutamiento
├── services/
│   └── api.ts                   # Comunicación con API
├── types/
│   └── index.ts                 # Definiciones de tipos
├── assets/                      # Assets estáticos y estilos
├── App.vue                      # Componente raíz
├── main.ts                      # Punto de entrada
└── style.css                    # Estilos globales
```

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📊 Componentes Principales

### CardMetric
Componente reutilizable para mostrar indicadores clave de rendimiento y métricas con estilos personalizables.

### CardStock
Tarjeta de información individual de acciones que muestra ticker, nombre de empresa, score, precio objetivo y rating.

### SectionSubHeader
Componente de encabezado consistente usado en diferentes secciones de la aplicación.

## 🗄️ Vistas Implementadas

### Dashboard
Vista principal de la aplicación que incluye:
- Recomendaciones destacadas
- Grid de mejores acciones
- Métricas en tiempo real
- Filtrado interactivo

### Analytics
Dashboard de análisis comprensivo con:
- Capacidades de filtrado avanzado
- Vistas específicas por brokerage
- Visualización de métricas
- Análisis de datos históricos

## 🎨 Sistema de Diseño

- **Paleta de Colores**: Gradientes profesionales de azul e índigo
- **Tipografía**: Sistema de fuentes nativo optimizado
- **Espaciado**: Sistema consistente de Tailwind CSS
- **Animaciones**: Transiciones suaves para UX mejorada
- **Responsive**: Diseño mobile-first

## 🔧 Gestión de Estado

### Analytics Store
- Gestión de datos de análisis y filtros
- Manejo de estados de carga y errores
- Filtros reactivos por brokerage

### Stock Store
- Gestión central de datos de acciones
- Integración con API para datos en tiempo real
- Caching y optimización de rendimiento

### Stock Detail Store
- Gestión de información detallada de acciones
- Datos de análisis individual

## 📈 Características de Rendimiento

- Optimización de Componentes con Vue 3 Composition API
- Code Splitting basado en rutas
- Optimización de Assets con Vite
- Cobertura completa de testing

## 📝 Licencia

MIT License