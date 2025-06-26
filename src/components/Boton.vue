<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primario',
    validator: (v) => ['primario', 'secundario', 'terciario'].includes(v)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  },
  disabled: Boolean
});
</script>