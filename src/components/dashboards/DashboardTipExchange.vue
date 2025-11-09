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
      <div class="grid grid-cols-12 gap-10 mt-5">
        <div class="col-span-3">
          <CardContent is-theme-light size="xs" class="p-5"> a </CardContent>
        </div>

        <div class="col-span-3">
          <CardContent is-theme-light size="xs" class="p-5"> b </CardContent>
        </div>

        <div class="col-span-6">
          <CardContent is-theme-light size="xs" class="p-5"> c </CardContent>
        </div>
      </div>
    </TabsContent>

    <TabsContent value="group"> Dashboard de conta do grupo aqui </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardContent from '../CardContent.vue'
</script>
