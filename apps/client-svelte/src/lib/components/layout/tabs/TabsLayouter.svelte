<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabNavBar from "$components/layout/tabs/TabNavBar.svelte";
  import TabStatusBar from "$components/layout/tabs/TabStatusBar.svelte";
  import { activeTab, showView, viewStack }  from "$stores/layouts"
  import Icon from "@iconify/svelte"
  import NavWrapper from "$components/layout/NavWrapper.svelte";
  import { back } from "$utils/client/routeMonitor";

  function handleBack(){
    back()
  }

</script>

<div class="flex flex-nowrap
  w-screen h-screen
  relative
  transition-all
  { $showView ? 'left-[-100%]' : 'left-0'}
  ">

  <MainContainer class="tab-viewer shrink-0 ">
    <svelte:component this={$activeTab.view}/>
    <TabStatusBar />
    <TabNavBar />
  </MainContainer>

  <MainContainer class="detail-viewer shrink-0 z-50" >
    {$showView}
    {$viewStack}

    <slot></slot>

    <!-- nav bar -->
    <NavWrapper>
      <button on:click={handleBack} class="btn" >
        <Icon icon="ion:chevron-back" class="text-xl" />
      </button>
    </NavWrapper>
  </MainContainer>

</div>


