<script lang="ts">
  import MainContainer from "$components/layout/MainContainer.svelte";
  import Icon from "@iconify/svelte"
  import HeaderWrapper from "$components/layout/HeaderWrapper.svelte";
  import { back } from "$utils/client/routeMonitor";
  import { onMount } from "svelte";

  function handleBack(){
    back()
  }

  let classes = ''; export { classes as class }

  let viewerRef: HTMLElement;
  let gesture :HammerManager;

  async function supportGesture(){
    if(!window.Hammer){ await import("hammerjs") }
    gesture = new Hammer(viewerRef)
    gesture.get('swipe').set({ direction: Hammer.DIRECTION_RIGHT, threshold: 5, velocity: 0.1 });
    gesture.on('swipe', () => { back() })
  }

  onMount(() => {
    supportGesture()
  })

</script>


<MainContainer class="pt-12 pb-10 {classes}" bind:nodeEl={viewerRef}>
  <div class="">
    <!-- acturelly router view here -->
    <slot></slot>
  </div>
  <!-- nav bar -->
  <HeaderWrapper class="fixed-silky bottom-0 flex items-center">
    <button on:click|preventDefault={handleBack} class="btn btn-ghost btn-sm px-1" >
      <Icon icon="ion:chevron-back" class="text-2xl" />
    </button>
  </HeaderWrapper>
</MainContainer>


