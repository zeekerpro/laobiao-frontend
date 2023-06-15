<script>
  import MainContainer from "$components/layout/MainContainer.svelte";
  import Icon from "@iconify/svelte"
  import HeaderWrapper from "$components/layout/HeaderWrapper.svelte";
  import { back } from "$utils/client/routeMonitor";

  function handleBack(){
    back()
  }
</script>


<MainContainer class="pt-12 pb-10">
  <!-- acturelly router view here -->
  <slot></slot>
  <!-- nav bar -->
  <HeaderWrapper class="flex items-center">
    <button on:click|preventDefault={handleBack} class="btn btn-ghost btn-sm px-1" >
      <Icon icon="ion:chevron-back" class="text-2xl" />
    </button>
  </HeaderWrapper>
</MainContainer>


