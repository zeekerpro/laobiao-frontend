<script lang="ts">
  import { navigating } from "$app/stores";
  import Pageloding from "$components/layout/Pageloding.svelte";
  let classes = "";
  export { classes as class };

  export let nodeEl: HTMLElement | null = null;
</script>

<main class="h-screen w-screen overflow-hidden " bind:this={nodeEl}>
  {#if !!$navigating} <Pageloding /> {/if}
  <div class="h-full w-full overflow-y-scroll scroll-smooth scrollbar-hide overflow-visible {classes} ">
    <slot></slot>
  </div>
</main>
