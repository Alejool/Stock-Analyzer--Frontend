# Investment Dashboard - Vue 3

Un dashboard minimalista para análisis de inversiones construido con Vue 3, Tailwind CSS y una arquitectura de componentes modular.

## 🚀 Características

- **Diseño Minimalista**: Interfaz limpia y moderna con Tailwind CSS
- **Arquitectura Modular**: Componentes reutilizables y bien organizados
- **Testing Completo**: Suite de tests unitarios con Vitest
- **Responsive**: Diseño adaptable a diferentes dispositivos
- **Performance**: Optimizado para carga rápida

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── HeroSection.vue          # Sección principal del dashboard
│   ├── FeaturedRecommendation.vue # Recomendación destacada
│   ├── MetricCard.vue           # Tarjeta de métricas reutilizable
│   ├── TopStocks.vue            # Lista de mejores acciones
│   ├── StockCard.vue            # Tarjeta individual de acción
│   ├── RatingBadge.vue          # Badge de calificación
│   └── AnalyticsSection.vue     # Sección de análisis
├── views/
│   └── Dashboard.vue            # Vista principal refactorizada
├── stores/
│   └── stockStore.js            # Store de Pinia para datos
└── tests/
    ├── components/              # Tests de componentes
    ├── views/                   # Tests de vistas
    └── setup.js                 # Configuración de tests
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests una sola vez
npm run test:run

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage
```

## 📊 Componentes

### HeroSection
Sección principal del dashboard con título, subtítulo, botones de acción y recomendación destacada.

### FeaturedRecommendation
Muestra la recomendación principal con métricas clave como score AI, precio objetivo y nivel de confianza.

### MetricCard
Componente reutilizable para mostrar métricas con valor, etiqueta y color personalizable.

### TopStocks
Lista las mejores acciones en formato de grid con tarjetas individuales.

### StockCard
Tarjeta individual que muestra información de una acción: ticker, empresa, score, precio objetivo y rating.

### RatingBadge
Badge que muestra la calificación (BUY, HOLD, SELL) con colores apropiados.

### AnalyticsSection
Sección de análisis con métricas del mercado y botones de acción.

## 🎨 Diseño

- **Paleta de colores**: Gradientes de azul y índigo para un look profesional
- **Tipografía**: Sistema de fuentes nativo optimizado
- **Espaciado**: Sistema consistente basado en Tailwind CSS
- **Animaciones**: Transiciones suaves para mejor UX

## 🔧 Tecnologías

- **Vue 3**: Framework principal con Composition API
- **Tailwind CSS**: Framework de CSS utilitario
- **Pinia**: Gestión de estado
- **Vue Router**: Enrutamiento
- **Vitest**: Framework de testing
- **Vue Test Utils**: Utilidades para testing de componentes Vue

## 📈 Mejoras Implementadas

1. **Separación de responsabilidades**: Cada componente tiene una función específica
2. **Reutilización**: Componentes como MetricCard y RatingBadge son altamente reutilizables
3. **Mantenibilidad**: Código más limpio y fácil de mantener
4. **Testing**: Cobertura completa de tests unitarios
5. **Performance**: Componentes optimizados para renderizado eficiente

## 🚀 Próximos Pasos

- [ ] Implementar lazy loading para componentes
- [ ] Añadir animaciones más avanzadas
- [ ] Implementar modo oscuro
- [ ] Añadir tests de integración
- [ ] Optimizar para PWA

## 📝 Licencia

MIT License
