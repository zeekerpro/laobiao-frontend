<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import TabNavBar from "$components/layout/tabs/TabNavBar.svelte";
  import TabStatusBar from "$components/layout/tabs/TabStatusBar.svelte";
</script>

<MainContainer>
  <slot></slot>
</MainContainer>

<TabStatusBar />
<TabNavBar />
