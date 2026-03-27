<template>
  <div id="mobile-menu" class="w-full z-10 lg:hidden">

    <!-- header -->
    <div id="mobile-header" class="w-full h-16 flex justify-between items-center">
      <NuxtLink class="text-menu-text font-fira_retina flex h-full items-center mx-5" to="/" @click="goHome()">
        {{ config.logo_name }}
      </NuxtLink>
      <img src="/icons/burger.svg" alt="Open menu" v-if="!menuOpen" @click="toggleMobileMenu()"
        class="w-5 h-5 mx-5 my-auto" />
      <img src="/icons/burger-close.svg" alt="Closed menu" v-else @click="toggleMobileMenu()"
        name="icon-park-outline:close" class="w-5 h-5 mx-5 my-auto" />
    </div>

    <!-- mobile menu -->
    <div id="menu" class="bg-mobile-menu-blue z-10 hidden">
      <NuxtLink id="nav-link-mobile" to="/" :class="{ active: isActive('/') }">
        _hello
      </NuxtLink>

      <NuxtLink id="nav-link-mobile" to="/about-me" :class="{ active: isActive('/about-me') }">
        _about-me
      </NuxtLink>

      <NuxtLink id="nav-link-mobile" to="/projects" :class="{ active: isActive('/projects') }">
        _projects
      </NuxtLink>

      <NuxtLink id="nav-link-mobile" to="/contact-me" :class="{ active: isActive('/contact-me') }">
        _contact-me
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import DevConfig from '~/developer.json';

const config = ref(DevConfig);
const route = useRoute();

const menuOpen = ref(false);

// When route changes, close menu and show the new page
watch(() => route.path, () => {
  const menu = document.getElementById('menu');
  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
  const page = document.getElementsByTagName('main')[0];
  if (page) {
    page.style.display = 'flex';
  }
  menuOpen.value = false;
});

function toggleMobileMenu(){
  menuOpen.value = !menuOpen.value;

  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');

  const page = document.getElementsByTagName('main')[0];
  // Hide / show section
  if (menuOpen.value) {
    page.style.display = 'none';
  } else {
    page.style.display = 'flex';
  }
};

function goHome(){
  // Menu will be closed by the route watcher
};

const isActive = (route) => {
  return route === route.path;
};

</script>

<style>
#mobile-header {
  border-bottom: 1px solid #1E2D3D;
}

#nav-link-mobile {
  border-bottom: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 py-4 flex items-center;
}

#nav-link-mobile.active {
  color: white
}
</style>