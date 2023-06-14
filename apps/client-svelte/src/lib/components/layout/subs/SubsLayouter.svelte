<script lang="ts">
  import Icon from "@iconify/svelte"
  import MainContainer from "$components/layout/MainContainer.svelte";
  import NavWrapper from "$components/layout/NavWrapper.svelte";

  function handleBack(){
  }


</script>

<MainContainer>
  <slot></slot>
</MainContainer>

<!-- nav bar -->
<NavWrapper>
  <Icon icon="ion:chevron-back" on:click={handleBack} />
</NavWrapper>

