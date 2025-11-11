<template>
  <Tabs v-model="tab" default-value="0">
    <TabsList>
      <TabsTrigger value="0" class="text-ice"> conta individual </TabsTrigger>
      <TabsTrigger value="1" class="text-ice"> conta do grupo </TabsTrigger>
    </TabsList>

    <!-- todo
    1. componentizar mini cards do dashboard
    2. criar explicação do calculo
    3. criar chart de donut conta individual
    4. componetizar seção com explicação do calculo com chart,
    Colocar botão de copiar
    -->
    <!-- <TabsContent value="0" class="space-y-8"> </TabsContent>

    <TabsContent value="1"> Dashboard de conta do grupo aqui </TabsContent> -->
  </Tabs>

  <div class="space-y-8">
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-5 mt-5">
      <div class="col-span-3">
        <HeaderInfo>
          <template #top> Valor a Pagar em {{ exchangeSufix }} </template>

          <template #middle
            >{{ exchangePrefix }}{{ tipCalculatorForm.calculations[accountType].expenseTotal }}
          </template>

          <template #bottom
            >{{ exchangePrefix }}{{ tipCalculatorForm.calculations[accountType].expenseValue }} +
            {{ tipCalculatorForm.fieldsParameters.tipPercentage }}% de Gorjeta
          </template>
        </HeaderInfo>
      </div>

      <div class="col-span-3">
        <HeaderInfo class="h-full">
          <template #top> Valor a Pagar em BRL</template>

          <template #middle> R$43,03 </template>

          <template #bottom>{{ exchangePrefix }}1 {{ exchangeSufix }} = 5,358 BRL </template>
        </HeaderInfo>
      </div>

      <div class="col-span-6">
        <HeaderInfo>
          <template #top>
            Gorjeta em {{ tipCalculatorForm.fieldsParameters.exchangeRate?.sufix }}
          </template>

          <template #middle
            >{{ exchangePrefix
            }}{{ tipCalculatorForm.calculations[accountType].expenseTip }}</template
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
                >({{ exchangePrefix }}{{ tipCalculatorForm.fieldsParameters.expenseValue }}) +{{
                  tipCalculatorForm.fieldsParameters.exchangeRate?.prefix
                }}{{ tipCalculatorForm.calculations.group.expenseTip }}</span
              >
              ({{ tipCalculatorForm.fieldsParameters.tipPercentage }}% de gorjeta) =
            </li>

            <li>
              Conta do grupo com gorjeta
              <span class="font-bold text-regular text-blue"
                >({{ exchangePrefix }}{{ tipCalculatorForm.calculations.group.expenseTotal }})
                dividido por {{ tipCalculatorForm.fieldsParameters.peoplePaying }}</span
              >
              pessoas =
            </li>

            <li>
              Conta individual final

              <span class="font-bold text-regular text-blue"
                >({{ exchangePrefix
                }}{{ tipCalculatorForm.calculations.individual.expenseTotal }})</span
              >

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span
                      class="ms-3 border-2 border-solid rounded-full w-[25px] h-[25px] inline-flex items-center justify-center"
                    >
                      <FontAwesomeIcon class="text-xs" icon="fa-solid fa-info" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Valor arrendodado por 2 casas decimais (sempre para cima)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import CardContent from '../CardContent.vue'
import HeaderInfo from './cells/HeaderInfo.vue'
import Progress from '../ui/progress/Progress.vue'
import MainSection from './cells/MainSection.vue'
import { DonutChart } from '@/components/ui/chart-donut'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { toast } from 'vue-sonner'
import { computed, ref } from 'vue'
import { useTipCalculatorForm } from '@/stores/tipCalculatorForm'
import { maxTipPercentage, minTipPercentage } from '@/constants/tipValues'

const tipCalculatorForm = useTipCalculatorForm()

const exchangePrefix = computed(() => tipCalculatorForm.fieldsParameters.exchangeRate?.prefix)
const exchangeSufix = computed(() => tipCalculatorForm.fieldsParameters.exchangeRate?.sufix)
const tipPercentage = computed(
  () =>
    ((tipCalculatorForm.fieldsParameters.tipPercentage - minTipPercentage) /
      (maxTipPercentage - minTipPercentage)) *
    100
)

const tab = ref('0')

const accountType = computed(() => (+tab.value ? 'group' : 'individual'))

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

function handleCopyLink() {
  const url = window.location.href

  // Usa a API moderna de clipboard (suportada na maioria dos navegadores)
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
