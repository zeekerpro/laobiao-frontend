<script>
  import PageTransition from "$components/layout/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import StatusBar from "$components/layout/StatusBar.svelte";
  import TabBar from "$components/layout/TabBar.svelte";
  import Pageloding from "$components/layout/Pageloding.svelte";
</script>

<main class="h-screen pt-12 pb-24">
  <div class="h-full overflow-scroll">
    {#if !!$navigating} <Pageloding /> {/if}
    <PageTransition class="h-full">
      <slot></slot>
    </PageTransition>
  </div>
</main>
<TabBar class="h-24" />
<StatusBar class="h-12" />

