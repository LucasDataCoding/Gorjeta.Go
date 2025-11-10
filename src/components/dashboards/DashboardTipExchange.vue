<template>
  <Tabs default-value="individual">
    <TabsList>
      <TabsTrigger value="individual"> conta individual </TabsTrigger>
      <TabsTrigger value="group"> conta do grupo </TabsTrigger>
    </TabsList>

    <!-- todo
    1. componentizar mini cards do dashboard
    2. criar explicação do calculo
    3. criar chart de donut conta individual
    4. componetizar seção com explicação do calculo com chart,
    Colocar botão de copiar
    -->
    <TabsContent value="individual">
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
    </TabsContent>

    <TabsContent value="group"> Dashboard de conta do grupo aqui </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardContent from '../CardContent.vue'
import HeaderInfo from './cells/HeaderInfo.vue'
import Progress from '../ui/progress/Progress.vue'
</script>
