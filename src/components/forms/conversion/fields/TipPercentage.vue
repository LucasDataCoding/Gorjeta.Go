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
    <template #sufix>%</template>
  </FieldNumber>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import FieldNumber from '@/components/forms/fields/FieldNumber.vue'
</script>
