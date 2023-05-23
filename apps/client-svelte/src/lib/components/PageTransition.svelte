<script lang="ts">
  import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let key: string
  export let duration = { in: 800, out: 500 }

  type Params = {
    delay? :number
    duration? :number
    easing? :EasingFunction
    outDirection? :string
  }

  function pageOut(
    node: Element,
    { delay = 0, duration = 200, easing = cubicOut, outDirection = "bottom right" } :Params = {}
  ) :TransitionConfig {
    return {
      delay,
      duration,
      easing,
      css: (t :number) => `
        scale: ${t};
        transform-origin: ${outDirection};
      `
    }
  }

</script>

{#key key}
<div
  in:fly={{ x: -200, duration: duration.in, delay: duration.out }}
  out:pageOut={{ duration: duration.out  }}
  >
  <slot></slot>
</div>
{/key}


