<script lang="ts">
  import { fly } from "svelte/transition";
  import { tabsInfo } from "$stores/tabs";

  export let duration = { in: 600, out: 0}
  let flyX = 200

  let classes = ""
  export { classes as class }

  $: flyDirection = $tabsInfo.activeTabIndex > $tabsInfo.prevTabIndex ? 1 : -1

</script>

<div in:fly={{ x: flyX * flyDirection, duration: duration.in, delay: duration.out }} class={classes} >
  <slot></slot>
</div>


