<template>
  <nav class="flex items-center bg-gray px-25 space-x-20 w-full h-[90px]">
    <router-link to="/">
      <img src="../../public/logo.png" alt="Logo Gorjeta.GO" width="238" height="41" />
    </router-link>

    <div class="flex space-x-5">
      <a
        v-for="link in links"
        :key="link.title"
        :href="link.href"
        target="_blank"
        class="uppercase text-blue font-semibold hover:text-purple transition"
      >
        {{ link.title }}
      </a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const links = [
  {
    href: 'https://github.com/LucasDataCoding/Gorjeta.Go',
    title: 'Código Fonte',
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
