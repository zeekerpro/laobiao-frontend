<script lang="ts">
  import { navigating } from "$app/stores";
  import Pageloding from "$components/layout/Pageloding.svelte";
  let classes = "";
  export { classes as class };

  export let nodeEl: HTMLElement | null = null;
</script>

<main bind:this={nodeEl}>
  {#if !!$navigating} <Pageloding /> {/if}
  <div class="w-screen h-screen overflow-y-scroll scroll-smooth scrollbar-hide {classes} overflow-x-hidden">
    <slot></slot>
  </div>
</main>
