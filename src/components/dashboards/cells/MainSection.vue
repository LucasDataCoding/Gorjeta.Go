<template>
  <CardContent is-theme-light size="xs" class="p-5 space-y-1">
    <div class="font-bold text-lg uppercase">
      <slot name="title" />
    </div>

    <div class="text-xs text-ice">
      <slot name="content" />
    </div>
  </CardContent>
</template>

<script lang="ts" setup>
import CardContent from '@/components/CardContent.vue'
</script>
