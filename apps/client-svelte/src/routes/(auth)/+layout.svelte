<script lang="ts">
import LogoAnimation from "@components/LogoAnimation.svelte";
import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
</script>

<ThemeSwitcher class="fixed right-2 top-2 z-10" />

<section class=" mt-16 md:mt-24 " >
  <LogoAnimation class="sticky top-0 w-full"
  />
  <div class=" sm:max-w-md mx-auto ">
    <slot></slot>
  </div>
</section>
