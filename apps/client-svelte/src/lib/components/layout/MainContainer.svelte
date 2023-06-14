<script>
  import { navigating } from "$app/stores";
  import Pageloding from "$components/layout/Pageloding.svelte";
  let classes = "";
  export { classes as class };
</script>

<main class="{classes}
  h-screen w-screen
  pt-12 pb-24
  overflow-hidden
  ">
  {#if !!$navigating} <Pageloding /> {/if}
  <div class="h-full mx-2 overflow-y-scroll scroll-smooth">
    <slot></slot>
  </div>
</main>
