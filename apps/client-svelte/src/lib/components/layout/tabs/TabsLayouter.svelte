<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabNavBar from "$components/layout/tabs/TabNavBar.svelte";
  import TabStatusBar from "$components/layout/tabs/TabStatusBar.svelte";
  import { activeTabIndex }  from "$stores/tabs"

  import ChatTabView from "$components/views/tabs/Chat.svelte";
  import HomeTabView from "$components/views/tabs/Home.svelte";

  const tabViews = [
    HomeTabView,
    ChatTabView,
  ]

</script>


<MainContainer>
  <svelte:component this={tabViews[$activeTabIndex]}/>
</MainContainer>

<MainContainer>
  <slot></slot>
</MainContainer>

<TabStatusBar />
<TabNavBar />
