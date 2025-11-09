<template>
  <FieldNumber label="valor da conta" input-name="valor-conta">
    <template #prefix>
      {{ currentExchange.prefix }}
    </template>
    <template #sufix>
      <DropdownMenu>
        <DropdownMenuTrigger class="uppercase w-full">
          {{ currentExchange.sufix }}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Cotações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup v-model="currentExchange">
            <DropdownMenuRadioItem
              v-for="coin in coins"
              :key="coin.prefix + coin.sufix"
              class="uppercase"
              :value="coin"
            >
              {{ coin.prefix }} {{ coin.sufix }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
  </FieldNumber>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import FieldNumber from './FieldNumber.vue'
import DropdownMenu from '../ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '../ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '../ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '../ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '../ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuRadioItem from '../ui/dropdown-menu/DropdownMenuRadioItem.vue'
import DropdownMenuRadioGroup from '../ui/dropdown-menu/DropdownMenuRadioGroup.vue'

interface ICoinLabels {
  prefix: string
  sufix: string
}

const coins: ICoinLabels[] = [
  {
    prefix: '$',
    sufix: 'usd',
  },
  {
    prefix: '€',
    sufix: 'eur',
  },
]

const currentExchange: Ref<ICoinLabels> = ref(coins[0])
</script>
