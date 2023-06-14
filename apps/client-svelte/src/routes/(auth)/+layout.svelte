<script lang="ts">
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import PageTransition from "$components/layout/PageTransition.svelte";
  import ThemeSwitcher from "$components/layout/ThemeSwitcher.svelte";
  import { onMount } from "svelte";
  import lodash from "lodash";
  const { throttle } = lodash;

  let logoDom: HTMLElement | null = null

  const dynamicStyle = () => {
    const logoTop = logoDom?.getBoundingClientRect().top || 0
    if (logoTop < 1) {
      logoDom?.classList.add("shadow-[0_1px_2px_-2px_hsl(var(--inc))]");
    }else{
      logoDom?.classList.remove("shadow-[0_1px_2px_-2px_hsl(var(--inc))]");
    }
  }

  onMount(async () => {
    dynamicStyle()
    window.addEventListener("scroll", throttle(dynamicStyle, 100));
  })
</script>

<PageTransition>

  <section class="mt-16 md:mt-24 " >
    <div bind:this={logoDom} class="sticky top-0 w-full bg-base-100 bg-opacity-90 py-3 flex justify-center ">
      <LogoAnimation class="scale-150" />
    </div>
    <div class="sm:max-w-md mx-auto ">
      <slot></slot>
    </div>
  </section>

  <ThemeSwitcher class="fixed top-3 right-3" />

</PageTransition>
