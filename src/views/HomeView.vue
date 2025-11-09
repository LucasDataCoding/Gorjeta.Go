<template>
  <div class="min-h-screen space-y-10 flex flex-col">
    <TopBar class="px-25" />

    <FormDashboard class="grow mx-5 lg:mx-25">
      <template #form>
        <FormConversion />
      </template>

      <template #dashboard>
        <DashboardTipExchange />
      </template>
    </FormDashboard>

    <FooterCopyright class="px-25" />
  </div>

  <main></main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import FooterCopyright from '@/components/FooterCopyright.vue'
import FormDashboard from '@/layout/FormDashboard.vue'
import FormConversion from '@/components/forms/conversion/FormConversion.vue'
import DashboardTipExchange from '@/components/dashboards/DashboardTipExchange.vue'
</script>
