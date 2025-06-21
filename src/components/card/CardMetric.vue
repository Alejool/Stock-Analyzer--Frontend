<template>
  <div
    :class="[
      'relative rounded-xl p-6 text-center border  hover:shadow-lg transition-all duration-300',
      backgroundClass,
      borderClass,
    ]"
  >
    <div
      class="absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse"
      :class="pulseColor"
    ></div>

    <!-- Icono -->
    <div
      :class="[
        'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg',
        iconBgClass,
      ]"
    >
      <span class="text-white text-2xl">{{ icon }}</span>
    </div>

    <div class="text-3xl font-bold text-gray-800 mb-2">
      {{
        typeof value === "string" &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value).toLocaleDateString()
          : value
      }}
    </div>

    <!-- Descripción -->
    <div class="text-sm font-medium text-gray-600">{{ title }}</div>

    <!-- Detalles adicionales -->
    <div v-if="extraInfo" class="text-xs mt-1" :class="extraInfoColor">
      {{ extraInfo }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MetricCard",
  props: {
    title: {
      type: String,
      default: "-",
    },
    value: {
      type: [String, Number],
      default: "-",
    },
    icon: {   
      type: String,
      default: "📊", 
    },
    backgroundColor: {
      type: String,
      default: "from-blue-100 to-blue-200", 
    },
    iconBackground: {
      type: String,
      default: "from-blue-400 to-blue-600",
    },
    extraInfo: {
      type: String,
      default: "",
    },
    extraInfoColor: {
      type: String,
      default: "text-gray-600",
    },
    pulseColor: {
      type: String,
      default: "bg-green-400",
    },
    borderColor: {
      type: String,
      default: "border-gray-100",
    },
  },
  computed: {
    backgroundClass() {
      return `bg-gradient-to-br ${this.backgroundColor}`;
    },
    borderClass() {
      return `border ${this.borderColor}`;
    },
    iconBgClass() {
      return `bg-gradient-to-r ${this.iconBackground}`;
    },
  },
};

</script>
