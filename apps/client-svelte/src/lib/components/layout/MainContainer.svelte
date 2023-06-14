<script>
  import { navigating } from "$app/stores";
  import Pageloding from "$components/layout/Pageloding.svelte";
</script>

<main class="h-screen pt-12 pb-24
  overflow-scroll scrollbar-hide scroll-smooth
  ">
  {#if !!$navigating} <Pageloding /> {/if}
  <div class="h-full mx-2">
    <slot></slot>
  </div>
</main>
