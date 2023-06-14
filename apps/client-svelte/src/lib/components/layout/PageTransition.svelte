<script lang="ts">
  import { fly } from "svelte/transition";
  // import { navigating } from "$app/stores";

  export let duration = { in: 600, out: 0}
  let flyX = -200

  let classes = ""
  export { classes as class }

</script>

<div in:fly={{ x: flyX, duration: duration.in, delay: duration.out }} class={classes} >
  <slot></slot>
</div>


