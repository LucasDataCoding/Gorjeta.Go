<template>
  <TooltipProvider class="text-start w-full">
    <Tooltip>
      <TooltipTrigger :class="{ 'w-full': isFull }">
        <slot name="trigger" />
      </TooltipTrigger>

      <TooltipContent>
        <slot name="content" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

defineProps({
  isFull: Boolean,
})
</script>
