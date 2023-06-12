<script>
  import PageTransition from "$components/layout/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import StatusBar from "$components/layout/StatusBar.svelte";
  import TabBar from "$components/layout/TabBar.svelte";
  import Pageloding from "$components/layout/Pageloding.svelte";
</script>

<main class="h-screen pt-12 pb-24
  overflow-scroll scrollbar-hide scroll-smooth
  ">
  {#if !!$navigating} <Pageloding /> {/if}
  <PageTransition>
  <div class="my-2">
    <slot></slot>
  </div>
  </PageTransition>
</main>
<StatusBar class="h-12 bg-opacity-95" />
<TabBar class="h-24" />

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
