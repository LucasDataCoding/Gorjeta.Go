<template>
  <CardContent is-theme-light size="xs" class="p-5 space-y-1">
    <div class="uppercase text-xs text-ice">
      <slot name="top" />
    </div>
    <div class="font-bold text-lg">
      <slot name="middle" />
    </div>
    <div class="uppercase text-xs text-ice">
      <TooltipBasic is-full>
        <template #trigger>
          <div class="text-start line-clamp-1">
            <slot name="bottom" />
          </div>
        </template>

        <template #content>
          <slot name="bottom" />
        </template>
      </TooltipBasic>
    </div>
  </CardContent>
</template>

<script lang="ts" setup>
import CardContent from '@/components/CardContent.vue'
import TooltipBasic from '@/components/ui/tooltip/TooltipBasic.vue'
</script>
