<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="uppercase w-full px-5">
      {{ currentExchange.sufix }}
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>Cotações</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup v-model="currentExchangeValue">
        <DropdownMenuRadioItem
          v-for="coin in coins"
          :key="coin.prefix + coin.sufix"
          class="uppercase"
          :value="coin.value"
        >
          {{ coin.prefix }} {{ coin.sufix }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuRadioItem from '@/components/ui/dropdown-menu/DropdownMenuRadioItem.vue'
import DropdownMenuRadioGroup from '@/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue'
import { computed, Ref, ref, watch, type ComputedRef } from 'vue'
import type { ICoinLabels } from '@/types/fields'
import { coins } from '@/constants/exchangeRate'

const props = defineProps({
  modelValue: String,
})

const currentExchangeValue: Ref<string> = ref(props.modelValue || '')
const currentExchange: ComputedRef<ICoinLabels> = computed(
  () => coins.find((c) => c.value === currentExchangeValue.value) || (coins[0] as ICoinLabels)
)

const emits = defineEmits(['update:modelValue'])
watch(
  currentExchangeValue,
  () => {
    emits('update:modelValue', currentExchange.value)
  },
  { immediate: true }
)
</script>
