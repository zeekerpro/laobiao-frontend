<script lang="ts">
  import "$styles/app.css";
  import Preloading from "$components/layout/Preloading.svelte";
  import PageTransition from "$components/layout/PageTransition.svelte";
  import MainContent from "$components/layout/MainContent.svelte";
  import { authWhiteList } from "$configs";
  import { guard } from "$utils/client/routeMonitor";
  import { page } from "$app/stores";
  import { beforeNavigate } from "$app/navigation";

  $: isAuthPage = $page.route.id && authWhiteList.includes($page.route.id)

  beforeNavigate(guard)

</script>

<div class="flow-root">


  {#if isAuthPage}
    <PageTransition>
      <slot></slot>
    </PageTransition>
  {:else}
    <MainContent >
      <slot></slot>
    </MainContent>
  {/if}

  <Preloading />

</div>
