<template>
  <Tabs v-model="tab" default-value="0">
    <TabsList>
      <TabsTrigger value="0" class="text-ice"> conta individual </TabsTrigger>
      <TabsTrigger value="1" class="text-ice"> conta do grupo </TabsTrigger>
    </TabsList>
  </Tabs>

  <div class="space-y-8">
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-5 mt-5">
      <div class="col-span-3">
        <HeaderInfo class="h-full">
          <template #top> Valor a Pagar em {{ exchangeSufix }} </template>

          <template #middle>{{ exchangePrefix }}{{ formatMoneyVisual(expenseTotal) }} </template>

          <template #bottom
            >{{ exchangePrefix
            }}{{ formatMoneyVisual(tipCalculatorForm.calculations[accountType].expenseValue) }} +
            {{ tipCalculatorForm.fieldsParameters.tipPercentage }}% de Gorjeta
          </template>
        </HeaderInfo>
      </div>

      <div class="col-span-3">
        <HeaderInfo class="h-full">
          <template #top> Valor a Pagar em BRL</template>

          <template #middle>
            R${{ formatMoneyVisual(currentExchangeRateValue.expenseInBrl.value) }}
          </template>

          <template #bottom
            >{{ exchangePrefix }}1 {{ exchangeSufix.toUpperCase() }} =
            {{ formatMoneyVisual(currentExchangeRateValue.currentExchangeRateValue.value || 0) }}
            BRL
          </template>
        </HeaderInfo>
      </div>

      <div class="col-span-6">
        <HeaderInfo class="h-full">
          <template #top>
            Gorjeta em
            {{ tipCalculatorForm.fieldsParameters.exchangeRate?.sufix }}
          </template>

          <template #middle
            >{{ exchangePrefix
            }}{{
              formatMoneyVisual(tipCalculatorForm.calculations[accountType].expenseTip)
            }}</template
          >

          <template #bottom>
            <div class="flex items-center w-full space-x-2">
              <div class="text-xs text-ice">{{ minTipPercentage }}%</div>

              <Progress :model-value="tipPercentage" />

              <div class="text-xs text-ice">{{ maxTipPercentage }}%</div>
            </div>
          </template>
        </HeaderInfo>
      </div>
    </div>

    <MainSection>
      <template #title> como foi calculado? </template>

      <template #content>
        <div class="lg:grid lg:grid-cols-12 lg:gap-5 space-y-10 lg:space-y-0 items-center">
          <ol
            class="col-span-7 list-decimal list-outside mt-5 lg:mt-0 ml-4 space-y-3 lg:space-y-4 font-semibold text-base lg:py-5"
          >
            <li>
              Conta do grupo
              <span class="font-bold text-regular text-blue"
                >{{ exchangePrefix
                }}{{ formatMoneyVisual(tipCalculatorForm.fieldsParameters.expenseValue) }} +
                {{ tipCalculatorForm.fieldsParameters.exchangeRate?.prefix
                }}{{ formatMoneyVisual(tipCalculatorForm.calculations.group.expenseTip) }}</span
              >
              ({{ formatMoneyVisual(tipCalculatorForm.fieldsParameters.tipPercentage) }}% de
              gorjeta) =
            </li>

            <li>
              Conta do grupo com gorjeta
              <span class="font-bold text-regular text-blue"
                >{{ exchangePrefix
                }}{{
                  formatMoneyVisual(tipCalculatorForm.calculations.group.expenseTotal)
                }}
                dividido por {{ tipCalculatorForm.fieldsParameters.peoplePaying }}</span
              >
              pessoas =
            </li>

            <li>
              Conta individual final

              <span class="font-bold text-regular text-blue"
                >{{ exchangePrefix
                }}{{
                  formatMoneyVisual(tipCalculatorForm.calculations.individual.expenseTotal)
                }}</span
              >

              <TooltipBasic>
                <template #trigger>
                  <span
                    class="ms-3 border-2 border-solid rounded-full w-[25px] h-[25px] inline-flex items-center justify-center"
                  >
                    <FontAwesomeIcon class="text-xs" icon="fa-solid fa-info" />
                  </span>
                </template>

                <template #content>
                  <p>Valor arrendodado por 2 casas decimais (sempre para cima)</p>
                </template>
              </TooltipBasic>
            </li>
          </ol>

          <div class="col-span-5 flex items-center h-full">
            <DonutChart
              index="name"
              :category="'total'"
              :data="data"
              :value-formatter="valueFormatter"
              :colors="['var(--color-purple)', 'var(--color-purple-100)']"
            />
          </div>

          <div class="col-span-12 mx-auto flex items-center justify-center mt-10 mb-5">
            <button
              @click="handleCopyLink"
              class="bg-purple hover:bg-purple-700 text-white uppercase font-bold py-4 w-full flex items-center justify-center lg:px-25 mx-auto rounded cursor-pointer transition space-x-3 flex items-center"
            >
              <FontAwesomeIcon class="text-lg" icon="fa-regular fa-clone" />
              <span> Copiar link da conta </span>
            </button>
          </div>
        </div>
      </template>
    </MainSection>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardContent from '../CardContent.vue'
import HeaderInfo from '../ui/card/HeaderInfo.vue'
import Progress from '../ui/progress/Progress.vue'
import MainSection from '../../layout/MainSection.vue'
import { DonutChart } from '@/components/ui/chart-donut'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { toast } from 'vue-sonner'
import { computed, ref } from 'vue'
import { useTipCalculatorForm } from '@/stores/tipCalculatorForm'
import { maxTipPercentage, minTipPercentage } from '@/constants/tipValues'
import { useCurrentExchangeRateValues } from '@/composables/exchangeRate'
import { formatMoneyVisual } from '@/helpers/money'
import TooltipBasic from '../ui/tooltip/TooltipBasic.vue'

const tab = ref('0')

const accountType = computed(() => (+tab.value ? 'group' : 'individual'))

const tipCalculatorForm = useTipCalculatorForm()
const expenseTotal = computed(() => tipCalculatorForm.calculations[accountType.value].expenseTotal)
const currentExchanteRate = computed(() => tipCalculatorForm.fieldsParameters.exchangeRate)
const exchangePrefix = computed(() => currentExchanteRate.value?.prefix)
const exchangeSufix = computed(() => currentExchanteRate.value?.sufix)
const tipPercentage = computed(
  () =>
    ((tipCalculatorForm.fieldsParameters.tipPercentage - minTipPercentage) /
      (maxTipPercentage - minTipPercentage)) *
    100
)

const data = computed(() => [
  {
    name: 'Conta',
    total: tipCalculatorForm.calculations[accountType.value].expenseValue,
  },
  {
    name: 'Gorjeta',
    total: tipCalculatorForm.calculations[accountType.value].expenseTip,
  },
])

function valueFormatter(tick: number | Date) {
  return `${exchangePrefix.value} ${tick}`
}

const currentExchangeRateValue = useCurrentExchangeRateValues(currentExchanteRate, expenseTotal)

function handleCopyLink() {
  const url = window.location.href

  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success('Link copiado com sucesso!', {
        description:
          'O link para compartilhar esta conta já está na sua área de transferência. Basta colar (Ctrl + V ou toque em “colar”) onde quiser.',
        duration: 6000,
      })
    })
    .catch(() => {
      toast.error('Oh oh...', {
        description:
          'Ocorreu um erro ao tentar copiar a URL do seu navegador. Por favor, copie manualmente e envie aos seus amigos para que eles possam ver a conta.',
        duration: 6000,
      })
    })
}
</script>
