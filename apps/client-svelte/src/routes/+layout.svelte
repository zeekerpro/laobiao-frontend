<script lang="ts">
  import "$styles/app.css";
  import LayoutContainer from "$components/layout/LayoutContainer.svelte";
  import MainContent from "$components/layout/MainContent.svelte";
  import { authWhiteList } from "$configs";
  import { guard } from "$utils/client/routeMonitor";
  import { page } from "$app/stores";
  import { beforeNavigate } from "$app/navigation";

  $: isAuthPage = $page.route.id && authWhiteList.includes($page.route.id)

  beforeNavigate(guard)

</script>

<LayoutContainer>

{#if isAuthPage}
  <slot></slot>
{:else}
  <MainContent >
    <slot></slot>
  </MainContent>
{/if}

</LayoutContainer>
