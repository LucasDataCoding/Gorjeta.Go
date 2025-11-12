<template>
  <div
    ref="targetElementRef"
    class="grid grid-cols-1 lg:grid-cols-12 space-y-5 lg:space-y-0 lg:gap-10"
  >
    <transition :name="isMobile ? 'fade-slide' : ''" mode="out-in">
      <CardContent
        v-show="!isShowingDashboard || !isMobile"
        class="col-span-5 flex items-center justify-center px-5 lg:px-10"
        key="form"
      >
        <slot name="form" />
      </CardContent>
    </transition>

    <!-- Dashboard Section -->
    <transition :name="isMobile ? 'fade-slide' : ''" mode="out-in">
      <CardContent
        v-show="isShowingDashboard || !isMobile"
        class="col-span-7 px-5 lg:px-10"
        key="dashboard"
      >
        <slot name="dashboard" />
      </CardContent>
    </transition>

    <!-- Botão só aparece em mobile -->
    <div class="flex justify-end w-full sticky bottom-5 right-0 w-fit" v-if="isMobile">
      <button
        @click="handleClick"
        class="bg-purple rounded-full w-[65px] h-[65px] flex items-center justify-center transition-all hover:scale-105 hover:bg-purple-600"
      >
        <FontAwesomeIcon
          class="dropdown_menu_trigger_arrow transition-all text-white text-lg font-bold"
          icon="fa-solid fa-chevron-right"
          :class="{ 'rotate-180': isShowingDashboard }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardContent from '@/components/CardContent.vue'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// ⭐⭐ HOOKS DO VUEUSE ⭐⭐
import { useBreakpoints, useMediaQuery } from '@vueuse/core'

const isShowingDashboard = ref(false)
const targetElementRef = ref(null)

// Opção 1: useBreakpoints (Mais semântica)
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1024, // lg breakpoint
})

const isMobile = breakpoints.smaller('desktop') // true quando < 1024px

const timeoutScroll = ref()

function handleClick() {
  if (!isMobile.value) return // Não faz nada em desktop

  if (timeoutScroll.value) {
    clearTimeout(timeoutScroll.value)
  }

  if (!targetElementRef.value) return

  isShowingDashboard.value = !isShowingDashboard.value

  timeoutScroll.value = setTimeout(() => {
    targetElementRef.value.scrollIntoView({ behavior: 'smooth' })
  }, 300)
}
</script>

<style scoped>
/* Fade + Slide Transition - só aplica em mobile */
@media (max-width: 1023px) {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .fade-slide-leave-active {
    position: absolute;
  }
}
</style>
