<script>
  import "@styles/app.css";
  import {onMount} from "svelte";
  import { themeChange } from "theme-change";

  onMount(() => {
    // true: theme based on system settings
    // false: theme based on user settings
    themeChange(true)
  })

</script>

<main class="flow-root">
  <slot></slot>
</main>
