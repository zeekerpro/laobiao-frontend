<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabsFooterNav from "$components/layout/tabs/TabsFooterNav.svelte";
  import TabsHeaderBar from "$components/layout/tabs/TabsHeaderBar.svelte";
  import TabsRouterViewer from "$components/layout/tabs/TabsRouterViewer.svelte";
  import { showView, activeTab }  from "$stores/layouts"
</script>

<div >
  <MainContainer class="tab-viewer">
    <svelte:component this={$activeTab.view}/>
    <TabsHeaderBar />
    <TabsFooterNav />
  </MainContainer>

  <div class="detail-viewer drawer drawer-end z-50">
    <input id="detail-viewer-toggle" type="checkbox" class="drawer-toggle" bind:checked={$showView}  />
    <div class="drawer-side duration-500">
      <TabsRouterViewer/>
    </div>
  </div>

</div>


