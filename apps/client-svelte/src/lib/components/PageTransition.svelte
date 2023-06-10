<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";

  export let duration = { in: 600, out: 0}

</script>


{#key $page.url.pathname}
<div in:fly={{ x: -200, duration: duration.in, delay: duration.out }} >
  <slot></slot>
</div>
{/key}


