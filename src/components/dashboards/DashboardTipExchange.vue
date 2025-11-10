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
          <template #top> Valor a Pagar em USD </template>

          <template #middle> $8,28 </template>

          <template #bottom> $7,33 + 13% de Gorjeta </template>
        </HeaderInfo>
      </div>

      <div class="col-span-3">
        <HeaderInfo class="h-full">
          <template #top> Valor a Pagar em BRL</template>

          <template #middle> R$43,03 </template>

          <template #bottom> $1 USD = 5,358 BRL </template>
        </HeaderInfo>
      </div>

      <div class="col-span-6">
        <HeaderInfo>
          <template #top> Gorjeta em usd </template>

          <template #middle> $0,95 </template>

          <template #bottom>
            <div class="flex items-center w-full space-x-2">
              <div class="text-xs text-ice">10%</div>

              <Progress :model-value="33" />

              <div class="text-xs text-ice">20%</div>
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
              <span class="font-bold text-regular text-blue">($73,23) + $9,52</span>
              (13% de gorjeta) =
            </li>

            <li>
              Conta do grupo com gorjeta
              <span class="font-bold text-regular text-blue">($82,73) dividido por 10</span>
              pessoas =
            </li>

            <li>
              Conta individual final

              <span class="font-bold text-regular text-blue">($8,28)</span>

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
import { ref } from 'vue'

const tab = ref('0')

const data = [
  {
    name: 'Conta',
    total: 7.33,
  },
  {
    name: 'Gorjeta',
    total: 0.95,
  },
]

function valueFormatter(tick: number | Date) {
  return typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''
  // return typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}` : ''
}

function handleCopyLink() {
  const currentLocation = window.location.href
  console.log(currentLocation)

  toast.success('Link copiado com sucesso!', {
    description:
      'O link para compartilhar esta conta já está na sua área de transferência. Basta colar (Ctrl + V ou toque em “colar”) onde quiser.',
    duration: 6000,
  })
}
</script>

<style lang="scss" scoped>
// TODO
// DEIXAR MAIS GORDO ESSE CHART, TA MUITO MAGRO
:deep(.tremor-DonutChart path) {
  stroke-width: 24px !important;
}
</style>
