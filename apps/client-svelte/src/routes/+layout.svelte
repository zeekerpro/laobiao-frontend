<script>
  import "@styles/app.css";
  import {onMount} from "svelte";
  import { themeChange } from "theme-change";

  onMount(() => { themeChange(true) })

</script>

<main class="flow-root">
  <slot></slot>
</main>
