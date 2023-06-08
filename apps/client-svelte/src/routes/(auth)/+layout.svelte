<script lang="ts">
import LogoAnimation from "@components/LogoAnimation.svelte";
import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
import { onMount } from "svelte";
import lodash from "lodash";

const { throttle } = lodash;

let logoAnimationRef: LogoAnimation;

const handleScroll = throttle( () => {
  const logoDom = logoAnimationRef?.dom
  const logoTop = logoDom?.getBoundingClientRect().top || 0
  if (logoTop < window.scrollY) {
    logoDom?.classList.add("shadow");
    logoDom?.classList.add("drop-shadow");
  }else{
    logoDom?.classList.remove("shadow");
    logoDom?.classList.remove("drop-shadow");
  }
}, 200)

onMount(() => {
  window.addEventListener("scroll", handleScroll);
})

</script>

<ThemeSwitcher class="fixed right-2 top-2 z-10" />

<section class=" mt-16 md:mt-24 " >
  <LogoAnimation bind:this={logoAnimationRef}
    class="sticky top-0 w-full bg-base-100 py-2 shadow-primary"
  />
  <div class=" sm:max-w-md mx-auto ">
    <slot></slot>
  </div>
</section>
