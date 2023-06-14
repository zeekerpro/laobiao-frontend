<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabNavBar from "$components/layout/tabs/TabNavBar.svelte";
  import TabStatusBar from "$components/layout/tabs/TabStatusBar.svelte";
  import { activeTab }  from "$stores/tabs"
</script>

<MainContainer>
  <svelte:component this={$activeTab.view}/>
</MainContainer>

<TabStatusBar />
<TabNavBar />

<!-- <MainContainer> -->
<!--   <slot></slot> -->
<!-- </MainContainer> -->


