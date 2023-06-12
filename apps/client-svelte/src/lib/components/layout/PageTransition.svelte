<script lang="ts">
  import { fly } from "svelte/transition";
  import { navigating, page } from "$app/stores";
  import { tabs } from "$configs";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

  export let duration = { in: 600, out: 0}
  let flyX = -200

  $: if($navigating) {
    let preRoutePath = $navigating.from?.url.pathname || ""
    let currentRoutePath = $navigating.to?.url.pathname || ""
    const preRouteTab = tabs.find(tab => tab.path === preRoutePath)
    const currentRouteTab = tabs.find(tab => tab.path === currentRoutePath)
    if(preRouteTab && currentRouteTab) {
      flyX = preRouteTab.index > currentRouteTab.index ? -200 : 200
    }
  }

  let classes = ""
  export { classes as class }

  let refresh = false
  beforeNavigate(() => refresh = false)
  afterNavigate(() => refresh = true)

</script>

{#if refresh}
<div in:fly={{ x: flyX, duration: duration.in, delay: duration.out }} class={classes} >
  <slot></slot>
</div>
{/if}


