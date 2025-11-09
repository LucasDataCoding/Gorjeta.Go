<template>
  <div
    class="rounded-xl"
    :class="{
      'bg-white': isThemeLight,
      'bg-gray': !isThemeLight,
      'p-12': size === 'sm',
      'p-5': size === 'xs',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isThemeLight: Boolean,
  size: {
    type: String,
    default: 'sm',
  },
})
</script>
