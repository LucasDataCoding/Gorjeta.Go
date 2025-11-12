<template>
  <div class="min-h-screen space-y-10 flex flex-col">
    <ContainerSection class="bg-gray">
      <TopBar />
    </ContainerSection>

    <ContainerSection>
      <FormDashboard>
        <template #form>
          <FormConversion />
        </template>

        <template #dashboard>
          <DashboardTipExchange />
        </template>
      </FormDashboard>
    </ContainerSection>

    <ContainerSection class="bg-purple">
      <FooterCopyright />
    </ContainerSection>
  </div>

  <main></main>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import FooterCopyright from '@/components/FooterCopyright.vue'
import FormDashboard from '@/layout/FormDashboard.vue'
import FormConversion from '@/components/forms/conversion/FormConversion.vue'
import DashboardTipExchange from '@/components/dashboards/DashboardTipExchange.vue'
import ContainerSection from '@/layout/ContainerSection.vue'
</script>
