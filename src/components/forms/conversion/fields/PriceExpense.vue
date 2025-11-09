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
import FieldNumber from '@/components/forms/fields/FieldNumber.vue'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuRadioItem from '@/components/ui/dropdown-menu/DropdownMenuRadioItem.vue'
import DropdownMenuRadioGroup from '@/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue'

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
