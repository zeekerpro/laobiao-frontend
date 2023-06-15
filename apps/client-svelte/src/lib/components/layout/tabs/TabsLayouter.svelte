<script lang="ts">
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabsFooterNav from "$components/layout/tabs/TabsFooterNav.svelte";
  import TabsHeaderBar from "$components/layout/tabs/TabsHeaderBar.svelte";
  import TabsRouterViewer from "$components/layout/tabs/TabsRouterViewer.svelte";
  import { showView }  from "$stores/viewStack"
  import { activeTab }  from "$stores/layouts"
</script>

<div >
  <MainContainer class="tab-viewer pt-12 pb-24">
    <svelte:component this={$activeTab.view}/>
    <TabsHeaderBar />
    <TabsFooterNav />
  </MainContainer>

  <div class="detail-viewer drawer drawer-end ">
    <input id="detail-viewer-toggle"
      type="checkbox"
      class="drawer-toggle"
      checked={$showView}
    />
    <div class="drawer-side duration-500 z-10">
      <TabsRouterViewer class="bg-base-100 bg-opacity-100" >
        <slot></slot>
      </TabsRouterViewer>
    </div>
  </div>

</div>


