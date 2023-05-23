<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
  import { fly } from "svelte/transition";

  export let data
</script>

<main class="flow-root">

  <div class="fixed top-3 right-6">
    <ThemeSwitcher />
  </div>

  {#key data.url}
  <div
    in:fly={{ x: -200, duration: 500, delay: 800 }}
    out:fly={{ duration: 100 }}
    >
    <slot></slot>
  </div>
  {/key}

</main>
