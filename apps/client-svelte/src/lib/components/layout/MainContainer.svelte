<script>
  import { navigating } from "$app/stores";
  import Pageloding from "$components/layout/Pageloding.svelte";
  let classes = "";
  export { classes as class };
</script>

<main class="h-screen w-screen overflow-hidden ">
  {#if !!$navigating} <Pageloding /> {/if}
  <div class="h-full mx-2 overflow-y-scroll scroll-smooth scrollbar-hide overflow-visible {classes} ">
    <slot></slot>
  </div>
</main>
