<script setup lang="ts">
import CardContent from '@/components/CardContent.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 space-y-5 lg:space-y-0 lg:gap-10">
    <!-- TODO ADICIONAR CONTEUDO PRINCIPAL
    COMEÇAR PELO FORMULARIO
    FOCAR EM FAZER DESKTOP VERSAO PRIMEIRO
    DEPOIS FAZ DASHBOARD
    DEPOIS DE TUDO PRONTO ORGANIZA A ESTRUTURA DO PROJETO
    DEPOIS FAZ MOBILE -->
    <CardContent class="col-span-5 flex items-center justify-center px-5 lg:px-10">
      <slot name="form" />
    </CardContent>

    <CardContent class="col-span-7">
      <slot name="dashboard" />
    </CardContent>
  </div>
</template>

