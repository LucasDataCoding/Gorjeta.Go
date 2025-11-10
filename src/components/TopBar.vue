<template>
  <nav
    class="flex flex-col lg:flex-row items-center bg-gray py-5 lg:py-0 space-y-4 lg:space-y-0 lg:space-x-20 w-full lg:h-[90px]"
  >
    <MainLogo />

    <div class="flex space-x-5 items-center">
      <a
        v-for="link in links"
        :key="link.title"
        :href="link.href"
        target="_blank"
        class="uppercase text-center text-blue font-semibold hover:text-purple transition text-xs lg:text-sm"
      >
        {{ link.title }}
      </a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import MainLogo from './MainLogo.vue'

const links = [
  {
    href: 'https://github.com/LucasDataCoding/Gorjeta.Go',
    title: 'Código',
  },
  {
    href: 'https://www.linkedin.com/in/lucasdatacoding/',
    title: 'Desenvolvedor',
  },
  {
    href: 'https://www.youtube.com/@lucas-araripe',
    title: 'Youtube',
  },
]
</script>
