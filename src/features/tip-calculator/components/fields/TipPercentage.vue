<template>
  <FieldNumber
    is-horizontal
    is-lable-secondary
    label="ou especifique"
    input-name="valor-porcentagem"
    :min="10"
    :max="20"
  >
    <template #prefix></template>
    <template #sufix>
      <span class="px-5 pointer-events-none">%</span>
    </template>
  </FieldNumber>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import FieldNumber from '@/components/fields/FieldNumber.vue'
</script>
