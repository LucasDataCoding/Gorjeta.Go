<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'reka-ui'
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    data-slot="dropdown-menu-trigger"
    v-bind="forwardedProps"
    class="dropdown_menu_trigger w-full h-full cursor-pointer"
  >
    <slot />
    <FontAwesomeIcon
      class="dropdown_menu_trigger_arrow ms-2 transition-all"
      icon="fa-solid fa-chevron-down"
    />
  </DropdownMenuTrigger>
</template>

<style lang="scss" scoped>
.dropdown_menu_trigger {
  &[aria-expanded='true'] .dropdown_menu_trigger_arrow {
    transform: rotate(180deg);
  }
}
</style>
