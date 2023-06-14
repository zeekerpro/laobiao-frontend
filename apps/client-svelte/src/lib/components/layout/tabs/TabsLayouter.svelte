<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabNavBar from "$components/layout/tabs/TabNavBar.svelte";
  import TabStatusBar from "$components/layout/tabs/TabStatusBar.svelte";
  import { activeTab, showView }  from "$stores/layouts"
  import Icon from "@iconify/svelte"
  import NavWrapper from "$components/layout/NavWrapper.svelte";
  import { back } from "$utils/client/routeMonitor";

  function handleBack(){
    back()
  }

</script>

<div >

  <MainContainer class="tab-viewer">
    <svelte:component this={$activeTab.view}/>
    <TabStatusBar />
    <TabNavBar />
  </MainContainer>


  <div class="drawer drawer-end z-50">
    <input id="detail-viewer-toggle" type="checkbox" class="drawer-toggle" bind:checked={$showView}  />
    <div class="drawer-side">
      <MainContainer class="bg-base-100 bg-opacity-100">
        <slot></slot>
        <!-- nav bar -->
        <NavWrapper class="flex items-center">
          <button on:click|preventDefault={handleBack} class="btn btn-ghost btn-sm" >
            <Icon icon="ion:chevron-back" class="text-xl" />
          </button>
        </NavWrapper>
      </MainContainer>
    </div>
  </div>

</div>


