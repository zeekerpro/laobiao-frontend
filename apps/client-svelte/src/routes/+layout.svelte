<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let data


  function pageOut(
    node: Element,
    { delay = 0, duration = 300, easing = cubicOut, direction = "center center" } = {}
  ) {
    return {
      delay,
      duration,
      easing,
      css: (t :number) => `
        scale: ${t};
        transform-origin: ${direction};
      `
    }
  }

</script>

<main class="flow-root">

  <div class="fixed top-3 right-6">
    <ThemeSwitcher />
  </div>

  {#key data.url}
  <div
    in:fly={{ x: -200, duration: 500, delay: 210 }}
    out:pageOut={{ duration: 200, direction: "bottom right" }}
    >
    <slot></slot>
  </div>
  {/key}

</main>
